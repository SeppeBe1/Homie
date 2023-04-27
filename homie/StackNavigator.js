import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './screens/Homescreen';
import Settings from './screens/settings';
import { View } from 'react-native';

  export function StackNavigator() {

    // Create a StackNavigator with the 3 provided screens
    const Stack = createStackNavigator();
    return (
      // independent={true}
      <NavigationContainer independent={true} >
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="homescreen" component={Home} />
          <Stack.Screen name="settings" component={Settings} />
        </Stack.Navigator>
        </NavigationContainer>

    );
  }