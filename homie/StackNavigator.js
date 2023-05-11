import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Homescreen";
import Behomie from "./screens/BeHomiescreen";
import Costsplitter from "./screens/Costsplitterscreen";
import Calendar from "./screens/Calendarscreen";
import Homeaccount from "./screens/Homeaccount";
import Myprofilescreen from "./screens/MyProfilescreen";
import Settingsscreen from "./screens/settings";
import FullCalenderScreen from "./screens/FullCalenderScreen";

const Stack = createStackNavigator();

const HomescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="homeaccount" component={Homeaccount} />
      <Stack.Screen name="myprofilescreen" component={Myprofilescreen} />
      <Stack.Screen name="settingsscreen" component={Settingsscreen} />
    </Stack.Navigator>
  );
};

const BehomiescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="behomie" component={Behomie} />
    </Stack.Navigator>
  );
};

const CostsplitterscreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="costsplitter" component={Costsplitter} />
    </Stack.Navigator>
  );
};

const CalendarScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="calendar" component={Calendar} />
      <Stack.Screen name="FullCalenderScreen" component={FullCalenderScreen} />
    </Stack.Navigator>
  );
};

export {
  HomescreenStack,
  BehomiescreenStack,
  CostsplitterscreenStack,
  CalendarScreenStack,
};
