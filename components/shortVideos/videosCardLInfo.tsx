import {
  Button,
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import {
  OneShortVideo,
  ResShortVideoLInfo,
} from "../../types/shortVideos/resLInfo";
import {
  Video,
  ResizeMode,
  AVPlaybackStatus,
  AVPlaybackStatusSuccess,
} from "expo-av";
import { useEffect, useRef, useState } from "react";
import getLInfoFn from "../../lib/global/getLInfo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList>;
type NewOneShortVid = OneShortVideo & Props;
const OneShortVid = ({ video, views, likes, navigation }: NewOneShortVid) => {
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
      <Pressable>
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
      </Pressable>
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

export const VideosFlatList = ({ navigation, route }: Props) => {
  const [resVids, setResVids] = useState<ResShortVideoLInfo>();
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    getVideos: "",
  });

  useEffect(() => {
    try {
      (async () => {
        const res = await getLInfoFn({
          identifier: "shortVideos",
          setErrMsg,
        });

        if (res && "shortVideosRes" in res && res.shortVideosRes.length > 0) {
          setResVids(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

  return (
    <FlatList
      data={resVids?.shortVideosRes}
      renderItem={({ item }) => (
        <OneShortVid
          {...item}
          navigation={navigation}
          route={route}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={screenWidth}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    columnGap: 10,
    marginHorizontal: 10,
    position: "relative",
  },
  video: {
    width: 300,
    height: 200,
    borderRadius: 10,
  },
  buttons: {
    position: "absolute",
    bottom: 0,
    right: 0,
    margin: 10,
  },
});
