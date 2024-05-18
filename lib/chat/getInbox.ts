import Cookies from "js-cookie";
import { Res4InboxLIInfo } from "../../typesAndInterfaces/chat/res4Inbox";

async function getInboxFn({
  setErrMsg,
}: {
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4InboxLIInfo | undefined> {
  const url = `http://localhost:4192/api/v1/chat/getInbox`;

  const token = Cookies.get("token");

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

    console.log(errorMsg);

    // Set the error message in the state
    setErrMsg(errorMsg);

    // Throw an error to stop further execution
    return;
  }

  const data: Res4InboxLIInfo = await res.json();

  return data;
}

export default getInboxFn;
