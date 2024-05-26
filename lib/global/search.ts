import { ResGroupSearch } from "../../types/groups/resGroupSearch";
import { ResSearchLInfo } from "../../types/products/resProducts";
import { ResSearchServices } from "../../types/services/resSearch";

type Props = {
  identifier: "products" | "groups" | "services";
  searchValue: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
};
async function globalSearchFn({
  searchValue,
  setErrMsg,
  identifier,
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

  if (identifier === "products") {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/search?identifier=products&searchValue=${searchValue}`;
  } else if (identifier === "groups") {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/search?identifier=groups&searchValue=${searchValue}`;
  } else if (identifier === "services") {
    url = `https://eager-hardly-gator.ngrok-free.app/api/v1/global/search?identifier=services&searchValue=${searchValue}`;
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
