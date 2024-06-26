import * as SecureStore from "expo-secure-store";
import { ResNoticeByUserId } from "../../types/edeals/resNoticeByUserId";
import { Errs } from "../../components/edeals/notice";
import { baseURL } from "../global/baseURL";

async function getNoticeByUserIdFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<Errs>>;
}): Promise<ResNoticeByUserId | undefined> {
  const url = `${baseURL}/edeals/noticeByUserTag`;

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
    setErrMsg((prev) => ({ ...prev, getNotice: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResNoticeByUserId = await res.json();

  return data;
}
export default getNoticeByUserIdFn;
