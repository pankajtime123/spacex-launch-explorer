import { RootStoreType } from '@/src/mobxStore/RootStore';
import { RouteProp, useRoute } from '@react-navigation/native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Alert, Linking, Platform } from 'react-native';
import { RootStackParamsList } from '../../../navigation/RootStack/types';

type LaunchDetailsRouteProp = RouteProp<RootStackParamsList, 'LaunchDetails'>;

export const useLaunchDetails = ({rootStore}:{rootStore: RootStoreType}) => {
  const route = useRoute<LaunchDetailsRouteProp>();
  const { launchId } = route.params;
  const { spaceXStore } = rootStore;
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    const fetchLaunchAndLaunchpad = async () => {
      if (spaceXStore.launches.length === 0) {
        await spaceXStore.fetchLaunches();
      }

      const foundLaunch = spaceXStore.launches.find(l => l.id === launchId);
      if (foundLaunch?.launchpad) {
        await spaceXStore.fetchLaunchpad(foundLaunch.launchpad);
      }
    };

    const requestLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Permission to access location was denied. Please enable it in settings to see your location on the map.',
          [{ text: 'OK' }]
        );
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    };

    fetchLaunchAndLaunchpad();
    requestLocationPermission();
  }, [launchId, spaceXStore]);

  const launch = spaceXStore.launches.find(l => l.id === launchId);
  const launchpad = launch?.launchpad ? spaceXStore.getLaunchpadById(launch.launchpad) : undefined;

  const openNativeMaps = () => {
    if (launchpad && userLocation) {
      const url = Platform.select({
        ios: `maps://app?saddr=${userLocation.latitude},${userLocation.longitude}&daddr=${launchpad.latitude},${launchpad.longitude}`,
        android: `google.navigation:q=${launchpad.latitude},${launchpad.longitude}`,
      });

      if (url) {
        Linking.openURL(url).catch(err =>
          console.error('An error occurred', err)
        );
      }
    } else {
      Alert.alert('Navigation Error', 'Could not get launchpad or your location for directions.');
    }
  };

  return {
    launch,
    launchpad,
    loading: spaceXStore.loadingLaunches || spaceXStore.loadingLaunchpad,
    error: spaceXStore.error,
    userLocation,
    openNativeMaps,
  };
};
