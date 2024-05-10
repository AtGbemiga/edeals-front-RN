import {
  Dimensions,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Logo0 from "../../assets/Vegetable 1.png";
import Logo1 from "../../assets/Group.png";
import Logo2 from "../../assets/Eggs.png";
import Logo3 from "../../assets/Meat.png";
import Logo4 from "../../assets/Groupg.png";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import { ParamListBase } from "@react-navigation/native";

interface CATEGORIES_DATAProps {
  id: number;
  name: string;
  imgPath: ImageSourcePropType;
  bgColor: string;
}
const CATEGORIES_DATA: CATEGORIES_DATAProps[] = [
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
type Props = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};
const Category = (
  { id, name, imgPath, bgColor }: CATEGORIES_DATAProps,
  { navigation }: Props
) => (
  <View
    key={id}
    style={[{ backgroundColor: bgColor }, styles.itemContainer]}
  >
    <Pressable onPress={() => navigation.navigate("DynamicSearch")}>
      <Image
        source={imgPath}
        style={styles.img}
      />
      <Text>{name}</Text>
    </Pressable>
  </View>
);

const screenWidth = Dimensions.get("window").width;

export const CategoriesFlatList = ({ navigation }: Props) => (
  <View>
    <FlatList
      data={CATEGORIES_DATA}
      renderItem={({ item }) => (
        <Category
          id={item.id}
          name={item.name}
          imgPath={item.imgPath}
          bgColor={item.bgColor}
          navigation={navigation}
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
    paddingVertical: 10,
  },
  img: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    width: screenWidth / 4,
    padding: 10,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
