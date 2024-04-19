import { Image, View } from "react-native";
import verifiedIcon from "../../assets/verifiedIcon.png";

type Props = {
  w: number;
  h: number;
  resizeMode: "cover" | "contain" | "stretch" | "repeat" | "center";
};

export const VerifiedIcon = ({ w, h, resizeMode }: Props) => {
  return (
    <View>
      <Image
        source={verifiedIcon}
        style={{
          width: w || 15,
          height: h || 15,
          resizeMode: resizeMode || "cover",
        }}
      />
      {/* <Text>Verified</Text> */}
    </View>
  );
};
