import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { globalStyles } from "../style/global";
import { useEffect, useState } from "react";
import { OneDeal, ResGetDeals } from "../../types/edeals/resGetDeals";
import getDealsFn from "../../lib/edeals/get";
import { StaticInlineNotice } from "../global/inlineNotice";
import { FAddDeal } from "../../types/edeals/fAddDeal";
import { CtaBtn } from "../global/ctaBtn";
import addDealFn from "../../lib/edeals/add";
import { showMessage } from "react-native-flash-message";
import updateNoticeFn from "../../lib/edeals/updateNotice";

const OneDea = ({ need, price }: OneDeal) => {
  return (
    <View style={styles.oneDeal}>
      <View>
        <Text>{need}</Text>
        <Text>&#8358;{price.toLocaleString()}</Text>
      </View>
      <View>
        <Pressable style={styles.contactBtn}>
          <Text style={globalStyles.textWhite}>Contact</Text>
        </Pressable>
      </View>
    </View>
  );
};

export const EdealsIndex = () => {
  const [resDeals, setResDeals] = useState<ResGetDeals>();
  const [errMsg, setErrMsg] = useState<{
    getDeals: string;
  }>({
    getDeals: "",
  });
  const [errUpdate, setErrUpdate] = useState("");
  const [deal, setDeal] = useState<FAddDeal>({
    need: "",
    price: "",
    tag: "Products",
  });
  useEffect(() => {
    (async () => {
      const res = await getDealsFn({ setErrMsg });

      if (res && res.result.length > 0) {
        setResDeals(res);

        const updateRes = await updateNoticeFn({
          setErrUpdate,
        });
      }
    })();
  }, []);

  async function handleAddDeal() {
    try {
      const res = await addDealFn({
        need: deal.need,
        price: deal.price,
        tag: deal.tag,
        setErrMsg,
      });

      if (res && res.message.includes("success")) {
        showMessage({
          message: res.message,
          type: "success",
        });
        // Reset form
        setDeal({
          need: "",
          price: "",
          tag: "Products",
        });
      }
    } catch (error) {
      // disable empty object error
    }
  }

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <View>
        <View>
          <Text style={globalStyles.boldText}>Add a deal</Text>
          <View>
            <Text>I want to buy</Text>
            <TextInput
              onChangeText={(newText) => setDeal({ ...deal, need: newText })}
              value={deal.need}
              placeholder="a bike, an iPhone, a designer service, etc."
              style={globalStyles.textInput}
            />
          </View>
        </View>
        <View>
          <Text>My price is</Text>
          <TextInput
            onChangeText={(newText) => setDeal({ ...deal, price: newText })}
            value={deal.price}
            placeholder="&#8358;5000"
            style={globalStyles.textInput}
            keyboardType="numeric"
          />
        </View>

        <CtaBtn
          text="Add deal"
          onPressFn={() => {
            handleAddDeal();
          }}
          paddingHorizontal={10}
          width={"50%"}
        />
      </View>

      {errMsg.getDeals ? (
        <>
          <StaticInlineNotice
            msg={errMsg.getDeals}
            bgColor="#f8d7da"
            color="#842029"
          />
        </>
      ) : (
        <FlatList
          data={resDeals?.result}
          renderItem={({ item }) => (
            <OneDea
              id={item.id}
              need={item.need}
              price={item.price}
              tag={item.tag}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          extraData={resDeals?.result}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  oneDeal: {
    flexDirection: "row",
    backgroundColor: "#c5c5c5",
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "space-between",
    marginBottom: 10,
  },
  contactBtn: {
    backgroundColor: "#59AEFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
