import * as SecureStore from "expo-secure-store";
import { ResAddToCart } from "../../types/products/resAddToCart";

async function uploadProductFn({
  formData,
  setErrMsg,
}: {
  formData: FormData;
  setErrMsg: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}): Promise<ResAddToCart | undefined> {
  const url = `https://fav-work.loca.lt/api/v1/products/upload`;
  const token = await SecureStore.getItemAsync("token");

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const exactErrorMsg = await res.json();
    const errorMsgString = JSON.stringify(exactErrorMsg);
    const errorMsg = JSON.parse(errorMsgString).error;

    // Set the error message in the state
    setErrMsg((prev) => ({ ...prev, uploadProduct: errorMsg }));

    // Throw an error to stop further execution
    return;
  }

  const data: ResAddToCart = await res.json();

  return data;
}
export default uploadProductFn;
