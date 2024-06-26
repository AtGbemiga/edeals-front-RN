import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Image } from "react-native";
import FlashMessage from "react-native-flash-message";
import SellIcon from "./assets/Vector (1).png";
import CartIcon from "./assets/Vector.png";
import HomeIcon from "./assets/home.png";
import moreIcon from "./assets/more.png";
import ProfileIcon from "./assets/profile.png";
import { CartIndex } from "./components/cart";
import { GroupsIndex } from "./components/dynamic/groups";
import { GroupFullInfo } from "./components/dynamic/groups/gFullInfo";
import { DynamicProduct } from "./components/dynamic/products";
import { WishListIndex } from "./components/dynamic/wishList";
import { EdealsIndex } from "./components/edeals";
import { LoginSignUpF } from "./components/forms/loginSignUpF";
import { DynamicCategoriesSearch } from "./components/home/dynamicCategoriesSearch";
import { Home } from "./components/home/home";
import { SearchFiliter } from "./components/home/searchFiliter";
import { SearchFilterServices } from "./components/home/searchFilterServices";
import DynamicChat from "./components/messages";
import { More } from "./components/more";
import { DynamicNews } from "./components/news/dynamicNews";
import { UploadNews } from "./components/news/upload";
import { LoginSignUp } from "./components/onboarding/loginSignUp";
import { Screen1 } from "./components/onboarding/screen1";
import { Screen2 } from "./components/onboarding/screen2";
import { AccountType } from "./components/onboarding/selectAccType";
import { Orders } from "./components/orders";
import { ContactPayScreen } from "./components/paystack/contactPaymentScreen";
import { PaymentScreen } from "./components/paystack/paymentScreen";
import { Thanks } from "./components/paystack/thanks";
import { Privacy } from "./components/policy/privacy";
import { Terms } from "./components/policy/terms";
import { ProfileIndex } from "./components/profile";
import { DynamicProfile } from "./components/profile/dynamicProfile";
import { UpdateProfile } from "./components/profile/updateProfile";
import { SellIndex } from "./components/sell";
import { SettingsIndex } from "./components/settings";
import { ChangePassword } from "./components/settings/changePassword";
import { UploadShortVideo } from "./components/shortVideos";
import { DynamicShortVid } from "./components/shortVideos/dynamic";
import Start from "./components/start";
import { RootStackParamList } from "./types/global/root";
import { PostDealSuccess } from "./components/paystack/paymentSuccessPostDeal";
import { PaymentScreenPostDeal } from "./components/paystack/paymentScreenPostDeal";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

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
          name="HomeRoot"
          options={{ headerShown: false }}
        >
          {() => (
            <Tab.Navigator initialRouteName="Home">
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={HomeIcon}
                      style={{
                        width: focused ? 20 : 15,
                        height: focused ? 20 : 15,
                      }}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Cart"
                component={CartIndex}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={CartIcon}
                      style={{
                        width: focused ? 20 : 15,
                        height: focused ? 20 : 15,
                      }}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Sell"
                component={SellIndex}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={SellIcon}
                      style={{
                        width: focused ? 20 : 15,
                        height: focused ? 20 : 15,
                      }}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="Profile"
                component={ProfileIndex}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={ProfileIcon}
                      style={{
                        width: focused ? 20 : 15,
                        height: focused ? 20 : 15,
                      }}
                    />
                  ),
                  headerShown: false,
                }}
              />
              <Tab.Screen
                name="More"
                component={More}
                options={{
                  tabBarIcon: ({ focused }) => (
                    <Image
                      source={moreIcon}
                      style={{
                        width: focused ? 20 : 15,
                        height: focused ? 20 : 15,
                      }}
                    />
                  ),
                  headerShown: false,
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Dynamic Product"
          component={DynamicProduct}
          options={{ headerShown: false }}
          initialParams={{ id: undefined }}
        />
        <Stack.Screen
          name="Search Filiter"
          component={SearchFiliter}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicProfile"
          component={DynamicProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UpdateProfile"
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="WishList"
          component={WishListIndex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupsIndex"
          component={GroupsIndex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GroupFullInfo"
          component={GroupFullInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Thanks"
          component={Thanks}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Orders"
          component={Orders}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SearchFilterServices"
          component={SearchFilterServices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SettingsIndex"
          component={SettingsIndex}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="EDeals"
          component={EdealsIndex}
        />
        <Stack.Screen
          name="ContactPayScreen"
          component={ContactPayScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicChat"
          component={DynamicChat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicNews"
          component={DynamicNews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadShortVideo"
          component={UploadShortVideo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicShortVid"
          component={DynamicShortVid}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UploadNews"
          component={UploadNews}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DynamicCategoriesSearch"
          component={DynamicCategoriesSearch}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PostDealSuccess"
          component={PostDealSuccess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentScreenPostDeal"
          component={PaymentScreenPostDeal}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
}
