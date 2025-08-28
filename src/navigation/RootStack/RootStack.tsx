import SplashScreen from '@/src/screens/SplashScreen/SplashScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LaunchDetailsScreen from '../../features/SpacexLaunchExplorer/screens/LaunchDetailsScreen';
import HomeScreen from '../../screens/HomeScreen/HomeScreen';
import { RootStackScreens } from './types';

const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={RootStackScreens.SplashScreen}>
      <Stack.Screen
        name={RootStackScreens.Home}
        component={HomeScreen}
      />
      <Stack.Screen
        name={RootStackScreens.LaunchDetails}
        component={LaunchDetailsScreen}
      />
      <Stack.Screen
        name={RootStackScreens.SplashScreen}
        component={SplashScreen}
      />
    </Stack.Navigator>
  );
}
