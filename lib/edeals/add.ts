import * as SecureStore from "expo-secure-store";
import { OneDeal } from "../../types/edeals/resGetDeals";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function addDealFn({
  need,
  price,
  tag,
  lg,
  state,
  setErrMsg,
}: {
  need: string;
  price: string;
  tag: OneDeal["tag"];
  lg: string;
  state: string;
  setErrMsg: React.Dispatch<
    React.SetStateAction<{
      getDeals: string;
    }>
  >;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/edeals/add`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ need, price, tag, lg, state }),
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg((prev) => ({ ...prev, getDeals: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResSuccess = await res.json();

  return data;
}
export default addDealFn;
