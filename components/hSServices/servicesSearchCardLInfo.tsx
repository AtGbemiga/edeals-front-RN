import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { VerifiedIcon } from "../../assets/verifiedIcon.png";
import { RootStackParamList } from "../../types/global/root";
import {
  OneSearchService,
  ResSearchServices,
} from "../../types/services/resSearch";

const screenWidth = Dimensions.get("window").width;

export const ServicesSearchCardLInfo = ({
  data,
  navigation,
  searchValue,
}: {
  data: ResSearchServices;
  navigation: NativeStackNavigationProp<RootStackParamList>;
  searchValue: string;
}) => {
  // Render individual items
  const renderItem = ({ item }: { item: OneSearchService }) => {
    return (
      <View style={styles.itemContainer}>
        <View>
          <Image
            source={{ uri: item.img }}
            alt={`${item.img}`}
            style={styles.acc_img}
          />
        </View>
        <View style={styles.info}>
          <View>
            <View style={styles.acc_name_container}>
              <Text style={styles.acc_name}>{item.account_name}</Text>
              {item.verified === "1" && (
                <VerifiedIcon
                  w={20}
                  h={20}
                  resizeMode="cover"
                />
              )}
            </View>
            <Text>KM away here</Text>
            <Text>
              {item.avg_rating} ({item.ratings_count})
            </Text>
          </View>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("DynamicProfile", { id: item.id })
              }
              style={styles.primaryBtn}
            >
              <Text style={styles.primaryBtnText}>View Profile</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.ctaArea}>
          <View>
            <Pressable
              onPress={() =>
                navigation.navigate("Dynamic Product", { id: item.id })
              }
              style={styles.secondaryBtn}
            >
              <Text style={styles.secondaryBtnText}>Buy</Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[{ borderWidth: 5, borderColor: "blue" }, styles.container]}>
      <View>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={styles.header}
        >
          <Text style={styles.headerText}>
            Buy your {searchValue} from stores around you
          </Text>

          <Pressable
            onPress={() => navigation.navigate("Stores")}
            style={styles.headerBtn}
          >
            <Text>Stores</Text>
          </Pressable>
        </LinearGradient>
      </View>
      <FlatList
        data={data?.servicesFinalResult[0]}
        renderItem={renderItem}
        snapToInterval={screenWidth} // Width of each item
        decelerationRate="fast"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    gap: 40,
  },
  itemContainer: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
    padding: 2,
  },
  acc_img: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 50,
  },
  info: {
    flexDirection: "column",
    rowGap: 10,
    justifyContent: "space-between",
  },
  acc_name_container: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 5,
  },
  acc_name: {
    fontWeight: "700",
    fontSize: 14,
    color: "#394293",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  primaryBtn: {
    backgroundColor: "#59AEFF",
    padding: 10,
    borderRadius: 20,
  },
  primaryBtnText: {
    color: "#F5F5F5",
  },
  ctaArea: {
    flexDirection: "column",
    rowGap: 10,
    justifyContent: "space-between",
  },
  secondaryBtn: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#59AEFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryBtnText: {
    color: "#59AEFF",
  },
  header: {
    padding: 20,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: "#F5F5F5",
    fontWeight: "500",
    fontSize: 16,
  },
  headerBtn: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#59AEFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
});
