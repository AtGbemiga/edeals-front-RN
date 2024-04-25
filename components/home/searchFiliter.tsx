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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import backIcon from "../../assets/backIcon.png";
import searchFn from "../../lib/global/search";
import { RootStackParamList } from "../../types/global/root";
import { ResSearchLInfo } from "../../types/products/resProducts";
import { StaticInlineNotice } from "../global/inlineNotice";
import { SearchCardLInfo } from "../global/searchCardLInfo";

const screenWidth = Dimensions.get("window").width;

export const SearchFiliter = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const [resSearch, setResSearch] = useState<ResSearchLInfo>();
  const [searchValue, setSearchValue] = useState("");
  const [fashionSearch, setFashionSearch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function handleSearch() {
    console.log("search");
    if (searchValue === "" || !fashionSearch) {
      return;
    }
    try {
      (async () => {
        const res = await searchFn({
          identifier: "products",
          searchValue,
          setErrMsg,
        });
        if (res && res.result.length > 0) {
          console.log(resSearch);

          setResSearch(res);
        }
      })();
    } catch (error) {
      // disable empty object error
    }
  }
  // create checkbox for each item in FASHION_CHECKBOXES
  const content = FASHION_CHECKBOXES.map((item) => {
    return (
      <View key={item.label}>
        <BouncyCheckbox
          size={25}
          fillColor="#3938c9"
          unFillColor="#FFFFFF"
          text={item.label}
          iconStyle={{ borderColor: "#3938c9" }}
          innerIconStyle={{ borderWidth: 2 }}
          onPress={() => {
            console.log(item.label);
            setFashionSearch(true);
            setSearchValue(item.value);
            handleSearch();
          }}
          textStyle={{
            textDecorationLine: "none",
          }}
        />
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="search for products"
        value={searchValue}
        onChangeText={(newText) => {
          setSearchValue(newText);
          console.log(newText);
        }}
        style={styles.textInput}
      />
      <>
        {errMsg || (resSearch && resSearch.result.length === 0) ? (
          <StaticInlineNotice
            msg={errMsg}
            color="red"
            bgColor="red"
          />
        ) : (
          <>
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
                </View>
                <SearchCardLInfo
                  data={resSearch}
                  navigation={navigation}
                  searchValue={searchValue}
                />
              </>
            ) : (
              <>
                <View>
                  <Text>Categories</Text>
                  <Pressable>
                    <Text>Hotels</Text>
                  </Pressable>

                  <Pressable>
                    <Text>Fashion</Text>
                  </Pressable>
                  <>{content}</>
                  <Pressable>
                    <Text>Gadgets</Text>
                  </Pressable>
                  <Pressable>
                    <Text>Electronics</Text>
                  </Pressable>
                  <Pressable>
                    <Text>Building</Text>
                  </Pressable>
                </View>
              </>
            )}
          </>
        )}
      </>
    </View>
  );
};

interface FASHION_CHECKBOXESProps {
  label: string;
  value: string;
}

const FASHION_CHECKBOXES: FASHION_CHECKBOXESProps[] = [
  {
    label: "Shoes",
    value: "shoes",
  },
  {
    label: "Clothes",
    value: "clothes",
  },
  {
    label: "Bags",
    value: "bags",
  },
  {
    label: "Accessories",
    value: "accessories",
  },
  {
    label: "Sport",
    value: "sport",
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    flex: 1,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#EDF4FB",
    width: screenWidth,
  },
});
