import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Res4ProductReviews,
  OneProductReview,
} from "../../types/products/resReviews";
import getReviewsFn from "../../lib/global/getReviews";

const oneReview = ({ item }: { item: OneProductReview }) => {
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
  product_id: string;
  identifier: "products";
};
export const ReviewsFlatList = ({ product_id, identifier }: Props) => {
  const [resReviews, setResReviews] = useState<Res4ProductReviews>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = await getReviewsFn({
          identifier,
          product_id,
          setErrMsg,
        });
        setResReviews(res);
      })();
    } catch (error) {}
  }, []);

  return (
    <View>
      <FlatList
        data={resReviews?.finalResult[0]}
        renderItem={oneReview}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={screenWidth}
        decelerationRate="fast"
        contentContainerStyle={styles.flatListContainer}
      />
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
  },
  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
