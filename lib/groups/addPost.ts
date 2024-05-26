import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";

async function addGroupPostFn({
  formDataBody,
  setErrMsg,
}: {
  formDataBody: FormData;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `https://eager-hardly-gator.ngrok-free.app/api/v1/groups/addGroupPost`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formDataBody,
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    setErrMsg(errorMsg);

    return;
  }

  const data: ResSuccess = await res.json();

  return data;
}
export default addGroupPostFn;
