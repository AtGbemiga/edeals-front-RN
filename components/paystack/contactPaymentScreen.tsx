import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackScreenProps<RootStackParamList, "ContactPayScreen">;

export const ContactPayScreen = ({ navigation, route }: Props) => {
  const { authorization_url, reference: referenceID } = route.params.res.data;
  const { user_id } = route.params;
  console.log({ authorization_url, reference: referenceID, user_id });

  const webviewRef = useRef<WebView>(null); // Create a ref for the WebView component

  const callback_url =
    "https://fav-work.loca.lt/api/v1/paystack/callbackurlcontact";
  const cancel_url = "https://fav-work.loca.lt/api/v1/paystack/cancelurl";

  const onNavigationStateChange = (state: WebViewNavigation) => {
    const { url } = state;
    console.log({ url });

    if (!url) return;

    // navigate to messaging page
    if (url.includes(callback_url)) {
      navigation.navigate("DynamicChat", { recipient_id: user_id });
    }

    if (url === cancel_url) {
      // Use a navigator to pop off the view
      navigation.navigate("Cart");
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
