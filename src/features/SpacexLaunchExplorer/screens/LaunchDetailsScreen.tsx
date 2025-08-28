import PageHeader from '@/src/components/Headers/PageHeader/PageHeader';
import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import withRootStore from '../../../HOCs/withRootStore';
import AppText from '../../../components/ui/AppText/AppText';
import AppView from '../../../components/ui/AppView/AppView';
import { PropsWithStore } from '../../../mobxStore/RootStore';
import { RootStackParamsList } from '../../../navigation/RootStack/types';
import LaunchDetailsContent from '../components/LaunchDetailsContent/LaunchDetailsContent';
import { useLaunchDetails } from '../hooks/useLaunchDetails';

type LaunchDetailsRouteProp = RouteProp<RootStackParamsList, 'LaunchDetails'>;

const LaunchDetailsScreen = ({ rootStore }: PropsWithStore<LaunchDetailsRouteProp>) => {
  const { launch, launchpad, loading, error, userLocation, openNativeMaps } = useLaunchDetails({ rootStore: rootStore! });

  if (loading) {
    return (
      <AppView style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </AppView>
    );
  }

  if (error) {
    return (
      <AppView style={styles.centered}>
        <AppText style={styles.errorText}>{error}</AppText>
      </AppView>
    );
  }

  if (!launch) {
    return (
      <AppView style={styles.centered}>
        <AppText style={styles.errorText}>Launch details not found.</AppText>
      </AppView>
    );
  }

  return (
    <>
      <PageHeader.Spaced />
      <LaunchDetailsContent
        launch={launch}
        launchpad={launchpad}
        userLocation={userLocation}
        openNativeMaps={openNativeMaps}
      />
    </>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default withRootStore(LaunchDetailsScreen);
