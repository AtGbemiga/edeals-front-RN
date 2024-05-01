import { Res4ProductReviews } from "../../types/products/resReviews";

async function getReviewsFn({
  product_id,
  setErrMsg,
  identifier,
  acc_id,
}: {
  product_id?: string;
  identifier: "products" | "sellerProfile";
  acc_id?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<Res4ProductReviews | undefined> {
  if (identifier !== "products" && identifier !== "sellerProfile") {
    throw new Error("Invalid identifier");
  }
  let url;

  if (identifier === "products") {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getReviews?identifier=products&product_id=${product_id}`;
  } else if (identifier === "sellerProfile") {
    url = `https://wealthy-reliably-hare.ngrok-free.app/api/v1/global/getReviews?identifier=sellerProfile&acc_id=${acc_id}`;
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
