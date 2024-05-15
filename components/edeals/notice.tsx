import { useEffect, useState } from "react";
import getNoticeByUserIdFn from "../../lib/edeals/getNoticeByUserId";
import { ResNoticeByUserId } from "../../types/edeals/resNoticeByUserId";
import { Pressable, View } from "react-native";
import { globalStyles } from "../style/global";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";

export interface Errs {
  getNotice: string;
}

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

export const BellIcon = ({ navigation }: Props) => {
  const [noticeCount, setNoticeCount] = useState<ResNoticeByUserId>({
    result: [],
  });
  const [errMsg, setErrMsg] = useState<Errs>({
    getNotice: "",
  });
  useEffect(() => {
    (async () => {
      const res = await getNoticeByUserIdFn({
        setErrMsg,
      });

      if (res) {
        setNoticeCount(res);
      }
    })();
  }, []);

  return (
    <View style={globalStyles.bellView}>
      <Pressable
        onPress={() => {
          console.log("clikced");
          navigation.navigate("EDeals");
        }}
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "skyblue" : "white",
          },

          globalStyles.bellIcon,
        ]}
      >
        {noticeCount.result[0] && noticeCount.result[0].unread === 0 ? (
          <Feather
            name="bell"
            size={24}
            color="black"
          />
        ) : (
          <MaterialCommunityIcons
            name="bell-plus"
            size={24}
            color="red"
          />
        )}
      </Pressable>
    </View>
  );
};
