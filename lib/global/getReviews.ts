import { Res4ProductReviews } from "../../types/products/resReviews";

async function getReviewsFn({
  product_id,
  setErrMsg,
  identifier,
}: {
  product_id: string;
  identifier: "products";
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4ProductReviews | undefined> {
  if (identifier !== "products") {
    throw new Error("Invalid identifier");
  }
  let url;

  if (identifier === "products") {
    url = `https://fav-work.loca.lt/api/v1/global/getReviews/${product_id}?identifier=products`;
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

  const data: Res4ProductReviews = await res.json();

  return data;
}
export default getReviewsFn;
