import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import getMyProfileFn from "../../lib/users/profile/getMyProfile";
import updateProfileFn from "../../lib/users/profile/update";
import { RootStackParamList } from "../../types/global/root";
import MultiImagePicker from "../global/multiImagePicker";
// import { launchImageLibrary } from "react-native-image-picker";
// import ImagePicker from "react-native-image-crop-picker";
import * as ImagePicker from "expo-image-picker";

type Props = NativeStackScreenProps<RootStackParamList, "UpdateProfile">;

export const UpdateProfile = () => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [formPostImg, setFormPostImg] = useState("");

  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    profile: "",
  });

  useEffect(() => {
    try {
      (async () => {
        const res = await getMyProfileFn({
          setErrMsg,
        });
        if (res && res.result[0].address && res.result[0].tag) {
          // set each value to state
          setAddress(res.result[0].address);
          setPhoneNumber(res.result[0].phone_number);
          setAccountName(res.result[0].account_name);
          setEmail(res.result[0].email);
          setTag(res.result[0].tag || "Users");
          setFormPostImg(res.result[0].img);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }, []);

  const openImageLibraryKeyMessage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
      });

      if (!response.canceled) {
        const ext = response.assets[0].uri.split(".").pop();
        const arrEl = {
          uri: response.assets[0].uri,
          name: `file.${ext}`,
          type: response.assets[0].type,
        };

        setFormPostImg(arrEl.uri);
        console.log({ formPostImg });
      }
    }
  };

  const handleUpdateProfile = async () => {
    console.log("clicked");
    console.log({ formPostImg });

    const formBody = new FormData();
    formBody.append("address", address);
    formBody.append("phone_number", phoneNumber);
    formBody.append("account_name", accountName);
    formBody.append("email", email);
    formBody.append("tag", tag);
    formBody.append("img", {
      type: "image/jpeg",
      uri: formPostImg,
      name: "file.jpg",
    } as unknown as Blob);
    try {
      const res = await updateProfileFn({
        formBody,
        setErrMsg,
      });
      if (res && res.message.includes("success")) {
        console.log("success");
      }
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <SafeAreaView style={styles.mainBox}>
      {errMsg.profile && <Text>{errMsg.profile}</Text>}
      <View>
        <Text>Address</Text>
        <TextInput
          onChangeText={setAddress}
          value={address}
          placeholder="Enter address"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Phone Number</Text>
        <TextInput
          onChangeText={setPhoneNumber}
          value={phoneNumber}
          placeholder="Enter phone number"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Account Name</Text>
        <TextInput
          onChangeText={setAccountName}
          value={accountName}
          placeholder="Enter account name"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Email</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="Enter email"
          style={styles.textInput}
        />
      </View>
      <View>
        <Text>Tag</Text>
        <TextInput
          onChangeText={setTag}
          value={tag}
          placeholder="Enter tag"
          style={styles.textInput}
        />
      </View>

      {/* <MultiImagePicker
        formPostImg={formPostImg}
        setFormPostImg={setFormPostImg}
      /> */}

      <Pressable onPress={openImageLibraryKeyMessage}>
        <Text>Pick image</Text>
      </Pressable>

      <Pressable onPress={handleUpdateProfile}>
        <Text>Update</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
});
