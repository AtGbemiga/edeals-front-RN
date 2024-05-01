import * as SecureStore from "expo-secure-store";
import { ResGroupFInfo } from "../../types/groups/resGetFInfo";

async function getGroupFInfoFn({
  groupID,
  setErrMsg,
}: {
  groupID: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResGroupFInfo | undefined> {
  const url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/groups/getGroupFInfo/${groupID}`;
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

  const data: ResGroupFInfo = await res.json();

  return data;
}
export default getGroupFInfoFn;
