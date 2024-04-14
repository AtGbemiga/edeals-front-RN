import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo0 from "../../assets/Vegetable 1.png";
import Logo1 from "../../assets/Group.png";
import Logo2 from "../../assets/Eggs.png";
import Logo3 from "../../assets/Meat.png";
import Logo4 from "../../assets/Groupg.png";

const CATEGORIES_DATA = [
  {
    id: 1,
    name: "Hotels",
    imgPath: Logo0,
    bgColor: "#E4F3EA",
  },
  {
    id: 2,
    name: "Building",
    imgPath: Logo1,
    bgColor: "#FFECE8",
  },
  {
    id: 3,
    name: "Fashion",
    imgPath: Logo2,
    bgColor: "#FFF6E4",
  },
  {
    id: 4,
    name: "Gadget",
    imgPath: Logo3,
    bgColor: "#F1EDFC",
  },
  {
    id: 5,
    name: "Electronics",
    imgPath: Logo4,
    bgColor: "#E4F3EA",
  },
];

type CategoryProps = {
  id: number;
  name: string;
  imgPath: string;
  bgColor: string;
};
const Category = ({ id, name, imgPath, bgColor }: CategoryProps) => (
  <View
    key={id}
    style={[{ backgroundColor: bgColor }, styles.itemContainer]}
  >
    <Image
      source={{ uri: imgPath.toString() }}
      style={styles.img}
    />
    <Text>{name}</Text>
  </View>
);

const screenWidth = Dimensions.get("window").width;

export const CategoriesFlatList = () => (
  <View>
    <FlatList
      data={CATEGORIES_DATA}
      renderItem={({ item }) => (
        <Category
          id={item.id}
          name={item.name}
          imgPath={item.imgPath}
          bgColor={item.bgColor}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={screenWidth} // Width of each item
      decelerationRate="fast"
      contentContainerStyle={styles.flatListContainer}
    />
  </View>
);

const styles = StyleSheet.create({
  flatListContainer: {
    paddingVertical: 10, // Adjust as needed
  },
  img: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderColor: "red",
  },
  itemContainer: {
    width: screenWidth / 4, // Ensure each item occupies the full width of the screen
    // paddingHorizontal: 10, // Adjust as needed
    marginRight: 10,
    textAlign: "center",
  },
});
