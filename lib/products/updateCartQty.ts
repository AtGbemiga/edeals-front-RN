import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";

async function updateCartQtyFn({
  qty,
  cart_id,
  setErrMsg,
}: {
  qty: number;
  cart_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/products/updateCartQty/${cart_id}`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ qty }),
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
export default updateCartQtyFn;
