import * as SecureStore from "expo-secure-store";
import { ResShortVideoFInfo } from "../../types/shortVideos/resFInfo";
import { baseURL } from "../global/baseURL";

async function getAllShortVidFn({
  id,
  setErrMsg,
}: {
  id: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResShortVideoFInfo | undefined> {
  const url = `${baseURL}/shortVideos/getAllInfo?video_id=${id}`;

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

    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResShortVideoFInfo = await res.json();

  return data;
}

export default getAllShortVidFn;
