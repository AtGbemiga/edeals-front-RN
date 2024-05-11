import * as DocumentPicker from "expo-document-picker";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { showMessage } from "react-native-flash-message";

type Props = {
  setFormPostImg: React.Dispatch<React.SetStateAction<string[]>>;
  setImgsLength: React.Dispatch<React.SetStateAction<number>>;
};

export const MultiImagePicker = ({ setFormPostImg, setImgsLength }: Props) => {
  const pickImage = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "image/*",
        copyToCacheDirectory: true,
        multiple: true,
      });

      if (res.canceled) return;
      const imgSize = res.assets.map((assest) => assest.size);
      console.log({ imgSize });

      // return if more than 5 images are selected
      if (imgSize && imgSize.length > 5) {
        showMessage({
          message: "Please select no more than 5 images",
          type: "warning",
          hideOnPress: true,
        });
        return;
      }

      // return if size is greater than 500kb
      const sizeLimit = 500 * 1024;

      if (imgSize && imgSize.some((size) => size && size > sizeLimit)) {
        showMessage({
          message: "Please select an image less than 500kb",
          type: "warning",
          hideOnPress: true,
        });
        return;
      }
      console.log(res);
      if (res && res.assets[0] && res.assets[0].uri) {
        const selectedImages = res.assets.map((asset) => asset.uri); // Extract URIs
        setFormPostImg(selectedImages);
        setImgsLength(selectedImages.length);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.mainBox}>
      <Pressable
        onPress={pickImage}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Upload Image(s)</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    alignItems: "center",
    justifyContent: "center",
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
