import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "PaymentScreenPostDeal"
>;

export const PaymentScreenPostDeal = ({ navigation, route }: Props) => {
  const { authorization_url, reference: referenceID } = route.params.res.data;
  console.log({ authorization_url, reference: referenceID });

  const webviewRef = useRef<WebView>(null); // Create a ref for the WebView component

  const callback_url = "${baseURL}/paystack/postdealc";
  const cancel_url = "${baseURL}/paystack/cancelurl";

  const onNavigationStateChange = (state: WebViewNavigation) => {
    const { url } = state;
    console.log({ url });

    if (!url) return;

    if (url.includes("postdealc") && url.includes("reference")) {
      navigation.navigate("PostDealSuccess");
    }

    if (url === cancel_url) {
      // Use a navigator to pop off the view
      navigation.pop(1);
    }

    if (url === "https://standard.paystack.co/close") {
      navigation.navigate("Cart");
    }
  };

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: authorization_url }}
      style={{ marginTop: 40 }}
      onNavigationStateChange={onNavigationStateChange}
    />
  );
};
