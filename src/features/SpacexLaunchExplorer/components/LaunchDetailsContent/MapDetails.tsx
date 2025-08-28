import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import { screenHeight } from '@/src/utils/resizing';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AppText from '../../../../components/ui/AppText/AppText';
import AppView from '../../../../components/ui/AppView/AppView';
import { COLORS } from '../../../../constants/colors';
import { ILaunchPad } from '../../models/spacexLaunchExplorer.interface';

interface MapDetailsProps {
    launchpad?: ILaunchPad;
    userLocation: { latitude: number; longitude: number } | null;
    openNativeMaps: () => void;
}

const MapDetails: React.FC<MapDetailsProps> = ({ launchpad, userLocation, openNativeMaps }) => {
    if (!launchpad) {
        return null;
    }

    return (
        <AppView style={styles.launchpadContainer}>
            <AppText type="helveticaBold20px" style={styles.subtitle}>Launchpad Details</AppText>
            <AppText type="helveticaBold16px" style={styles.label}>Name:</AppText>
            <AppText type="helveticaRegular16px">{launchpad.full_name}</AppText>
            <AppText type="helveticaBold16px" style={styles.label}>Location:</AppText>
            <AppText type="helveticaRegular16px">{`${launchpad.locality}, ${launchpad.region}`}</AppText>
            <AppText type="helveticaBold16px" style={styles.label}>Details:</AppText>
            <AppText type="helveticaRegular16px">{launchpad.details}</AppText>
            <AppPressable style={styles.directionsButton} onPress={openNativeMaps}>
                <AppText type="helveticaBold16px" style={styles.directionsButtonText}>Get Directions</AppText>
            </AppPressable>
            <AppView style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: launchpad.latitude,
                        longitude: launchpad.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1,
                      }}
                      showsUserLocation={true}
      
                    //   followsUserLocation={true}
                >
                    <Marker
                        coordinate={{
                            latitude: launchpad.latitude,
                            longitude: launchpad.longitude,
                        }}
                        title={launchpad.name}
                    />
                    {userLocation && (
                        <Marker
                            coordinate={userLocation}
                            title="Your Location"
                            pinColor="blue"
                        />
                    )}
                </MapView>
            </AppView>
           
        </AppView>
    );
};

const styles = StyleSheet.create({
    launchpadContainer: {
        marginTop: 20,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.neutral200,
    },
    subtitle: {
        marginTop: 15,
        marginBottom: 10,
    },
    label: {
        marginTop: 8,
    },
    mapContainer: {
        height: screenHeight* 0.7,
        width: '100%',
        marginVertical: 15,
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    directionsButton: {
        backgroundColor: COLORS.brandAccentViolet,
        padding: 12,
        borderRadius: 8,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'flex-start'
    },
    directionsButtonText: {
        color: COLORS.textLight,
    },
});

export default MapDetails;
