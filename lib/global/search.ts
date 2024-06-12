import { ResGroupSearch } from "../../types/groups/resGroupSearch";
import { ResSearchLInfo } from "../../types/products/resProducts";
import { ResSearchServices } from "../../types/services/resSearch";
import { baseURL } from "./baseURL";

type Props = {
  identifier: "products" | "groups" | "services";
  searchValue: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  lgIdentifier?: string;
  stateIdentifier?: string;
};
async function globalSearchFn({
  searchValue,
  setErrMsg,
  identifier,
  lgIdentifier,
  stateIdentifier,
}: Props): Promise<
  ResSearchLInfo | ResGroupSearch | ResSearchServices | undefined
> {
  if (
    identifier !== "products" &&
    identifier !== "groups" &&
    identifier !== "services"
  ) {
    throw new Error("Invalid identifier");
  }
  let url;

  if (identifier === "products" && !lgIdentifier && !stateIdentifier) {
    url = `${baseURL}/global/search?identifier=products&searchValue=${searchValue}`;
  } else if (identifier === "products" && lgIdentifier && stateIdentifier) {
    url = `${baseURL}/global/search?identifier=products&searchValue=${searchValue}&lgIdentifier=${lgIdentifier}&stateIdentifier=${stateIdentifier}`;
  } else if (identifier === "groups" && !lgIdentifier && !stateIdentifier) {
    url = `${baseURL}/global/search?identifier=groups&searchValue=${searchValue}`;
  } else if (identifier === "services" && !lgIdentifier && !stateIdentifier) {
    url = `${baseURL}/global/search?identifier=services&searchValue=${searchValue}`;
  } else {
    throw new Error("Invalid identifier");
  }

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

  const data: ResSearchLInfo | ResGroupSearch | ResSearchServices =
    await res.json();

  return data;
}
export default globalSearchFn;
