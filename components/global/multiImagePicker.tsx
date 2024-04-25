import * as ImagePicker from "expo-image-picker";
import { Button, Image, StyleSheet, View } from "react-native";
type Props = {
  formPostImg: string;
  setFormPostImg: React.Dispatch<React.SetStateAction<string>>;
};
export default function MultiImagePicker({
  formPostImg,
  setFormPostImg,
}: Props) {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setFormPostImg(result.assets[0].uri);
      console.log({ formPostImg: formPostImg });
    }
  };

  return (
    <View style={styles.container}>
      <Button
        title="Pick an image from camera roll"
        onPress={pickImage}
      />
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
});
