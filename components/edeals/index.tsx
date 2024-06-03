import { Picker } from "@react-native-picker/picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Autocomplete from "react-native-autocomplete-input";
import { showMessage } from "react-native-flash-message";
import addDealFn from "../../lib/edeals/add";
import addDealTakerFn from "../../lib/edeals/addDealTaker";
import getDealsFn from "../../lib/edeals/get";
import updateNoticeFn from "../../lib/edeals/updateNotice";
import getAccOwnerEmail from "../../lib/global/getEmail";
import { payContactInitFn } from "../../lib/paystack/payInitContact";
import { payStackPostDealFn } from "../../lib/paystack/payPostDeal";
import getUserIdFn from "../../lib/users/getUserId";
import getAccNameFn from "../../lib/users/profile/getAccName";
import { FAddDeal } from "../../types/edeals/fAddDeal";
import { OneDeal, ResGetDeals } from "../../types/edeals/resGetDeals";
import { ResSuccess } from "../../types/global/resSuccess";
import { RootStackParamList } from "../../types/global/root";
import { ResGetAccOwnerEmail } from "../../types/groups/resGetAccOwnerEmail";
import { ResPaystackPaymentInit } from "../../types/paystack/resPaymentInitialization";
import { ResAccName } from "../../types/users/profile/resAccName";
import { ResGetUserId } from "../../types/users/resGetUserId";
import { StaticInlineNotice } from "../global/inlineNotice";
import { State, getCitiesForState, ngStates } from "../global/ngLocations";
import { globalStyles } from "../style/global";

const screenHeight = Dimensions.get("window").height;

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
    console.log("clicked");
    try {
      const res0 = await addDealTakerFn({
        deal_id: deal_poster_id,
        deal_taker_email: accOwnerEmail.result.email,
        setErrMsg,
      });
      console.log(res0);
      if (res0 && res0.message.includes("success")) {
        console.log(res0);

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
        <Pressable style={styles.contactBtn} onPress={handlePayment}>
          <Text style={globalStyles.textWhite}> Accept Deal</Text>
        </Pressable>
      </View>
    );
  } else if (deal_taker_id === accOwnerId) {
    ctaBtn = (
      <View>
        <Pressable style={styles.contactBtn} onPress={handlePayment}>
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
    <Pressable
      onPress={
        deal_poster_id === accOwnerId && deal_taker_id !== 0
          ? () => {
              navigation.navigate("DynamicProfile", { id: deal_taker_id });
            }
          : null
      }
    >
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
    </Pressable>
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
  const [showPayWall, setShowPayWall] = useState(false);
  const [errPayToPostDeal, setErrPayToPostDeal] = useState("");
  const [accName, setAccName] = useState<ResAccName | undefined>();
  const [errAccName, setErrAccName] = useState("");

  // in test
  const [query, setQuery] = useState("");
  const [cityQuery, setCityQuery] = useState<string>("");
  const [selectedState, setSelectedState] = useState<State | null>(null);

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

  useEffect(() => {
    (async () => {
      const res = await getAccNameFn({
        setErrMsg: setErrAccName,
      });
      setAccName(res);
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
        setShowPayWall(false);
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

  async function handleAddDeal1() {
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
        // showMessage({
        //   message: res.message,
        //   type: "success",
        // });
        // setShowPayWall(false);
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

  async function handlePayments() {
    if (!accOwnerEmail) {
      setAccEmailErr({ ...accEmailErr, getEmail: "Please login first" });
      return;
    }

    const price = 400000;

    const res = await payStackPostDealFn({
      email: accOwnerEmail?.result.email,
      amount: price.toString(),
      setErrMsg: setErrPayToPostDeal,
    });

    await handleAddDeal1();
    if (res) {
      navigation.navigate("PaymentScreenPostDeal", { res });
    }
  }

  const filteredStates = query
    ? ngStates.filter((state) =>
        state.label.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredCities = cityQuery
    ? getCitiesForState(selectedState?.value || "").filter((city) =>
        city.label.toLowerCase().includes(cityQuery.toLowerCase())
      )
    : getCitiesForState(selectedState?.value || "");

  return (
    <SafeAreaView style={globalStyles.mainBox}>
      <>
        {errMsg.getDeals && (
          <>
            <StaticInlineNotice
              msg={errMsg.getDeals}
              bgColor="#f8d7da"
              color="#842029"
            />
          </>
        )}

        <>
          <FlatList
            data={resDeals?.result}
            ListHeaderComponent={
              <View>
                <View>
                  <Text style={{ marginBottom: 15 }}>
                    {accName
                      ? accName.result.map((item, index) => (
                          <Text
                            key={index}
                            style={[globalStyles.boldText, { fontSize: 20 }]}
                          >
                            {item.account_name}
                            {index < accName.result.length - 1 ? ", " : ""}
                          </Text>
                        ))
                      : "bskd"}
                  </Text>
                  <Text style={globalStyles.boldText}> Add a deal</Text>
                  <View>
                    <Text>I want to buy</Text>
                    <TextInput
                      onChangeText={(newText) =>
                        setDeal({ ...deal, need: newText })
                      }
                      value={deal.need}
                      placeholder="a bike, an iPhone, a designer service, etc."
                      style={globalStyles.textInput}
                    />
                  </View>
                </View>
                <View>
                  <Text>My price is</Text>
                  <TextInput
                    onChangeText={(newText) =>
                      setDeal({ ...deal, price: newText })
                    }
                    value={deal.price}
                    placeholder="&#8358;5000"
                    style={globalStyles.textInput}
                    keyboardType="numeric"
                  />
                </View>
                <View>
                  <Text>State</Text>
                  <Autocomplete
                    data={
                      filteredStates.length === 1 &&
                      filteredStates[0].label === query
                        ? []
                        : filteredStates
                    }
                    defaultValue={query}
                    onChangeText={(text) => setQuery(text)}
                    placeholder="Type to search..."
                    flatListProps={{
                      keyExtractor: (item) => item.value,
                      renderItem: ({ item }) => (
                        <TouchableOpacity
                          onPress={() => {
                            setQuery(item.label);
                            setSelectedState(item);
                            setCityQuery(""); // Reset city query when a new state is selected
                          }}
                        >
                          <Text>{item.label}</Text>
                        </TouchableOpacity>
                      ),
                    }}
                  />
                </View>
                <View>
                  <Text>City</Text>
                  <Autocomplete
                    data={
                      filteredCities.length === 1 &&
                      filteredCities[0].label === cityQuery
                        ? []
                        : filteredCities
                    }
                    defaultValue={cityQuery}
                    onChangeText={(text) => setCityQuery(text)}
                    placeholder="Type to search..."
                    flatListProps={{
                      keyExtractor: (item) => item.value,
                      renderItem: ({ item }) => (
                        <TouchableOpacity
                          onPress={() => setCityQuery(item.label)}
                        >
                          <Text>{item.label}</Text>
                        </TouchableOpacity>
                      ),
                    }}
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
                    <Picker.Item label="Products" value="Products" />
                    <Picker.Item label="Make up Artist" value="MakeupArtist" />
                    <Picker.Item label="Hairdresser" value="Hairdresser" />
                    <Picker.Item label="Plumber" value="Plumber" />
                    <Picker.Item label="Electrician" value="Electrician" />
                    <Picker.Item label="Car Mechanic" value="CarMechanic" />
                    <Picker.Item label="Repairer" value="Repairer" />
                  </Picker>
                </View>
                <View>
                  <Pressable
                    onPress={() => setShowPayWall(true)}
                    style={styles.addPostBtn}
                  >
                    <Text style={globalStyles.textWhite}>Add Deal Post</Text>
                  </Pressable>
                </View>
              </View>
            }
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

          <Modal
            animationType="slide"
            transparent={true}
            visible={showPayWall}
            onRequestClose={() => {
              setShowPayWall(false);
            }}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <View style={{ marginBottom: 40 }}>
                  <Text>Choose to pay now or pay later to mechant</Text>
                </View>
                <View>
                  <Pressable onPress={() => setShowPayWall(false)}>
                    <Text>Cancel</Text>
                  </Pressable>
                </View>
                <View style={styles.modalHeader}>
                  <Text style={globalStyles.boldText}>Paywall</Text>
                </View>
                <Pressable onPress={handlePayments} style={styles.payBtn}>
                  <Text style={globalStyles.textWhite}>Pay Now</Text>
                </Pressable>
                <Pressable onPress={handleAddDeal} style={styles.payLaterBtn}>
                  <Text>Pay Later</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </>
      </>
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
  addPostBtn: {
    backgroundColor: "#59AEFF",
    width: "30%",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    paddingVertical: 100,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  modalHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  payBtn: {
    backgroundColor: "#59AEFF",
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  payLaterBtn: {
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#59AEFF",
  },
});
