import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamsList = {
  MainScreen: undefined;
  RoughScreen: undefined;
  SplashScreen: undefined;
  Home: undefined; // Add Home screen
  LaunchDetails: { launchId: string }; // Add LaunchDetails screen with launchId
};

export type RootStackScreenProps<T extends keyof RootStackParamsList> = NativeStackScreenProps<RootStackParamsList, T>;

type RootStackParamList = keyof RootStackParamsList;

export const RootStackScreens: { [K in RootStackParamList]: K } = {
  MainScreen: 'MainScreen',
  RoughScreen: 'RoughScreen',
  SplashScreen: 'SplashScreen',
  Home: 'Home', // Add Home screen
  LaunchDetails: 'LaunchDetails', // Add LaunchDetails screen
};