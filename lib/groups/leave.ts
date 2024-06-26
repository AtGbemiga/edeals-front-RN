import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function leaveGroupFn({
  groupID,
  setErrMsg,
}: {
  groupID: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/groups/leaveGroup/${groupID}`;
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

  const data: ResSuccess = await res.json();

  return data;
}
export default leaveGroupFn;
