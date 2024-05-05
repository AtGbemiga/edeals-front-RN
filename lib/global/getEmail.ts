import * as SecureStore from "expo-secure-store";
import { ResGetAccOwnerEmail } from "../../types/groups/resGetAccOwnerEmail";

async function getAccOwnerEmail({
  setNewErrMsg,
}: {
  setNewErrMsg: React.Dispatch<
    React.SetStateAction<{
      getEmail: string;
    }>
  >;
}): Promise<ResGetAccOwnerEmail | undefined> {
  const url = `https://fav-work.loca.lt/api/v1/global/getAccOwnerEmail`;

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
    setNewErrMsg((prev) => ({ ...prev, getEmail: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResGetAccOwnerEmail = await res.json();

  return data;
}
export default getAccOwnerEmail;
