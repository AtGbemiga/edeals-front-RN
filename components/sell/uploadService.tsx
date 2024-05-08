import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootStackParamList } from "../../types/global/root";
type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Sell">;
};
export const UploadService = ({ navigation }: Props) => {
  return <Text>uploadService</Text>;
};
