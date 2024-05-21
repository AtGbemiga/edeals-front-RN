import { useEffect, useRef, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  OneShortVideo,
  ResShortVideoFInfo,
} from "../../types/shortVideos/resFInfo";
import getAllShortVidFn from "../../lib/shortVideos/getAll";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import {
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
  ResizeMode,
  Video,
} from "expo-av";
import { globalStyles } from "../style/global";

type Props = NativeStackScreenProps<RootStackParamList, "DynamicShortVid">;

const screenWidth = Dimensions.get("window").width;

type NewOneShortVid = OneShortVideo & Props;

const OneShortVid = ({ video, views, likes }: NewOneShortVid) => {
  const vid = useRef<Video>(null);
  const [status, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );

  const isPlaying = (
    status: AVPlaybackStatus
  ): status is AVPlaybackStatusSuccess => {
    return status.isLoaded ? status.isPlaying : false;
  };

  return (
    <View style={styles.container}>
      <Video
        ref={vid}
        style={styles.video}
        source={{
          uri: video,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
        onPlaybackStatusUpdate={(status) => setStatus(status)}
      />
      <View style={styles.overlay}>
        <Text style={styles.text}>Views: {views}</Text>
        <Text style={styles.text}>Likes: {likes}</Text>
      </View>

      <View style={styles.buttons}>
        <Button
          title={isPlaying(status) ? "Pause" : "Play"}
          onPress={() =>
            isPlaying(status)
              ? vid.current?.pauseAsync()
              : vid.current?.playAsync()
          }
        />
      </View>
    </View>
  );
};

export const DynamicShortVid = ({ navigation, route }: Props) => {
  const { id } = route.params;
  const [resVids, setResVids] = useState<ResShortVideoFInfo>();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getAllShortVidFn({
        id,
        setErrMsg,
      });

      if (res && res.result.length > 0) {
        setResVids(res);
      }
    })();
  }, []);

  if (errMsg) return <Text>{errMsg}</Text>;

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <FlatList
        data={resVids?.result}
        renderItem={({ item }) => (
          <OneShortVid
            {...item}
            navigation={navigation}
            route={route}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        snapToInterval={screenWidth}
        decelerationRate="fast"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 5,
    marginHorizontal: 10,
    position: "relative",
    marginBottom: 20,
    // borderWidth: 5,
  },
  video: {
    width: "100%",
    height: 320,
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 5,
  },
  text: {
    color: "white",
    fontSize: 14,
  },
  buttons: {
    marginTop: 10,
  },
});
