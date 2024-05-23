import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
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
import { Picker } from "@react-native-picker/picker";
import { payContactInitFn } from "../../lib/paystack/payInitContact";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import { ResPaystackPaymentInit } from "../../types/paystack/resPaymentInitialization";
import { ResSuccess } from "../../types/global/resSuccess";
import { ResGetAccOwnerEmail } from "../../types/groups/resGetAccOwnerEmail";
import getAccOwnerEmail from "../../lib/global/getEmail";
import addDealTakerFn from "../../lib/edeals/addDealTaker";
import { ResGetUserId } from "../../types/users/resGetUserId";
import getUserIdFn from "../../lib/users/getUserId";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "EDeals">;
};
type UpdatedProps = Props &
  OneDeal & { accOwnerEmail: ResGetAccOwnerEmail; accOwnerId: number };

const OneDea = ({
  user_id: deal_poster_id,
  need,
  price,
  navigation,
  accOwnerEmail,
  lg,
  state,
  accOwnerId,
  deal_taker_id,
}: UpdatedProps) => {
  const [errMsg, setErrMsg] = useState("");
  async function handlePayment() {
    try {
      const res0 = await addDealTakerFn({
        deal_id: deal_poster_id,
        deal_taker_email: accOwnerEmail.result.email,
        setErrMsg,
      });
      if (res0 && res0.message.includes("success")) {
        const res: ResPaystackPaymentInit | ResSuccess | undefined =
          await payContactInitFn({
            email: accOwnerEmail.result.email,
            recipientID: deal_poster_id,
            setErrMsg,
          });

        if (!res) {
          console.error("Payment initialization failed.");
          return;
        }

        if (res.message.includes("success")) {
          console.log(res);
          navigation.navigate("DynamicChat", { recipient_id: deal_poster_id });
        } else if ("data" in res) {
          navigation.navigate("ContactPayScreen", {
            res,
            user_id: deal_poster_id,
          });
          console.log(res.data.authorization_url);
        } else {
          console.error("Unexpected response format:", res);
        }
      }
    } catch (error) {
      // disable empty object error
    }
  }

  let ctaBtn: JSX.Element;
  if (deal_taker_id === 0) {
    ctaBtn = (
      <View>
        <Pressable
          style={styles.contactBtn}
          onPress={handlePayment}
        >
          <Text style={globalStyles.textWhite}> Accept Deal</Text>
        </Pressable>
      </View>
    );
  } else if (deal_taker_id === accOwnerId) {
    ctaBtn = (
      <View>
        <Pressable
          style={styles.contactBtn}
          onPress={handlePayment}
        >
          <Text style={globalStyles.textWhite}> Contact</Text>
        </Pressable>
      </View>
    );
  } else {
    ctaBtn = (
      <View>
        <Text style={globalStyles.textRed}>Deal Taken</Text>
      </View>
    );
  }

  return (
    <View style={styles.oneDeal}>
      <View>
        <Text>{need}</Text>
        <Text>&#8358;{price.toLocaleString()}</Text>
        <Text>
          {lg}, {state}
        </Text>
      </View>
      {ctaBtn}
    </View>
  );
};

export const EdealsIndex = ({ navigation }: Props) => {
  const [resDeals, setResDeals] = useState<ResGetDeals>();
  const [errMsg, setErrMsg] = useState<{
    getDeals: string;
  }>({
    getDeals: "",
  });
  const [errUpdate, setErrUpdate] = useState("");
  const [accEmailErr, setAccEmailErr] = useState<{ getEmail: string }>({
    getEmail: "",
  });
  const [deal, setDeal] = useState<FAddDeal>({
    need: "",
    price: "",
    tag: "Products",
    lg: "",
    state: "",
  });
  const [accOwnerEmail, setAccOwnerEmail] = useState<
    ResGetAccOwnerEmail | undefined
  >();
  const [accOwnerId, setAccOwnerId] = useState<ResGetUserId | undefined>();
  const [errId, setErrId] = useState("");

  useEffect(() => {
    (async () => {
      const res = await getDealsFn({ setErrMsg });

      if (res && res.result.length > 0) {
        setResDeals(res);

        await updateNoticeFn({
          setErrUpdate,
        });

        const accOwnerEmail = await getAccOwnerEmail({
          setNewErrMsg: setAccEmailErr,
        });
        setAccOwnerEmail(accOwnerEmail);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await getUserIdFn({
        setErrMsg: setErrId,
      });
      setAccOwnerId(res);
      console.log("mmm", res);
      console.log("accOwnerId", accOwnerId);
    })();
  }, []);

  async function handleAddDeal() {
    if (deal.need === "" || deal.price === "") {
      showMessage({
        message: "Please fill in all fields",
        type: "danger",
        autoHide: true,
      });
      return;
    }
    try {
      const res = await addDealFn({
        need: deal.need,
        price: deal.price,
        tag: deal.tag,
        lg: deal.lg,
        state: deal.state,
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
          lg: "",
          state: "",
        });
      }
    } catch (error) {
      // disable empty object error
    }
  }

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <ScrollView>
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
          <View>
            <Text>Local government</Text>
            <TextInput
              onChangeText={(newText) => setDeal({ ...deal, lg: newText })}
              value={deal.lg}
              style={globalStyles.textInput}
            />
          </View>
          <View>
            <Text>State</Text>
            <TextInput
              onChangeText={(newText) => setDeal({ ...deal, state: newText })}
              value={deal.state}
              style={globalStyles.textInput}
            />
          </View>
          <View>
            <Text>Tag</Text>
            <Picker
              selectedValue={deal.tag}
              onValueChange={(itemValue) =>
                setDeal({ ...deal, tag: itemValue })
              }
            >
              <Picker.Item
                label="Products"
                value="Products"
              />
              <Picker.Item
                label="Make up Artist"
                value="MakeupArtist"
              />
              <Picker.Item
                label="Hairdresser"
                value="Hairdresser"
              />
              <Picker.Item
                label="Plumber"
                value="Plumber"
              />
              <Picker.Item
                label="Electrician"
                value="Electrician"
              />
              <Picker.Item
                label="Car Mechanic"
                value="CarMechanic"
              />
              <Picker.Item
                label="Repairer"
                value="Repairer"
              />
            </Picker>
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
                navigation={navigation}
                accOwnerEmail={accOwnerEmail as ResGetAccOwnerEmail}
                lg={item.lg}
                state={item.state}
                user_id={item.user_id}
                deal_taker_id={item.deal_taker_id}
                accOwnerId={(accOwnerId as ResGetUserId)?.user_id}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            extraData={resDeals?.result}
          />
        )}
      </ScrollView>
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
