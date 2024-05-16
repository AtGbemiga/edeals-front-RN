import * as SecureStore from "expo-secure-store";
import { ResGetUserId } from "../../types/users/resGetUserId";

async function getUserIdFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResGetUserId | undefined> {
  const url = `https://fav-work.loca.lt/api/v1/users/getUserId`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
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

  const data: ResGetUserId = await res.json();

  console.log({ data });

  return data;
}
export default getUserIdFn;
