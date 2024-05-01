import React, { useRef } from "react";
import { WebView, WebViewNavigation } from "react-native-webview";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/global/root";
import { ResVerifyPayment } from "../../types/paystack/resVerifyPayment";

type Props = NativeStackScreenProps<RootStackParamList, "PaymentScreen">;

export const PaymentScreen = ({ navigation, route }: Props) => {
  const { authorization_url, reference: referenceID } = route.params.res.data;
  console.log({ authorization_url, reference: referenceID });

  const webviewRef = useRef<WebView>(null); // Create a ref for the WebView component

  const callback_url =
    "https://wealthy-reliably-hare.ngrok-free.app/api/v1/paystack/callbackurl";
  const cancel_url =
    "https://wealthy-reliably-hare.ngrok-free.app/api/v1/paystack/cancelurl";

  const onNavigationStateChange = (state: WebViewNavigation) => {
    const { url } = state;

    if (!url) return;

    if (url === callback_url) {
      const redirectTo = 'window.location = "' + callback_url + '"';
      webviewRef.current?.injectJavaScript(redirectTo); // Access injectJavaScript method via ref
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
