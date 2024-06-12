import * as SecureStore from "expo-secure-store";
import { ResGetDeals } from "../../types/edeals/resGetDeals";
import { baseURL } from "../global/baseURL";

async function getDealsFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<
    React.SetStateAction<{
      getDeals: string;
    }>
  >;
}): Promise<ResGetDeals | undefined> {
  const url = `${baseURL}/edeals/get`;

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
    setErrMsg((prev) => ({ ...prev, getDeals: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResGetDeals = await res.json();

  return data;
}
export default getDealsFn;
