import * as SecureStore from "expo-secure-store";
import { ResGetProfile } from "../../../types/users/profile/resGetProfile";

async function getProfileFn({
  acc_id,
  setErrMsg,
}: {
  acc_id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResGetProfile | undefined> {
  const url = `https://eager-hardly-gator.ngrok-free.app/api/v1/users/profile/${acc_id}`;

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

  const data: ResGetProfile = await res.json();

  return data;
}
export default getProfileFn;
