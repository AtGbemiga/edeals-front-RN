import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../../types/global/resSuccess";
import { baseURL } from "../../global/baseURL";

async function updateProfileFn({
  formBody,
  setErrMsg,
}: {
  formBody: FormData;
  setErrMsg: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/users/updateProfile`;

  const token = await SecureStore.getItemAsync("token");
  console.log({ formBody });

  const res = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formBody,
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

  console.log({ data });

  return data;
}
export default updateProfileFn;
