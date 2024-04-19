import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ResMyProfile } from "../../types/users/profile/resGetProfile";
import getMyProfileFn from "../../lib/users/profile/getMyProfile";
import { StaticInlineNotice } from "../global/inlineNotice";
import { MyLinks } from "./myLinks";
import uploadIcon from "../../assets/uploadIcon.png";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import backIcon from "../../assets/backIcon.png";

type Props = NativeStackScreenProps<RootStackParamList>;

export const ProfileIndex = ({ navigation }: Props) => {
  const [resProfile, setResProfile] = useState<ResMyProfile>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = await getMyProfileFn({
          setErrMsg,
        });
        setResProfile(res);
      })();
    } catch (error) {
      // disable empty object error
    }
  }, []);

  const content = resProfile?.result.map((profile) => {
    return (
      <View
        key={profile.id}
        style={styles.profileContainer}
      >
        <Image
          source={{ uri: profile.img }}
          style={styles.profileImg}
        />
        <Pressable onPress={() => {}}>
          <Image
            source={uploadIcon}
            style={styles.uploadIcon}
          />
        </Pressable>

        <Text style={styles.boldText}>{profile.account_name}</Text>
        <Text style={styles.boldText}>{profile.phone_number}</Text>
        <Text>{profile.email}</Text>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {errMsg ? (
          <>
            <StaticInlineNotice
              msg={errMsg}
              color="red"
              bgColor="red"
            />
          </>
        ) : (
          <View style={styles.main}>
            <View>
              <Pressable
                onPress={() => navigation.goBack()}
                style={{ padding: 5 }}
              >
                <Image source={backIcon} />
              </Pressable>
              <Text>Bell here</Text>
            </View>
            <View style={styles.header}>{content}</View>
            <>
              {resProfile?.result[0] && (
                <MyLinks
                  id={resProfile?.result[0].id}
                  acc_type={resProfile?.result[0].account_type}
                />
              )}
            </>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  main: {
    flexDirection: "column",
    rowGap: 15,
  },
  header: {
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  profileContainer: {
    flexDirection: "column",
    rowGap: 10,
    padding: 10,
    backgroundColor: "#fffff",
    width: "100%",
    alignItems: "center",
  },
  profileImg: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  boldText: {
    fontSize: 14,
    fontWeight: "700",
  },
  uploadIcon: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    position: "absolute",
    top: -30,
    right: -50,
    zIndex: 1,
    padding: 10,
  },
});
