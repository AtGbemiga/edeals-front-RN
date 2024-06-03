import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import getMyProfileFn from "../../lib/users/profile/getMyProfile";
import updateProfileFn from "../../lib/users/profile/update";
import { RootStackParamList } from "../../types/global/root";
import { OneImagePicker } from "../global/oneImagePicker";

type Props = NativeStackScreenProps<RootStackParamList, "UpdateProfile">;

// TODO: Stop updateBtn from making API call if no changes have been made, navigate back to profile
export const UpdateProfile = ({ navigation }: Props) => {
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [email, setEmail] = useState("");
  const [tag, setTag] = useState("");
  const [formPostImg, setFormPostImg] = useState("");
  const [lg, setLg] = useState("");
  const [state, setState] = useState("");

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

  const handleUpdateProfile = async () => {
    //TODO: Stop updateBtn from making API call if no changes have been made
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
        navigation.navigate("Profile");
      }
    } catch (error) {
      // disable empty object error
    }
  };

  return (
    <SafeAreaView style={styles.mainBox}>
      <ScrollView>
        <View style={styles.subBox}>
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
          <View>
            <Text>City</Text>
            <TextInput
              onChangeText={setLg}
              value={lg}
              placeholder="Enter city"
              style={styles.textInput}
            />
          </View>
          <View>
            <Text>State</Text>
            <TextInput
              onChangeText={setState}
              value={state}
              placeholder="Enter state"
              style={styles.textInput}
            />
          </View>
          <OneImagePicker
            formPostImg={formPostImg}
            setFormPostImg={setFormPostImg}
          />
          <Pressable onPress={handleUpdateProfile} style={styles.updateBtn}>
            <Text style={styles.updateBtnText}>Update</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  subBox: {
    flexDirection: "column",
    rowGap: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    width: "100%",
  },
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
