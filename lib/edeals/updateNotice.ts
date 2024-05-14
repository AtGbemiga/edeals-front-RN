import * as SecureStore from "expo-secure-store";
import { ResNoticeByUserId } from "../../types/edeals/resNoticeByUserId";

async function updateNoticeFn({
  setErrUpdate,
}: {
  setErrUpdate: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResNoticeByUserId | undefined> {
  const url = `https://fav-work.loca.lt/api/v1/edeals/updateNotice`;

  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "PATCH",
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
    setErrUpdate(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResNoticeByUserId = await res.json();

  return data;
}
export default updateNoticeFn;
