import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

import Home from './screens/Homescreen';
import Settings from './screens/settings';
import Behomie from './screens/BeHomiescreen';
import Costsplitter from './screens/Costsplitterscreen';
import Calendar from './screens/Calendarscreen';
import { View } from 'react-native';
import Homeaccount from './screens/Homeaccount';

const Stack = createStackNavigator();

const HomescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="homeaccount" component={Homeaccount} />
    </Stack.Navigator>
  );
}

const BehomiescreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="behomie" component={Behomie} />
    </Stack.Navigator>
  );
}

const CostsplitterscreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="costsplitter" component={Costsplitter} />
    </Stack.Navigator>
  );
}

const CalendarScreenStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="calendar" component={Calendar} />
    </Stack.Navigator>
  );
}

export { HomescreenStack, BehomiescreenStack, CostsplitterscreenStack, CalendarScreenStack };