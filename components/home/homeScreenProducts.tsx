import { AntDesign, Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import backIcon from "../../assets/backIcon.png";
import getLInfoFn from "../../lib/global/getLInfo";
import globalSearchFn from "../../lib/global/search";
import { RootStackParamList } from "../../types/global/root";
import {
  ResProductsLInfo,
  ResSearchLInfo,
} from "../../types/products/resProducts";
import { CardLInfo } from "../global/cardLInfo";
import { StaticInlineNotice } from "../global/inlineNotice";
import { SearchCardLInfo } from "../global/searchCardLInfo";
import { SuggestedGroups } from "../groups/suggested";
import { Banners } from "../hSServices/banners";
import { NewsCardLInfo } from "../news/newsCardLInfo";
import { VideosFlatList } from "../shortVideos/videosCardLInfo";
import { globalStyles } from "../style/global";
import { CategoriesFlatList } from "./categories";

const screenWidth = Dimensions.get("window").width;
// HSProducts = HomeScreenProducts

type Props = NativeStackScreenProps<RootStackParamList>;
export const HSProducts = ({ navigation, route }: Props) => {
  const [resProducts, setResProducts] = useState<ResProductsLInfo>();
  const [resSearch, setResSearch] = useState<ResSearchLInfo>();
  const [searchValue, setSearchValue] = useState("");
  const [errMsg, setErrMsg] = useState<Record<string, string>>({
    products: "",
  });
  const [searchErrMsg, setSearchErrMsg] = useState("");
  const [lgIdentifier, setLgIdentifier] = useState("");
  const [stateIdentifier, setStateIdentifier] = useState("");

  useEffect(() => {
    try {
      (async () => {
        const res = (await getLInfoFn({
          identifier: "products",
          setErrMsg,
        })) as ResProductsLInfo;

        if (res && "productsRes" in res && res.productsRes.length > 0) {
          setResProducts(res);
        }
      })();
    } catch (error) {
      // quiet ESlint empty object error
    }
  }, []);

  // TODO: handle error
  async function handleSearch() {
    console.log("search");

    try {
      (async () => {
        const res = await globalSearchFn({
          identifier: "products",
          searchValue: searchValue,
          setErrMsg: setSearchErrMsg,
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
  }

  return (
    <View style={styles.container}>
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
        <Pressable
          onPress={() => navigation.navigate("Search Filiter")}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#ffffff",
            },
            styles.searchAreaBtn,
          ]}
        >
          <Ionicons name="filter" size={24} color="black" />
        </Pressable>

        <Pressable
          onPress={handleSearch}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#ffffff",
            },
            styles.searchAreaBtn,
          ]}
        >
          <AntDesign
            name="search1"
            size={24}
            color="black"
            style={styles.searchAreaBtn}
          />
        </Pressable>
      </View>
      <View style={{ flexDirection: "column", rowGap: 5 }}>
        <TextInput
          placeholder="search for city"
          value={lgIdentifier}
          onChangeText={(newText) => {
            setLgIdentifier(newText);
            console.log(newText);
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="search for state"
          value={stateIdentifier}
          onChangeText={(newText) => {
            setStateIdentifier(newText);
            console.log(newText);
          }}
          style={styles.textInput}
        />
      </View>
      {resSearch && resSearch.productSearchData.length > 0 ? (
        <>
          <View>
            <Pressable
              onPress={() => {
                console.log("back");
                setResSearch(undefined);
              }}
              style={{ padding: 5 }}
            >
              <Image source={backIcon} />
            </Pressable>
          </View>
          {searchErrMsg ? (
            <StaticInlineNotice
              msg={searchErrMsg}
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
      ) : (
        <>
          <View>
            <Banners navigation={navigation} />
          </View>
          <View>
            <Text>Categories</Text>

            <CategoriesFlatList navigation={navigation} route={route} />
          </View>
          <View>
            {errMsg.products ? (
              <StaticInlineNotice
                msg={errMsg.products}
                bgColor="#ff0000"
                color="#ffffff"
              />
            ) : (
              <CardLInfo
                resProducts={resProducts as ResProductsLInfo}
                navigation={navigation}
              />
            )}
          </View>
          <View>
            <Pressable
              onPress={() => navigation.navigate("Dynamic Product", { id: 6 })}
            >
              <Image source={require("../../assets/Banner default.png")} />
            </Pressable>
          </View>
          <View>
            {errMsg.products ? (
              <StaticInlineNotice
                msg={errMsg.products}
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
            <SuggestedGroups />
          </View>
          <>
            <Text style={globalStyles.boldText}>News</Text>
            <NewsCardLInfo navigation={navigation} route={route} />
          </>
          <>
            <Text style={globalStyles.boldText}>Short Videos</Text>
            <VideosFlatList navigation={navigation} route={route} />
          </>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    rowGap: 10,
    marginVertical: 20,
  },
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
  },
  searchAreaBtn: {
    padding: 5,
    borderRadius: 50,
  },
});
