import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginSignUpF } from "./components/forms/loginSignUpF";
import Start from "./components/start";
import { LoginSignUp } from "./components/onboarding/loginSignUp";
import { Screen1 } from "./components/onboarding/screen1";
import { Screen2 } from "./components/onboarding/screen2";
import { AccountType } from "./components/onboarding/selectAccType";
import { Privacy } from "./components/policy/privacy";
import { Terms } from "./components/policy/terms";
import { Home } from "./components/home/home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen1"
          component={Screen1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Screen2"
          component={Screen2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Select Account Type"
          component={AccountType}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Log In/Sign Up"
          component={LoginSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Log In/Sign Up Form"
          component={LoginSignUpF}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Terms"
          component={Terms}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Privacy"
          component={Privacy}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
