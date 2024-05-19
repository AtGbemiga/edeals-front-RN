import { useEffect, useState } from "react";
import { ResGetNewsFInfo } from "../../types/news/resGet";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import getNewsFInfoFn from "../../lib/news/getFInfo";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { globalStyles } from "../style/global";

type Props = NativeStackScreenProps<RootStackParamList, "DynamicNews">;
export const DynamicNews = ({ route }: Props) => {
  const { id } = route.params;
  const [resNews, setResNews] = useState<ResGetNewsFInfo>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (!id) {
      setErrMsg("No id provided");
      return;
    }

    (async () => {
      try {
        const res = (await getNewsFInfoFn({
          id,
          setErrMsg,
        })) as ResGetNewsFInfo;
        if (res && res.result.length > 0) {
          setResNews(res);
        }
      } catch (error) {
        // quiet ESlint empty object error
      }
    })();
  }, []);

  const content = resNews?.result[0];

  if (!content) return null;

  if (errMsg) return <Text>{errMsg}</Text>;

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <ScrollView>
        <Image
          source={{ uri: content.img }}
          style={{ width: "100%", height: 200 }}
        />
        <View>
          <Text style={[globalStyles.boldText, styles.title]}>
            {content.title}
          </Text>
        </View>
        <View>
          <Text>{content.body}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 20,
    paddingVertical: 10,
  },
});
