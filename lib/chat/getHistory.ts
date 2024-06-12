import * as SecureStore from "expo-secure-store";
import { Res4ChatHistory } from "../../types/chat/res4History";
import { baseURL } from "../global/baseURL";

async function getChatHistoryFn({
  fk_sender_id,
  fk_recipient_id,
  setErrMsg,
}: {
  fk_sender_id: number;
  fk_recipient_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4ChatHistory | undefined> {
  const url = `${baseURL}/chat?fk_sender_id=${fk_sender_id}&fk_recipient_id=${fk_recipient_id}`;

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

  const data: Res4ChatHistory = await res.json();

  return data;
}

export default getChatHistoryFn;
