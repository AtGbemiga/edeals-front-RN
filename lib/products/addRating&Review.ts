import * as SecureStore from "expo-secure-store";
import { ResSuccess } from "../../types/global/resSuccess";
import { baseURL } from "../global/baseURL";

async function addRatingAndReviewFn({
  product_id,
  rating,
  review,
  setErrMsg,
}: {
  product_id: number;
  rating: number;
  review: string;

  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}): Promise<ResSuccess | undefined> {
  const url = `${baseURL}/products/addRatingAndReview/${product_id}`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ rating, review }),
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

  const data: ResSuccess = await res.json();

  return data;
}
export default addRatingAndReviewFn;
