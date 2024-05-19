import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { OneNewsLInfo as LoneNews, ResGetNews } from "../../types/news/resGet";
import { useEffect, useState } from "react";
import getLInfoFn from "../../lib/global/getLInfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList>;

type NewOneNews = LoneNews & Props;

export const OneNews = ({ id, img, title, navigation }: NewOneNews) => {
  return (
    <View style={styles.oneNews}>
      <Pressable
        onPress={() => {
          navigation.navigate("DynamicNews", { id });
        }}
      >
        <View>
          <Image
            source={{ uri: img }}
            style={styles.image}
          />
          <View>
            <Text>
              {title.length > 40 ? title.slice(0, 40) + "..." : title}
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export const NewsCardLInfo = ({ navigation, route }: Props) => {
  const [resNews, setResNews] = useState<ResGetNews>();
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    news: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await getLInfoFn({
          identifier: "news",
          setErrMsg,
        });
        if (res && "newsRes" in res) {
          setResNews(res);
        }
      } catch (error) {
        // Handle error
      }
    })();
  }, []);

  return (
    <View>
      {errMsg.news ? (
        <Text>{errMsg.news}</Text>
      ) : (
        <FlatList
          data={resNews?.newsRes}
          renderItem={({ item }) => (
            <OneNews
              img={item.img}
              title={item.title}
              id={item.id}
              navigation={navigation}
              route={route}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth} // Width of each item
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    columnGap: 10,
  },
  oneNews: {
    flexDirection: "column",
    columnGap: 10,
    marginHorizontal: 10,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});
