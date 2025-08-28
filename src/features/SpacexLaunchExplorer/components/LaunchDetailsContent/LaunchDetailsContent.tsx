import { bottomInsets } from '@/src/utils/resizing';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ILaunch, ILaunchPad } from '../../models/spacexLaunchExplorer.interface';
import DetailsHeader from './DetailsHeader';
import MapDetails from './MapDetails';

interface LaunchDetailsContentProps {
  launch: ILaunch;
  launchpad?: ILaunchPad;
  userLocation: { latitude: number; longitude: number } | null;
  openNativeMaps: () => void;
}

const LaunchDetailsContent: React.FC<LaunchDetailsContentProps> = ({ launch, launchpad, userLocation, openNativeMaps }) => {
  return (
    <ScrollView  showsVerticalScrollIndicator={false} contentContainerStyle={[{paddingBottom: bottomInsets}]} style={styles.container}>
      <DetailsHeader launch={launch} />
      <MapDetails
        launchpad={launchpad}
        userLocation={userLocation}
        openNativeMaps={openNativeMaps}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
});

export default LaunchDetailsContent;
