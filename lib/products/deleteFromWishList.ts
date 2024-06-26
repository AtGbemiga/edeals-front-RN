import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function deleteFromWishListFn({
  wishlistItemId,
  setErrMsg,
}: {
  wishlistItemId: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/products/deleteWishListItem/${wishlistItemId}`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "DELETE",
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

  const data: ResSuccess = await res.json();

  return data;
}
export default deleteFromWishListFn;
