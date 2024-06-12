import * as SecureStore from "expo-secure-store";
import { Dispatch, SetStateAction } from "react";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function addDealTakerFn({
  deal_id,
  deal_taker_email,
  setErrMsg,
}: {
  deal_id: number;
  deal_taker_email: string;
  setErrMsg: Dispatch<SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/edeals/addDealTaker?fk_deal_id=${deal_id}`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deal_taker_email }),
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
export default addDealTakerFn;
