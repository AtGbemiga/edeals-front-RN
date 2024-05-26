import * as SecureStore from "expo-secure-store";
import { ResGetGroups } from "../../types/groups/resGetGroups";
import { ResGetOrders } from "../../types/orders/resGetOrders";
import {
  ResProductsLInfo,
  ResSimilarProducts,
  ResWishListLInfo,
} from "../../types/products/resProducts";
import { ResGetNews } from "../../types/news/resGet";
import { ResShortVideoLInfo } from "../../types/shortVideos/resLInfo";

async function getLInfoFn({
  identifier,
  subIdentifier,
  setErrMsg,
}: {
  identifier:
    | "products"
    | "similarProducts"
    | "wishList"
    | "groups"
    | "orders"
    | "news"
    | "shortVideos";
  subIdentifier?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const token = await SecureStore.getItemAsync("token");
  let url;

  if (identifier === "products" && !subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}`;
  } else if (identifier === "similarProducts" && subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (identifier === "wishList" && subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (identifier === "groups" && !subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=groups`;
  } else if (identifier === "orders" && !subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=orders`;
  } else if (identifier === "news" && !subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=news`;
  } else if (identifier === "shortVideos" && !subIdentifier) {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/getLInfo?identifier=shortVideos`;
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
    setErrMsg((prev) => ({ ...prev, [identifier]: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data:
    | ResProductsLInfo
    | ResSimilarProducts
    | ResGetGroups
    | ResGetOrders
    | ResWishListLInfo
    | ResGetNews
    | ResShortVideoLInfo = await res.json();

  return data;
}
export default getLInfoFn;
