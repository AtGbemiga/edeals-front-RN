import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import BannerFour from "../../assets/serviceBanner4.jpg";
import BannerFive from "../../assets/serviceBanner6.jpg";
import BannerOne from "../../assets/seviceBanner1.jpg";
import { RootStackParamList } from "../../types/global/root";

const screenWidth = Dimensions.get("window").width;
const DATA = [
  {
    id: 6,
    first_img: BannerOne,
  },
  {
    id: 7,
    first_img: BannerFour,
  },
  {
    id: 8,
    first_img: BannerFive,
  },
];

type ItemProps = {
  id: number;
  first_img: ImageSourcePropType;
  navigation: NativeStackNavigationProp<RootStackParamList>;
};
const OneImg = ({ id, first_img, navigation }: ItemProps) => {
  return (
    <View style={styles.imgBox}>
      <Pressable onPress={() => navigation.navigate("Dynamic Product", { id })}>
        <Image
          source={first_img}
          style={styles.image}
        />
      </Pressable>
    </View>
  );
};
export const Banners = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  return (
    <View>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <OneImg
            first_img={item.first_img}
            navigation={navigation}
            id={item.id}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        extraData={DATA}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    marginRight: 10,
  },
  image: {
    width: screenWidth / 1.1,
    height: 200,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
