import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";

async function uploadNewsFn({
  formData,
  setErrMsg,
}: {
  formData: FormData;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `https://eager-hardly-gator.ngrok-free.app/api/v1/news/upload`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

  const data: ResSuccess = await res.json();

  return data;
}

export default uploadNewsFn;
