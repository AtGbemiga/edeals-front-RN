import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function logOutFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/users/logout`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg((prev) => ({ ...prev, profile: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResSuccess = await res.json();

  // delete the token
  await SecureStore.deleteItemAsync("token");

  console.log({ data });

  return data;
}
export default logOutFn;
