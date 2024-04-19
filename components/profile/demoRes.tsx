import * as React from "react";
import { ScrollView, Text } from "react-native";

export function DemoResponse({ children }: React.PropsWithChildren<{}>) {
  if (children == null) {
    return null;
  }

  return (
    <ScrollView>
      <Text>{JSON.stringify(children, null, 2)}</Text>
    </ScrollView>
  );
}
