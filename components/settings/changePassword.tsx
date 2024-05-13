import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import changePasswordFn from "../../lib/users/changePassword";
import { globalStyles } from "../style/global";
import { useState } from "react";
import { CtaBtn } from "../global/ctaBtn";
import { showMessage } from "react-native-flash-message";

export const ChangePassword = () => {
  const [password, setPassword] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [errMsg, setErrMsg] = useState({
    changePassword: "",
  });

  async function handleSubmit() {
    try {
      const res = await changePasswordFn({
        oldPassword: password.oldPassword,
        newPassword: password.newPassword,
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        setPassword({
          oldPassword: "",
          newPassword: "",
        });
        showMessage({
          message: res.message,
          type: "success",
          hideOnPress: true,
          duration: 4000,
        });
      }
    } catch (error) {
      // disable empty object error
    }
  }

  return (
    <SafeAreaView style={[globalStyles.mainBox]}>
      {errMsg.changePassword && errMsg.changePassword !== "" && (
        <Text style={globalStyles.errText}>{errMsg.changePassword}</Text>
      )}
      <Text style={globalStyles.boldText}>Change Password</Text>
      <View>
        <TextInput
          onChangeText={(newText) =>
            setPassword({ ...password, oldPassword: newText })
          }
          value={password.oldPassword}
          placeholder="Enter old password"
          style={globalStyles.textInput}
        />
      </View>
      <View>
        <TextInput
          onChangeText={(newText) =>
            setPassword({ ...password, newPassword: newText })
          }
          value={password.newPassword}
          placeholder="Enter new password"
          style={globalStyles.textInput}
        />
      </View>
      <View style={styles.ctaBox}>
        <CtaBtn
          text="Change Password"
          onPressFn={() => handleSubmit()}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ctaBox: {
    alignItems: "center",
  },
});
