import { ResProductsLInfo } from "../../types/products/resProducts";

type Props = {
  identifier: "products";
  searchValue: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
};
async function searchFn({
  searchValue,
  setErrMsg,
  identifier,
}: Props): Promise<ResProductsLInfo | undefined> {
  if (identifier !== "products") {
    throw new Error("Invalid identifier");
  }
  let url;

  if (identifier === "products") {
    url = `https://fav-work.loca.lt/api/v1/global/search?identifier=products&searchValue=${searchValue}`;
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

  const data: ResProductsLInfo = await res.json();

  return data;
}
export default searchFn;
