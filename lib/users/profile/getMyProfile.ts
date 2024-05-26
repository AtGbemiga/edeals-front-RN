import * as SecureStore from "expo-secure-store";
import { ResMyProfile } from "../../../types/users/profile/resGetProfile";

async function getMyProfileFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}): Promise<ResMyProfile | undefined> {
  const url = `https://eager-hardly-gator.ngrok-free.app/api/v1/users/myProfile`;

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
    setErrMsg((prev) => ({ ...prev, profile: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResMyProfile = await res.json();

  return data;
}
export default getMyProfileFn;
