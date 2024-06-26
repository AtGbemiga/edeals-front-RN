import * as SecureStore from "expo-secure-store";
import { ResAddToCart } from "../../types/products/resAddToCart";
import { baseURL } from "../global/baseURL";

async function addToCartFn({
  product_id,
  qty,
  personalized_price,
  colour,
  size,
  setErrMsg,
}: {
  product_id: string;
  qty: string;
  personalized_price: string;
  colour: string;
  size: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResAddToCart | undefined> {
  const url = `${baseURL}/products/addToCart`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ product_id, qty, personalized_price, colour, size }),
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

  const data: ResAddToCart = await res.json();

  return data;
}
export default addToCartFn;
