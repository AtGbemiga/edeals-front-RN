import * as SecureStore from "expo-secure-store";
import { ResAuth } from "../types/users/resAuth";

async function loginSignupFn({
  account_name,
  password,
  account_type,
  identifier,
  email,
  phone_number,
  setErrMsg,
}: {
  account_name: string;
  account_type: string;
  password: string;
  identifier: "login" | "signup";
  email?: string;
  phone_number?: string;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
}) {
  if (identifier === "login") {
    const url = "https://a6d7-102-89-23-80.ngrok-free.app/api/v1/users/login";
    console.log({ account_name, password, account_type });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_name,
        account_type,
        password,
      }),
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

    const data: ResAuth = await res.json();
    console.log({ data });

    const token = data.token;

    // check if a token already exists in the secure store
    const existingToken = await SecureStore.getItemAsync("token");

    if (existingToken) {
      // if a token already exists, delete it and store the new token
      await SecureStore.deleteItemAsync("token");
      await SecureStore.setItemAsync("token", token);
    } else {
      // if no token exists, store the new token
      await SecureStore.setItemAsync("token", token);
    }

    return data.message;
  } else if (identifier === "signup") {
    const url = "https://a6d7-102-89-23-80.ngrok-free.app/api/v1/users";

    console.log({ email, phone_number, account_name, password, account_type });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        account_name,
        account_type,
        password,
        email,
        phone_number,
      }),
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

    const data: ResAuth = await res.json();
    console.log({ data });

    const token = data.token;

    // check if a token already exists in the secure store
    const existingToken = await SecureStore.getItemAsync("token");

    if (existingToken) {
      // if a token already exists, delete it and store the new token
      await SecureStore.deleteItemAsync("token");
      await SecureStore.setItemAsync("token", token);
    } else {
      // if no token exists, store the new token
      await SecureStore.setItemAsync("token", token);
    }

    return data.message;
  }
}
export default loginSignupFn;
