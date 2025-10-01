import { AntDesign, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import backIcon from "../../assets/icon.png";
import globalSearchFn from "../../lib/global/search";
import { RootStackParamList } from "../../types/global/root";
import { ResSearchServices } from "../../types/services/resSearch";
import { StaticInlineNotice } from "../global/inlineNotice";
import { ServicesSearchCardLInfo } from "../hSServices/servicesSearchCardLInfo";

export const SearchFilterServices = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList>;
}) => {
  const [resSearch, setResSearch] = useState<ResSearchServices>();
  const [searchValue, setSearchValue] = useState("");
  const [fashionSearch, setFashionSearch] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  async function handleSearch() {
    console.log("search");
    if (searchValue === "") {
      console.log({ searchValue });
      return;
    }
    try {
      const res = await globalSearchFn({
        identifier: "services",
        searchValue,
        setErrMsg,
      });
      if (
        res &&
        "servicesFinalResult" in res &&
        res.servicesFinalResult.length > 0
      ) {
        console.log(resSearch);
        setResSearch(res);
      }
    } catch (error) {
      // handle error
    }
  }

  useEffect(() => {
    if (fashionSearch) {
      handleSearch();
    }
  }, [fashionSearch]);

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
          }}
          textStyle={{
            textDecorationLine: "none",
          }}
        />
      </View>
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "#909090" : "#ffffff",
              width: 50,
            },
            styles.searchAreaBtn,
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <ScrollView>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="search for services"
            value={searchValue}
            onChangeText={(newText) => {
              setSearchValue(newText);
              console.log(newText);
            }}
            style={styles.textInput}
            keyboardType="web-search"
          />
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
        <>
          {errMsg ? (
            <View style={{ height: 50 }}>
              <StaticInlineNotice
                msg={errMsg}
                color="white"
                bgColor="red"
              />
            </View>
          ) : (
            <>
              {resSearch && resSearch.servicesFinalResult.length > 0 ? (
                <>
                  <View>
                    <Pressable
                      onPress={() => {
                        console.log("back");
                        setResSearch(undefined);
                        setFashionSearch(false);
                        setErrMsg("");
                      }}
                      style={{ padding: 5 }}
                    >
                      <Image source={backIcon} />
                    </Pressable>
                  </View>
                  <ServicesSearchCardLInfo
                    data={resSearch as ResSearchServices}
                    navigation={navigation}
                    searchValue={searchValue}
                  />
                </>
              ) : (
                <>
                  <View style={styles.categoriesBox}>
                    <Text style={styles.title}>Categories</Text>
                    <View style={styles.category}>
                      <Pressable>
                        <Text>Hotels</Text>
                      </Pressable>
                      <>{content}</>
                    </View>
                    <View style={styles.category}>
                      <Pressable>
                        <Text>Fashion</Text>
                      </Pressable>
                      <>{content}</>
                    </View>
                    <View style={styles.category}>
                      <Pressable>
                        <Text>Gadgets</Text>
                      </Pressable>
                      <>{content}</>
                    </View>
                    <View style={styles.category}>
                      <Pressable>
                        <Text>Electronics</Text>
                      </Pressable>
                      <>{content}</>
                    </View>
                    <View style={styles.category}>
                      <Pressable>
                        <Text>Building</Text>
                      </Pressable>
                      <>{content}</>
                    </View>
                  </View>
                </>
              )}
            </>
          )}
        </>
      </ScrollView>
    </SafeAreaView>
  );
};

interface FASHION_CHECKBOXESProps {
  label: string;
  value: string;
}

const FASHION_CHECKBOXES: FASHION_CHECKBOXESProps[] = [
  {
    label: "Plumber",
    value: "plumber",
  },
  {
    label: "Repairer",
    value: "repairer",
  },
  {
    label: "Make up",
    value: "make up",
  },
  {
    label: "Electrician",
    value: "electrician",
  },
  {
    label: "Mechanic",
    value: "mechanic",
  },
  {
    label: "Hairdresser",
    value: "hairdresser",
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    flex: 1,
    paddingTop: StatusBar.currentHeight || 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    columnGap: 10,
  },
  textInput: {
    height: 40,
    borderColor: "#cccccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#EDF4FB",
    width: "80%",
  },
  searchAreaBtn: {
    padding: 5,
    borderRadius: 50,
  },
  categoriesBox: {
    flexDirection: "column",
    rowGap: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
  category: {
    flexDirection: "column",
    rowGap: 5,
  },
});
