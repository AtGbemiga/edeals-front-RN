import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Share,
} from "react-native";
import { RootStackParamList } from "../../types/global/root";
import { useEffect, useState } from "react";
import { ResGetProfile } from "../../types/users/profile/resGetProfile";
import getProfileFn from "../../lib/users/profile/getProfile";
import { VerifiedIcon } from "../global/verifiedIcon";
import { StaticInlineNotice } from "../global/inlineNotice";
import getReviewsFn from "../../lib/global/getReviews";
import { Res4ProductReviews } from "../../types/products/resReviews";
import { ReviewsFlatList } from "../global/reviews";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";

const screenWidth = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "DynamicProfile">;
export const DynamicProfile = ({ route, navigation }: Props) => {
  const { id } = route.params;
  const [resProfile, setResProfile] = useState<ResGetProfile>();
  const [errMsg, setErrMsg] = useState("");

  // review state
  const [resReviews, setResReviews] = useState<Res4ProductReviews>();

  useEffect(() => {
    (async () => {
      const res = await getProfileFn({ acc_id: id, setErrMsg });
      if (res && res.result.length > 0) {
        setResProfile(res);

        // get the reviews
        (async () => {
          const res = await getReviewsFn({
            identifier: "sellerProfile",
            acc_id: id.toString(),
            setErrMsg,
          });
          setResReviews(res);
        })();
      }
    })();
  }, []);

  const shareUrl = async () => {
    try {
      const result = await Share.share({
        message: "Check out this website: https://example.com",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: " + result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.log("Error sharing URL:", error);
    }
  };

  const content = resProfile?.result.map((profile) => {
    return (
      <View
        key={profile.id}
        style={styles.subContainer}
      >
        <View style={styles.header}>
          <View>
            <Image
              source={{ uri: profile.img }}
              style={styles.img}
            />
          </View>
          <View>
            <Text style={styles.account_name}>{profile.account_name}</Text>
            <Text>{profile.phone_number}</Text>
            <Text>{profile.email}</Text>
            <View style={styles.mainCtaArea}>
              <Pressable
                style={styles.mainCtaBtn}
                onPress={shareUrl}
              >
                <Text style={styles.mainCtaText}>Share</Text>
              </Pressable>
              <Pressable style={styles.mainCtaBtn}>
                <Text style={styles.mainCtaText}>Chat</Text>
              </Pressable>
            </View>
          </View>
          <View>
            {profile.verified === "1" && (
              <VerifiedIcon
                w={20}
                h={20}
                resizeMode="cover"
              />
            )}
          </View>
        </View>
        {profile.bio ? (
          <View style={styles.bioArea}>
            <Text style={styles.boldTitle}>Bio</Text>
            <Text>{profile.bio}</Text>
          </View>
        ) : (
          <View style={styles.bioArea}>
            <Text style={styles.boldTitle}>Bio</Text>
            <Text>No bio yet</Text>
          </View>
        )}

        {profile.imgs && profile.imgs[0] ? (
          <View>
            <Text style={styles.boldTitle}>Pictures</Text>
            <FlatList
              data={profile.imgs}
              renderItem={({ item }) => (
                <View>
                  <Image
                    key={item}
                    source={{ uri: item }}
                    style={styles.images}
                  />
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={screenWidth}
              decelerationRate="fast"
              keyExtractor={(item) => item}
              extraData={profile.imgs}
            />
          </View>
        ) : (
          <View>
            <Text style={styles.boldTitle}>Pictures</Text>
            <Text>No pictures yet</Text>
          </View>
        )}
        <View>
          <ReviewsFlatList
            data={resReviews as Res4ProductReviews}
            headerStyle={styles.boldTitle}
            totalReviews={profile.total_raings_no}
          />
        </View>
        {profile.opening_hours && profile.opening_hours.length > 0 ? (
          profile.opening_hours?.map((day) => (
            <View
              key={day.hours_id}
              style={styles.openingHoursArea}
            >
              <Text style={styles.boldTitle}>Opening Hours</Text>
              <View>
                {day.MONDAY_OPEN && day.MONDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Mon</Text>
                    <View>
                      <Text>
                        {day.MONDAY_OPEN.slice(0, 5)} -
                        {day.MONDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.TUESDAY_OPEN && day.TUESDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Tue</Text>
                    <View>
                      <Text>
                        {day.TUESDAY_OPEN.slice(0, 5)} -
                        {day.TUESDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.WEDNESDAY_OPEN && day.WEDNESDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Wed</Text>
                    <View>
                      <Text>
                        {day.WEDNESDAY_OPEN.slice(0, 5)} -
                        {day.WEDNESDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.THURSDAY_OPEN && day.THURSDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Thu</Text>
                    <View>
                      <Text>
                        {day.THURSDAY_OPEN.slice(0, 5)} -
                        {day.THURSDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.FRIDAY_OPEN && day.FRIDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Fri</Text>
                    <View>
                      <Text>
                        {day.FRIDAY_OPEN.slice(0, 5)} -
                        {day.FRIDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.SATURDAY_OPEN && day.SATURDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Sat</Text>
                    <View>
                      <Text>
                        {day.SATURDAY_OPEN.slice(0, 5)} -
                        {day.SATURDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
                {day.SUNDAY_OPEN && day.SUNDAY_CLOSE && (
                  <View style={styles.openingHoursDay}>
                    <Text>Sun</Text>
                    <View>
                      <Text>
                        {day.SUNDAY_OPEN.slice(0, 5)} -
                        {day.SUNDAY_CLOSE.slice(0, 5)}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          ))
        ) : (
          <View>
            <Text style={styles.boldTitle}>Opening Hours</Text>
            <Text>No opening hours</Text>
          </View>
        )}
      </View>
    );
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {errMsg && (
          <>
            <StaticInlineNotice
              msg={errMsg}
              color="red"
              bgColor="red"
            />
          </>
        )}
        <>
          {/* <View>Back btn here</View> */}
          {content}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    padding: 10,
  },
  subContainer: {
    flexDirection: "column",
    rowGap: 10,
  },
  header: {
    backgroundColor: "#CCE6FF80",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 50,
  },
  openingHoursArea: {
    flexDirection: "column",
    rowGap: 5,
    backgroundColor: "#CCE6FF80",
    padding: 5,
  },
  openingHoursDay: {
    flexDirection: "row",
    columnGap: 5,
  },
  account_name: {
    fontSize: 14,
    fontWeight: "700",
  },
  mainCtaArea: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  mainCtaBtn: {
    backgroundColor: "#04940A",
    padding: 10,
    borderRadius: 10,
  },
  mainCtaText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 12,
  },
  bioArea: {
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
  images: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 10,
  },
  boldTitle: {
    fontSize: 14,
    fontWeight: "700",
  },
});
