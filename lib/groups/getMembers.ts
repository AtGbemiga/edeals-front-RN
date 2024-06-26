import { ResGetGroupMembers } from "../../types/groups/resGetMembers";
import { baseURL } from "../global/baseURL";

async function getGroupMembersFn({
  groupID,
  setErrMsg,
}: {
  groupID: number;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResGetGroupMembers | undefined> {
  const url = `${baseURL}/groups/getGroupMembers/${groupID}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: ResGetGroupMembers = await res.json();

  return data;
}
export default getGroupMembersFn;
