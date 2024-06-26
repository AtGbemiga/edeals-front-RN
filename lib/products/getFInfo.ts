import * as SecureStore from "expo-secure-store";
import { ResProductFInfo } from "../../types/products/resProducts";
import { baseURL } from "../global/baseURL";

async function getFInfoFn({
  product_id,
  setErrMsg,
}: {
  product_id: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResProductFInfo | undefined> {
  const url = `${baseURL}/products/getFInfo/${product_id}`;
  const token = await SecureStore.getItemAsync("token");

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

  const data: ResProductFInfo = await res.json();

  return data;
}
export default getFInfoFn;
