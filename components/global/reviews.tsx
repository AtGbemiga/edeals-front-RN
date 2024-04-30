import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  OneProductReview,
  Res4ProductReviews,
} from "../../types/products/resReviews";

const OneReview = ({ item }: { item: OneProductReview }) => {
  return (
    <View style={styles.reviewContainer}>
      <View style={styles.reviewHeader}>
        <Image
          source={{ uri: item.reviewer_img }}
          style={styles.image}
        />
        <Text>{item.reviewer_name}</Text>
      </View>
      <View>
        <Text>{item.review}</Text>
      </View>
    </View>
  );
};
const screenWidth = Dimensions.get("window").width;
type Props = {
  data: Res4ProductReviews;
  headerStyle?: object;
  errMsg: string;
};
export const ReviewsFlatList = ({ data, headerStyle, errMsg }: Props) => {
  return (
    <View>
      <Text style={headerStyle}>Reviews</Text>
      {errMsg ? (
        <Text>{errMsg}</Text>
      ) : (
        <FlatList
          data={data?.finalResult[0]}
          renderItem={({ item }) => <OneReview item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={screenWidth}
          decelerationRate="fast"
          contentContainerStyle={styles.flatListContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  flatListContainer: {
    paddingHorizontal: 10,
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 10,
    resizeMode: "cover",
  },
  reviewContainer: {
    backgroundColor: "#c5c5c5",
    padding: 20,
    borderRadius: 10,
    margin: 10,
    flexDirection: "column",
    rowGap: 10,
    maxWidth: 300,
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
