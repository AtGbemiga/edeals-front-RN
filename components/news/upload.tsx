import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { globalStyles } from "../style/global";
import { OneImagePicker } from "../global/oneImagePicker";
import uploadNewsFn from "../../lib/news/upload";
import { showMessage } from "react-native-flash-message";

export const UploadNews = () => {
  const [img, setImg] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errMsg, setErrMsg] = useState("");

  async function handleSubmit() {
    const formBody = new FormData();

    formBody.append("title", title);
    formBody.append("body", body);
    formBody.append("img", {
      type: "image/jpeg",
      uri: img,
      name: "file.jpg",
    } as unknown as Blob);

    try {
      const res = await uploadNewsFn({ formData: formBody, setErrMsg });
      if (res && res.message.includes("success")) {
        showMessage({
          message: res.message,
          type: "success",
          autoHide: true,
        });
        setImg("");
        setTitle("");
        setBody("");
      }
    } catch (error) {
      // disable empty object error
    }
  }
  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <ScrollView>
        <Text style={globalStyles.boldText}>Upload News</Text>
        <View>
          <Text>Title</Text>
          <TextInput
            onChangeText={setTitle}
            value={title}
            placeholder="Title"
            style={globalStyles.textInput}
          />
        </View>
        <>
          <OneImagePicker
            formPostImg={img}
            setFormPostImg={setImg}
            mediaTypeValue="Images"
            btnText={`Upload Image`}
          />
        </>
        <View>
          <Text>Body</Text>
          <TextInput
            onChangeText={setBody}
            value={body}
            style={styles.textarea}
          />
        </View>
        <Pressable
          onPress={handleSubmit}
          style={styles.ctaBtn}
        >
          <Text style={{ color: "#F5F5F5" }}>Upload</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textarea: {
    height: 400,
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  ctaBtn: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#48B2E7",
    color: "#F5F5F5",
    fontSize: 16,
    alignItems: "center",
  },
});
