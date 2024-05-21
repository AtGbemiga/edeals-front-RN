import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { globalStyles } from "../style/global";
import { OneImagePicker } from "../global/oneImagePicker";
import uploadShortVideoFn from "../../lib/shortVideos/upload";
import { showMessage } from "react-native-flash-message";

export const UploadShortVideo = () => {
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function handleShortVideoUpload() {
    const formBody = new FormData();

    formBody.append("description", description);
    formBody.append("video", {
      type: "video/mp4",
      uri: video,
      name: "file.mp4",
    } as unknown as Blob);

    try {
      const res = await uploadShortVideoFn({ formData: formBody, setErrMsg });

      if (res && res.message.includes("success")) {
        showMessage({
          message: res.message,
          type: "success",
          autoHide: true,
        });

        setVideo("");
        setDescription("");
      }
    } catch (error) {
      // disable empty object error
    }
  }
  return (
    <SafeAreaView style={globalStyles.mainBox}>
      {errMsg && <Text>{errMsg}</Text>}
      <View>
        <Text>Description</Text>
        <TextInput
          onChangeText={setDescription}
          value={description}
          placeholder="Enter description"
          style={globalStyles.textInput}
        />
      </View>
      <OneImagePicker
        formPostImg={video}
        setFormPostImg={setVideo}
        btnText="Upload video"
        mediaTypeValue={"Videos"}
      />

      <Pressable
        onPress={handleShortVideoUpload}
        style={styles.updateBtn}
      >
        <Text style={styles.updateBtnText}>Upload</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  updateBtn: {
    backgroundColor: "#2196F3",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  updateBtnText: {
    color: "#fff",
    fontWeight: "500",
  },
});
