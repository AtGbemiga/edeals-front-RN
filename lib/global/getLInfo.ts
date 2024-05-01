import * as SecureStore from "expo-secure-store";
import { ResGetGroups } from "../../types/groups/resGetGroups";
import {
  OneSimilarProduct,
  ResProductsLInfo,
} from "../../types/products/resProducts";

async function getLInfoFn({
  identifier,
  subIdentifier,
  setErrMsg,
}: {
  identifier: "products" | "similarProducts" | "wishList" | "groups";
  subIdentifier?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}) {
  const token = await SecureStore.getItemAsync("token");
  let url;

  if (identifier === "products" && !subIdentifier) {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}`;
  } else if (identifier === "similarProducts" && subIdentifier) {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (identifier === "wishList" && subIdentifier) {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (identifier === "groups" && !subIdentifier) {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getLInfo?identifier=groups`;
  } else {
    throw new Error("Invalid identifier or discountIdentifier");
  }

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResProductsLInfo | OneSimilarProduct | ResGetGroups =
    await res.json();

  return data;
}
export default getLInfoFn;
