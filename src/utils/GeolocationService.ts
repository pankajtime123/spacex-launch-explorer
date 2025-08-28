import * as Location from 'expo-location';

type Coordinates = {
  latitude: number;
  longitude: number;
};

/**
 * Requests location authorization from the user.
 * On iOS, this is required; on Android it has no effect (handled by PermissionsAndroid).
 * @returns {Promise<void>}
 */
const requestLocationPermission = async (): Promise<void> => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return Promise.reject(new Error('Location permission not granted'));
  }
  return Promise.resolve();
};

/**
 * Gets the current location after requesting permission.
 * @returns {Promise<Coordinates>}
 */
const getCurrentLocation = async (): Promise<Coordinates> => {
  try {
    await requestLocationPermission();

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.LocationAccuracy.High,
      timeInterval: 10000,
    });

    const { latitude, longitude } = location.coords;
    return { latitude, longitude };
  } catch (err) {
    return Promise.reject(err);
  }
};

export default {
  requestLocationPermission,
  getCurrentLocation,
};
