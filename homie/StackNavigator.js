import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabNavigator } from "./TabNavigator";

import Home from "./screens/Homescreen";
import Behomie from "./screens/BeHomiescreen";
import Costsplitter from "./screens/Costsplitter/Costsplitterscreen";
import Calendar from "./screens/Planner/Calendarscreen";
import Homeaccount from "./screens/Homeaccount";
import Myprofilescreen from "./screens/MyProfilescreen";
import Settingsscreen from "./screens/settings";
import Login from "./screens/login/Login";
import SignUp from "./screens/login/SignUp";
import HouseChoice from "./screens/login/HouseChoice";
import CreateHouse from "./screens/login/CreateHouse";
import CreateHouseAdress from "./screens/login/CreateHouseAdress";
import CreateHouseRule from "./screens/login/CreateHouseRule";
import ShareHomie from "./screens/login/ShareHomie";
import JoinHouse from "./screens/login/JoinHouse";
import FullCalenderScreen from "./screens/Planner/FullCalenderScreen";
import EventsScreen from "./screens/Planner/EventsScreen";
import TasksScreen from "./screens/Planner/TasksScreen";
import AddTask from "./screens/Planner/AddTask";
import AddEvent from "./screens/Planner/AddEvent";
import EventDetails from "./screens/Planner/EventDetails";
import SplitCosts from "./screens/Costsplitter/SplitCosts";
import AskRefund from "./screens/Costsplitter/AskRefund";
import AddSpending from "./screens/Costsplitter/AddSpending";
import ViewStatistics from "./screens/Costsplitter/ViewStatistics";
import ViewInvoices from "./screens/Costsplitter/ViewInvoices";
import ChangePassword from "./screens/ChangePassword";
import HousemateProfile from "./screens/HousemateProfile";
import ExternHomeaccount from "./screens/ExternHomeaccount";
import Discover from "./compontents/Discover";
import Nearby from "./compontents/Nearby";
import AddInvoice from "./screens/Costsplitter/AddInvoice";
import CategoryScreen from "./screens/Costsplitter/CategoryScreen";
import Memorywall from "./screens/Memorywall";
import ThankYouScreen from "./screens/ThankYouScreen";
import CalendarScreen from "./screens/Planner/Calendarscreen";

const Homename = "Home";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginscreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="HouseChoice"
        component={HouseChoice}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="JoinHouse"
        component={JoinHouse}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="CreateHouse"
        component={CreateHouse}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="CreateHouseAdress"
        component={CreateHouseAdress}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="CreateHouseRule"
        component={CreateHouseRule}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="ShareHomie"
        component={ShareHomie}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{ tabBarVisible: true }}
      />

      <Stack.Screen
        name="ThankYouScreen"
        component={ThankYouScreen}
        options={{ tabBarVisible: true }}
      />

      <Stack.Screen name="Memorywall" component={Memorywall} />
    </Stack.Navigator>
  );
};

const HomescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ tabBarVisible: true }}
      />
      <Stack.Screen name="homeaccount" component={Homeaccount} />
      <Stack.Screen name="myprofilescreen" component={Myprofilescreen} />
      <Stack.Screen name="settingsscreen" component={Settingsscreen} />
      <Stack.Screen name="changepassword" component={ChangePassword} />
      <Stack.Screen name="housemateprofile" component={HousemateProfile} />
    </Stack.Navigator>
  );
};

const BehomiescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="behomie" component={Behomie} />
      <Stack.Screen name="memorywall" component={Memorywall} />
      <Stack.Screen name="Nearby" component={Nearby} />
      <Stack.Screen name="Discover" component={Discover} />
      <Stack.Screen name="externhomeaccount" component={ExternHomeaccount} />
      <Stack.Screen name="housemateprofile" component={HousemateProfile} />
    </Stack.Navigator>
  );
};

const CostsplitterscreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="costsplitter" component={Costsplitter} />
      <Stack.Screen name="SplitCosts" component={SplitCosts} />
      <Stack.Screen name="AskRefund" component={AskRefund} />
      <Stack.Screen name="AddSpending" component={AddSpending} />
      <Stack.Screen name="ViewInvoices" component={ViewInvoices} />
      <Stack.Screen name="ViewStatistics" component={ViewStatistics} />
      <Stack.Screen name="AddInvoice" component={AddInvoice} />
      <Stack.Screen name="CategoryScreen" component={CategoryScreen} />
    </Stack.Navigator>
  );
};

const CalendarScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Calendar" component={Calendar} />
      <Stack.Screen name="FullCalenderScreen" component={FullCalenderScreen} />
      <Stack.Screen name="EventsScreen" component={EventsScreen} />
      <Stack.Screen name="TasksScreen" component={TasksScreen} />
      <Stack.Screen name="AddTask" component={AddTask} />
      <Stack.Screen name="AddEvent" component={AddEvent} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

export {
  HomescreenStack,
  BehomiescreenStack,
  CostsplitterscreenStack,
  CalendarScreenStack,
  LoginscreenStack,
};
