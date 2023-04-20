import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Homescreen from "./screens/Homescreen";
import Homeaccount from "./screens/Homeaccount";
import BottomBarContainer from "./BottomBarContainer";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Homescreen" component={Homescreen} />
        <Stack.Screen name="Homeaccount" component={Homeaccount} />
        <Stack.Screen
          name="BottomBarContainer"
          component={BottomBarContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
