import * as SecureStore from "expo-secure-store";
async function booleanTokenCheck() {
  const token = await SecureStore.getItemAsync("token");
  if (token === null) {
    return false;
  }
  return true;
}
export default booleanTokenCheck;
