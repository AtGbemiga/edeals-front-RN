import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import globalSearchFn from "../../lib/global/search";
import { RootStackParamList } from "../../types/global/root";
import { ResSearchLInfo } from "../../types/products/resProducts";
import { StaticInlineNotice } from "../global/inlineNotice";
import { SearchCardLInfo } from "../global/searchCardLInfo";
import { globalStyles } from "../style/global";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "DynamicCategoriesSearch"
>;
export const DynamicCategoriesSearch = ({ navigation, route }: Props) => {
  const { searchValue } = route.params;
  const [resSearch, setResSearch] = useState<ResSearchLInfo>();
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = await globalSearchFn({
          identifier: "products",
          searchValue: searchValue,
          setErrMsg,
        });
        if (
          res &&
          "productSearchData" in res &&
          res.productSearchData.length > 0
        ) {
          setResSearch(res);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <Text>Search Results</Text>
      {resSearch && resSearch.productSearchData.length > 0 && (
        <>
          <View>
            <Pressable
              onPress={() => {
                console.log("back");
                setResSearch(undefined);
                navigation.goBack();
              }}
              style={{ padding: 5 }}
            >
              <Ionicons
                name="arrow-back"
                size={24}
                color="black"
              />
            </Pressable>
          </View>
          {errMsg ? (
            <StaticInlineNotice
              msg={errMsg}
              bgColor="red"
              color="white"
            />
          ) : (
            <SearchCardLInfo
              data={resSearch}
              navigation={navigation}
              searchValue={searchValue}
            />
          )}
        </>
      )}
    </SafeAreaView>
  );
};
