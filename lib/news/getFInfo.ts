import * as SecureStore from "expo-secure-store";
import { ResGetNewsFInfo } from "../../types/news/resGet";
import { baseURL } from "../global/baseURL";

async function getNewsFInfoFn({
  id,
  setErrMsg,
}: {
  id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResGetNewsFInfo | undefined> {
  const url = `${baseURL}/news/getAll/${id}`;

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

    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResGetNewsFInfo = await res.json();

  return data;
}

export default getNewsFInfoFn;
