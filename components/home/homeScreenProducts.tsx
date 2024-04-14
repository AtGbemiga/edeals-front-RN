import { Image, Pressable, Text, TextInput, View } from "react-native";
import { CardLInfo } from "../global/cardLInfo";
import { CategoriesFlatList } from "./categories";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";

// HSProducts = HomeScreenProducts
export const HSProducts = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<ParamListBase>;
}) => {
  return (
    <View>
      <>
        <View>
          <View>
            <TextInput placeholder="search for products" />
            <Text>Filiter button here</Text>
            <Text>Search button here</Text>
          </View>
          <View>
            <Text>Ad area</Text>
          </View>
          <View>
            <Text>Categories</Text>
            {/** Make use of CATEGORIES_DATA here in carousel flielist */}
            <CategoriesFlatList />
          </View>
          <View>
            <CardLInfo
              identifierValue="products"
              navigation={navigation}
            />
          </View>
          <View>
            <Pressable>
              <Image source={require("../../assets/Banner default.png")} />
            </Pressable>
          </View>
          <View>
            <CardLInfo
              identifierValue="products"
              discountValue="20"
              navigation={navigation}
            />
          </View>
        </View>
      </>
    </View>
  );
};
