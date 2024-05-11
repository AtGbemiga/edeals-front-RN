import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "react-native";
import { RootStackParamList } from "../../types/global/root";

type Props = NativeStackNavigationProp<RootStackParamList, "DynamicSearch">;
export const DynamicSearch = ({ navigation, route }: Props) => {
  return <Text>dynamicSearch</Text>;
};
