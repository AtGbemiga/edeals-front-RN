import { ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
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
import searchIcon from "../../assets/searchIcon.png";
import filterIcon from "../../assets/sliders.png";
import searchFn from "../../lib/global/search";
import { ResSearchLInfo } from "../../types/products/resProducts";
import { Banners } from "../hSServices/banners";
import { Categories } from "../hSServices/categories";
import CutCostBanner from "../../assets/hServicesCutCost.png";

const screenWidth = Dimensions.get("window").width;
// HSProducts = HomeScreenProducts
export const HSServices = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  const [resSearch, setResSearch] = useState<ResSearchLInfo>();
  const [searchValue, setSearchValue] = useState("");
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [errMsg, setErrMsg] = useState("");

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
    <View style={styles.container}>
      <View style={styles.searchArea}>
        <TextInput
          placeholder="search for services"
          value={searchValue}
          onChangeText={(newText) => {
            setSearchValue(newText);
            console.log(newText);
          }}
          style={styles.textInput}
        />
        <Pressable onPress={() => navigation.navigate("Search Filiter")}>
          <Image
            source={filterIcon}
            style={styles.filterIcon}
          />
        </Pressable>

        <Pressable onPress={handleSearch}>
          <Image
            source={searchIcon}
            style={styles.searchIcon}
          />
        </Pressable>
      </View>
      {resSearch && resSearch.result.length > 0 ? (
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
            {/* <Text>Bell here</Text> */}
          </View>
          <Text>Search component goes here</Text>
        </>
      ) : (
        <>
          <View>
            <Banners navigation={navigation} />
          </View>
          <View></View>
          <View>
            <Text>Categories</Text>
            <View>
              <Categories />
            </View>
          </View>
          <View>
            <Image
              source={CutCostBanner}
              style={styles.cutCostBanner}
            />
          </View>
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
  cutCostBanner: {
    width: "100%",
    height: 100,
    resizeMode: "stretch",
    borderRadius: 10,
  },
});
