import * as ImagePicker from "expo-image-picker";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
type Props = {
  formPostImg: string;
  setFormPostImg: React.Dispatch<React.SetStateAction<string>>;
  btnText?: string;
  mediaTypeValue?: "Images" | "Videos" | "All";
};
export function OneImagePicker({
  formPostImg,
  setFormPostImg,
  btnText,
  mediaTypeValue,
}: Props) {
  const mediaTypes =
    mediaTypeValue === "Images"
      ? ImagePicker.MediaTypeOptions.Images
      : mediaTypeValue === "Videos"
      ? ImagePicker.MediaTypeOptions.Videos
      : ImagePicker.MediaTypeOptions.All;
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      // No permissions request is necessary for launching the image library
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: mediaTypes,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      console.log(result);

      if (!result.canceled) {
        const uri = result.assets[0].uri;
        setFormPostImg(uri);
        console.log({ formPostImg: formPostImg });
      }
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={pickImage}
        style={styles.button}
      >
        <Text style={styles.buttonText}>{btnText || "Pick an image"}</Text>
      </Pressable>
      {formPostImg && (
        <Image
          source={{ uri: formPostImg }}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 200,
    height: 200,
  },
  button: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
  },
});
