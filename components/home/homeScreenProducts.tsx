import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { CardLInfo } from "../global/cardLInfo";
import { CategoriesFlatList } from "./categories";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import { useEffect, useState } from "react";
import searchIcon from "../../assets/searchIcon.png";
import filterIcon from "../../assets/sliders.png";
import { ResProductsLInfo } from "../../types/products/resProducts";
import getLInfoFn from "../../lib/products/getLInfo";
import { StaticInlineNotice } from "../global/inlineNotice";
import searchFn from "../../lib/global/search";

const screenWidth = Dimensions.get("window").width;
// HSProducts = HomeScreenProducts
export const HSProducts = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [resProducts, setResProducts] = useState<ResProductsLInfo>();
  const [resSearch, setResSearch] = useState<ResProductsLInfo>();
  const [searchValue, setSearchValue] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "products",
          discountIdentifier: "20" ?? undefined,
          setErrMsg,
        })) as ResProductsLInfo;

        if (res && res.result.length > 0) {
          setResProducts(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

  async function handleSearch() {
    console.log("search");

    try {
      (async () => {
        const res = await searchFn({
          identifier: "products",
          searchValue: searchValue,
          setErrMsg,
        });
        if (res && res.result.length > 0) {
          setResSearch(res);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }
  return (
    <View>
      <>
        <View>
          <View style={styles.searchArea}>
            <TextInput
              placeholder="search for products"
              value={searchValue}
              onChangeText={(newText) => {
                setSearchValue(newText);
                console.log(newText);
              }}
              style={styles.textInput}
            />
            <Image
              source={filterIcon}
              style={styles.filterIcon}
            />
            <Pressable onPress={handleSearch}>
              <Image
                source={searchIcon}
                style={styles.searchIcon}
              />
            </Pressable>
          </View>
          {resSearch && resSearch.result.length > 0 ? (
            <CardLInfo
              resProducts={resSearch}
              navigation={navigation}
            />
          ) : (
            <>
              <View>
                <Text>Ad area</Text>
              </View>
              <View>
                <Text>Categories</Text>

                <CategoriesFlatList />
              </View>
              <View>
                {errMsg ? (
                  <StaticInlineNotice
                    msg={errMsg}
                    bgColor="red"
                    color="white"
                  />
                ) : (
                  <CardLInfo
                    resProducts={resProducts as ResProductsLInfo}
                    navigation={navigation}
                  />
                )}
              </View>
              <View>
                <Pressable>
                  <Image source={require("../../assets/Banner default.png")} />
                </Pressable>
              </View>
              <View>
                {errMsg ? (
                  <StaticInlineNotice
                    msg={errMsg}
                    bgColor="red"
                    color="white"
                  />
                ) : (
                  <CardLInfo
                    resProducts={resProducts as ResProductsLInfo}
                    navigation={navigation}
                  />
                )}
              </View>
            </>
          )}
        </View>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#EDF4FB",
    width: screenWidth - 150,
  },
  filterIcon: {
    backgroundColor: "#48B2E7",
    padding: 15,
    borderRadius: 50,
  },
  searchIcon: { padding: 15 },
  searchArea: {
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
    borderColor: "red",
    borderWidth: 5,
  },
});
