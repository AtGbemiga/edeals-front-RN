import { ParamListBase, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LoginF } from "../../types/users/loginF";
import loginSignupFn from "../../lib/loginSignup";
import { SignUpF } from "../../types/users/signUpF";
import booleanTokenCheck from "../../lib/booleanTokenCheck";

// TODO: handle case where screen is not part of the expected types of screens.
// Figure out correct type for route
// Add back btn
export const LoginSignUpF = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const route = useRoute();
  const { screen, action } = route.params as {
    screen: "seller" | "buyer";
    action: "login" | "signup";
  };
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const checkToken = async () => {
    const tokenRes = await booleanTokenCheck();

    if (tokenRes) {
      navigation.navigate("HomeRoot");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (action === "login" && (screen === "seller" || screen === "buyer")) {
    const [formItems, onChangeItems] = useState<LoginF>({
      account_name: "",
      password: "",
    });
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = () => {
      try {
        loginSignupFn({
          account_name: formItems.account_name,
          account_type: screen,
          password: formItems.password,
          identifier: "login",
          setErrMsg,
        }).then((res) => {
          if (res?.includes("successful")) {
            navigation.navigate("HomeRoot"); // TODO: navigate to home page
          }
        });
      } catch (error) {
        // disable empty object error
      }
    };

    {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.introView}>
            <Text style={styles.boldHeaders}>Welcome back!</Text>
            <Text>Log In to continue</Text>
          </View>
          <View style={styles.formView}>
            {errMsg && <Text style={styles.errMsg}>{errMsg}</Text>}
            <View>
              <Text style={styles.boldHeaders}>Username</Text>
              <TextInput
                style={styles.textInput}
                value={formItems.account_name}
                onChangeText={(newText) => {
                  onChangeItems({ ...formItems, account_name: newText });
                }}
                maxLength={255}
              />
            </View>

            <View>
              <Text style={styles.boldHeaders}>Password</Text>
              <TextInput
                style={styles.textInput}
                secureTextEntry={!isPasswordVisible}
                value={formItems.password}
                onChangeText={(newText) => {
                  onChangeItems({ ...formItems, password: newText });
                }}
                maxLength={255}
              />
              <Pressable
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <Text>
                  {isPasswordVisible ? "Hide password" : "Show password"}
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.policyAndMoreView}>
            <View style={styles.forgotPassView}>
              {/* <Text>Login with Fingerprint</Text> */}
              <Text>Forgot Password</Text>
            </View>
            <View style={styles.termsView}>
              <Text>By continuing, you agree to our </Text>
              <Pressable onPress={() => navigation.navigate("Terms")}>
                <Text style={styles.termsText}>terms of services</Text>
              </Pressable>
              <Text>and </Text>
              <Pressable onPress={() => navigation.navigate("Privacy")}>
                <Text style={styles.termsText}>privacy policy</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.btnBox}>
            <Pressable
              // TODO: call the handle login function
              onPress={() => handleSubmit()}
              style={[styles.btn, { backgroundColor: "#59AEFF" }]}
            >
              <Text style={[styles.btnText, { color: "white" }]}>Log In</Text>
            </Pressable>
          </View>
          <View style={styles.authOptionBox}>
            <View>
              <Text style={styles.authOption}>Don’t have an account?</Text>
            </View>
            <View>
              <Pressable
                // TODO: Pass the correct account type param to the sign up page
                onPress={() =>
                  navigation.navigate("Log In/Sign Up", { screen })
                }
              >
                <Text style={styles.authCTA}>Sign up here.</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      );
    }
  } else if (
    action === "signup" &&
    (screen === "seller" || screen === "buyer")
  ) {
    const [formItems, onChangeItems] = useState<SignUpF>({
      account_name: "",
      account_type: screen,
      password: "",
      email: "",
      phone_number: "",
    });
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = () => {
      console.log("clicked");

      try {
        loginSignupFn({
          account_name: formItems.account_name,
          account_type: screen,
          password: formItems.password,
          email: formItems.email,
          phone_number: formItems.phone_number,
          identifier: "signup",
          setErrMsg,
        }).then((res) => {
          // TODO: error lies here: res?.includes
          if (res?.includes("successful")) {
            navigation.navigate("HomeRoot");
          }
        });
      } catch (error) {
        // disable empty object error
      }
    };
    {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.introView}>
              <Text style={styles.boldHeaders}>Create Account</Text>
              <Text>Sign up to continue</Text>
            </View>
            <View style={styles.formView}>
              {errMsg && <Text style={styles.errMsg}>{errMsg}</Text>}
              <View>
                <Text style={styles.boldHeaders}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={formItems.email}
                  onChangeText={(newText) => {
                    onChangeItems({ ...formItems, email: newText });
                  }}
                  maxLength={255}
                  keyboardType="email-address"
                />
              </View>
              <View>
                <Text style={styles.boldHeaders}>Phone Number</Text>
                <TextInput
                  style={styles.textInput}
                  value={formItems.phone_number}
                  onChangeText={(newText) => {
                    onChangeItems({ ...formItems, phone_number: newText });
                  }}
                  maxLength={255}
                />
              </View>
              <View>
                <Text style={styles.boldHeaders}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  secureTextEntry={!isPasswordVisible}
                  value={formItems.password}
                  onChangeText={(newText) => {
                    onChangeItems({ ...formItems, password: newText });
                  }}
                  maxLength={255}
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <Text>
                    {isPasswordVisible ? "Hide password" : "Show password"}
                  </Text>
                </Pressable>
              </View>
              <View>
                <Text style={styles.boldHeaders}>
                  {screen === "seller" ? "Business Name" : "User Name"}
                </Text>
                <TextInput
                  style={styles.textInput}
                  value={formItems.account_name}
                  onChangeText={(newText) => {
                    onChangeItems({ ...formItems, account_name: newText });
                  }}
                  maxLength={255}
                />
              </View>
            </View>
            {/* <View style={styles.policyAndMoreView}>
              <Text style={styles.termsView}>
                By continuing, you agree to our
                <Pressable onPress={() => navigation.navigate("Terms")}>
                  <Text style={styles.termsText}> terms of services</Text>
                </Pressable>
                and
                <Pressable onPress={() => navigation.navigate("Privacy")}>
                  <Text style={styles.termsText}> privacy policy</Text>
                </Pressable>
              </Text>
            </View> */}

            <View style={styles.policyAndMoreView}>
              <View style={styles.termsView}>
                <Text>By continuing, you agree to our </Text>
                <Pressable onPress={() => navigation.navigate("Terms")}>
                  <Text style={styles.termsText}>terms of services</Text>
                </Pressable>
                <Text>and </Text>
                <Pressable onPress={() => navigation.navigate("Privacy")}>
                  <Text style={styles.termsText}>privacy policy</Text>
                </Pressable>
              </View>
            </View>
            <View>
              <Pressable
                onPress={() => handleSubmit()}
                style={[styles.btn, { backgroundColor: "#59AEFF" }]}
              >
                <Text style={[styles.btnText, { color: "white" }]}>
                  Create Account
                </Text>
              </Pressable>
            </View>
            <View style={styles.authOptionBox}>
              <View>
                <Text style={styles.authOption}>Have an account?</Text>
              </View>
              <View>
                <Pressable
                  onPress={() =>
                    navigation.navigate("Log In/Sign Up", { screen })
                  }
                >
                  <Text style={styles.authCTA}>Login In here.</Text>
                </Pressable>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  } else
    <SafeAreaView>
      <Text>Invalid login method</Text>
    </SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    flexDirection: "column",
    rowGap: 30,
  },
  boldHeaders: {
    color: "#333",
    fontSize: 20,
    fontStyle: "normal",
    fontWeight: "700",
  },
  introView: {
    marginTop: 50,
  },
  formView: {
    flexDirection: "column",
    rowGap: 20,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  policyAndMoreView: {
    flexDirection: "column",
    rowGap: 20,
  },
  forgotPassView: {
    flexDirection: "row",
    columnGap: 85,
  },
  termsView: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
  },
  btnBox: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "red",
  },
  btn: {
    width: "95%",
    height: 38,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#59AEFF",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#59AEFF",
    fontSize: 16,
    fontStyle: "normal",
    fontWeight: "700",
    // line-height: normal;
  },
  termsText: {
    color: "#C23002",
    fontWeight: "400",
  },
  authOptionBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  authOption: {
    color: "#333",
    fontSize: 17,
    fontStyle: "normal",
    fontWeight: "700",
    // backgroundColor: "red",
    alignContent: "center",
  },
  authCTA: {
    color: "#04940A",
    // backgroundColor: "red",
  },
  errMsg: {
    color: "#ec0707",
  },
});
