import Repairers from "../../assets/repairers.png";
import MakeUp from "../../assets/makeupArtise.png";
import Plumber from "../../assets/plumber.png";
import Electrician from "../../assets/Electrician-bro.png";
import Mechanic from "../../assets/mechanic.png";
import Hairdresser from "../../assets/hairdresser.png";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatGrid } from "react-native-super-grid";

interface DATAProps {
  id: number;
  name: string;
  imgPath: ImageSourcePropType;
}

const DATA: DATAProps[] = [
  {
    id: 1,
    name: "Repairers",
    imgPath: Repairers,
  },
  {
    id: 2,
    name: "Makeup Artist",
    imgPath: MakeUp,
  },
  {
    id: 3,
    name: "Plumber",
    imgPath: Plumber,
  },
  {
    id: 4,
    name: "Electrician",
    imgPath: Electrician,
  },
  {
    id: 5,
    name: "Mechanic",
    imgPath: Mechanic,
  },
  {
    id: 6,
    name: "Hairdresser",
    imgPath: Hairdresser,
  },
];

export const Categories = () => {
  return (
    <View>
      <FlatGrid
        itemDimension={130}
        data={DATA}
        renderItem={({ item }) => (
          <Pressable>
            <View style={styles.imgBox}>
              <Image
                source={item.imgPath}
                style={styles.img}
              />
              <Text>{item.name}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: "#59AEFF91",
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "stretch",
  },
});
