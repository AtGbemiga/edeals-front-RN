import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";

async function changePasswordFn({
  oldPassword,
  newPassword,
  setErrMsg,
}: {
  oldPassword: string;
  newPassword: string;
  setErrMsg: React.Dispatch<React.SetStateAction<{ changePassword: string }>>;
}): Promise<ResSuccess | undefined> {
  const url = `https://eager-hardly-gator.ngrok-free.app/api/v1/users/change-password`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ oldPassword, newPassword }),
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg((prev) => ({ ...prev, changePassword: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResSuccess = await res.json();

  console.log({ data });

  return data;
}
export default changePasswordFn;
