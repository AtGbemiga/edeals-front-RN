import { ResGetGroups } from "../../types/groups/resGetGroups";
import {
  OneSimilarProduct,
  ResProductsLInfo,
} from "../../types/products/resProducts";

// interface getLInfoFnProps {
//   identifierValue: "products";
//   discountValue?: string;
// }

async function getLInfoFn({
  identifier,
  subIdentifier,
  discountIdentifier,
  setErrMsg,
}: {
  identifier: "products" | "similarProducts" | "wishList" | "groups";
  subIdentifier?: string;
  discountIdentifier?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}) {
  let url;

  if (identifier === "products" && !discountIdentifier && !subIdentifier) {
    url = `https://fav-work.loca.lt/api/v1/global/getLInfo?identifier=${identifier}`;
  } else if (
    identifier === "products" &&
    discountIdentifier &&
    !subIdentifier
  ) {
    url = `https://fav-work.loca.lt/api/v1/global/getLInfo?identifier=${identifier}&discountIdentifier=${discountIdentifier}`;
  } else if (
    identifier === "similarProducts" &&
    !discountIdentifier &&
    subIdentifier
  ) {
    url = `https://fav-work.loca.lt/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (
    identifier === "wishList" &&
    !discountIdentifier &&
    subIdentifier
  ) {
    url = `https://fav-work.loca.lt/api/v1/global/getLInfo?identifier=${identifier}&subIdentifier=${subIdentifier}`;
  } else if (identifier === "groups" && !discountIdentifier && !subIdentifier) {
    url = `https://fav-work.loca.lt/api/v1/global/getLInfo?identifier=groups`;
  } else {
    throw new Error("Invalid identifier or discountIdentifier");
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

  const data: ResProductsLInfo | OneSimilarProduct | ResGetGroups =
    await res.json();

  return data;
}
export default getLInfoFn;
