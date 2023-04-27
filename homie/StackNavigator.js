import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './TabNavigator';

import Home from './screens/Homescreen';
import Settings from './screens/settings';
import { View } from 'react-native';
import Homeaccount from './screens/Homeaccount';

const Stack = createStackNavigator();

const HomescreenStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="settings" component={Settings} />
      <Stack.Screen name="homeaccount" component={Homeaccount} />
    </Stack.Navigator>
  );
}

const BehomiescreenStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

const CostsplitterscreenStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

const CalendarScreenStack = () => {
  return (
    <Stack.Navigator >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
  );
}

export { HomescreenStack, BehomiescreenStack, CostsplitterscreenStack, CalendarScreenStack };