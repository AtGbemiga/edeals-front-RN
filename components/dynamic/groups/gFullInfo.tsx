import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  GestureResponderEvent,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import getGroupFInfoFn from "../../../lib/groups/getFInfo";
import joinGroupFn from "../../../lib/groups/join";
import leaveGroupFn from "../../../lib/groups/leave";
import { RootStackParamList } from "../../../types/global/root";
import { ResGroupFInfo } from "../../../types/groups/resGetFInfo";
import { StaticInlineNotice } from "../../global/inlineNotice";
import { GroupMembers } from "./members";
import { GroupPosts } from "./posts";
import { SuggestedGroups } from "../../groups/suggested";

type Props = NativeStackScreenProps<RootStackParamList, "GroupFullInfo">;

export const GroupFullInfo = ({ route }: Props) => {
  const [resGroups, setResGroups] = useState<ResGroupFInfo>();
  const { id } = route.params;
  const [showPosts, setShowPosts] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [userJoined, setUserJoined] = useState<number>(0); // Initialize with default value
  const [successMsg, setSuccessMsg] = useState("");

  if (!id) {
    throw new Error("Missing group_id");
  }

  useEffect(() => {
    let isMember;

    (async () => {
      try {
        const res = (await getGroupFInfoFn({
          groupID: id,
          setErrMsg,
        })) as ResGroupFInfo;

        if (res && res.result.length > 0) {
          setResGroups(res);
          isMember = res.result.find(
            (user) => user.user_has_joined
          )?.user_has_joined;
          setUserJoined(isMember ? 1 : 0);
        }
      } catch (error) {
        // Handle error
      }
    })();
  }, [id, setErrMsg]); // Make sure to include dependencies in the dependency array

  function handleShowMembers(e: GestureResponderEvent) {
    e.preventDefault();
    setShowPosts(false);
  }

  function handleShowPosts(e: GestureResponderEvent) {
    e.preventDefault();
    setShowPosts(true);
  }

  const handleMembershipToggle = async () => {
    try {
      const newMemberState = userJoined === 1 ? 0 : 1; // Toggle between 1 and 0
      setUserJoined(newMemberState);

      const response = await (newMemberState === 1
        ? joinGroupFn
        : leaveGroupFn)({ groupID: id, setErrMsg });

      if (response?.message.includes("success")) {
        setSuccessMsg(response.message);
      } else {
        const newLikeState = userJoined === 1 ? 0 : 1;
        setUserJoined(newLikeState); // Revert UI on failure
      }
    } catch (error) {
      console.error(error);
      const newLikeState = userJoined === 1 ? 0 : 1;
      setUserJoined(newLikeState);
    }
  };

  const headerContent = resGroups?.result.map((group) => {
    return (
      <View
        key={group.id}
        style={styles.headerBox}
      >
        <Text style={styles.boldText}>{group.name}</Text>
        <View>
          <Text style={styles.boldText}>About</Text>
          <Text>{group.about}</Text>
        </View>
        <Pressable
          style={styles.userJoinedBtn}
          onPress={handleMembershipToggle}
        >
          <Text style={[styles.boldText, styles.userJoinedBtnText]}>
            {userJoined ? "Leave" : "Join"}
          </Text>
        </Pressable>
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.mainBox}>
      <ScrollView>
        {successMsg && <Text>{successMsg}</Text>}
        <View>{headerContent}</View>
        <View style={styles.tabsBox}>
          <Pressable
            onPress={(e) => handleShowPosts(e)}
            style={[showPosts ? styles.activeTab : styles.inactiveTab]}
          >
            <Text
              style={[
                showPosts ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Posts
            </Text>
          </Pressable>
          <Pressable
            onPress={(e) => handleShowMembers(e)}
            style={[!showPosts ? styles.activeTab : styles.inactiveTab]}
          >
            <Text
              style={[
                !showPosts ? styles.activeTabText : styles.inactiveTabText,
              ]}
            >
              Members
            </Text>
          </Pressable>
        </View>
        {errMsg ? (
          <StaticInlineNotice
            msg={errMsg}
            color="red"
            bgColor="red"
          />
        ) : (
          <>
            {showPosts ? (
              <>
                <GroupPosts id={id} />
                <SuggestedGroups />
              </>
            ) : (
              <>
                <GroupMembers id={id} />
                <SuggestedGroups />
              </>
            )}
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainBox: {
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  headerBox: {
    flexDirection: "column",
    rowGap: 10,
    borderWidth: 1,
    borderColor: "#59AEFF",
    borderRadius: 10,
    padding: 10,
  },
  tabsBox: {
    display: "flex",
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "center",
    padding: 10,
  },
  activeTab: {
    backgroundColor: "#59AEFF",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 20,
  },
  inactiveTab: {
    backgroundColor: "#F5F5F5",
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderColor: "#59AEFF",
    borderWidth: 1,
  },
  activeTabText: {
    color: "#F5F5F5",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
  },
  inactiveTabText: {
    color: "#59AEFF",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
  },
  boldText: {
    fontSize: 14,
    fontWeight: "700",
  },
  userJoinedBtn: {
    backgroundColor: "#59AEFF",
    borderRadius: 24,
    color: "#ffffff",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    width: "100%",
  },
  userJoinedBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: "500",
    textAlign: "center",
  },
  //   pressable: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     columnGap: 10,
  //     borderRadius: 10,
  //     padding: 10,
  //   },
  //   listText: { marginRight: "auto" },
});
