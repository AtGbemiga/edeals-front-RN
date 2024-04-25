import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import BannerOne from "../../assets/seviceBanner1.jpg";
import BannerFive from "../../assets/serviceBanner6.jpg";
import BannerFour from "../../assets/serviceBanner4.jpg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

const screenWidth = Dimensions.get("window").width;
const DATA = [
  {
    id: 1,
    first_img: BannerOne,
  },
  {
    id: 2,
    first_img: BannerFour,
  },
  {
    id: 3,
    first_img: BannerFive,
  },
];

export const Banners = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  type ItemProps = { first_img: ImageSourcePropType };

  const OneImg = ({ first_img }: ItemProps) => {
    return (
      <Pressable>
        <View>
          <Image
            source={first_img}
            style={styles.image}
          />
        </View>
      </Pressable>
    );
  };
  return (
    <View style={{ flexWrap: "wrap" }}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <OneImg first_img={item.first_img} />}
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
  image: {
    width: 200,
    height: 200,
    resizeMode: "stretch",
  },
});
