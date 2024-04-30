import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function StarRatings({
  ratings,
  size,
}: {
  ratings: string;
  size: number;
}) {
  const stars: React.JSX.Element[] = [];
  const totalStars = 5; // Assuming the total rating is always 5

  for (let i = 0; i < totalStars; i++) {
    if (i < Number(ratings)) {
      stars.push(
        <AntDesign
          name="star"
          size={size}
          color="#FFC107"
          key={i}
        />
      );
    } else {
      stars.push(
        <AntDesign
          name="staro"
          size={size}
          color="black"
          key={i}
        />
      );
    }
  }

  return <View style={styles.mainBox}>{stars}</View>;
}

const styles = StyleSheet.create({
  mainBox: {
    flexDirection: "row",
    columnGap: 1,
  },
});
