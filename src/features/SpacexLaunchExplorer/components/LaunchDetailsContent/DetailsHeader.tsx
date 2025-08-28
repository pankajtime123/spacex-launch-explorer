import React from 'react';
import { StyleSheet } from 'react-native';
import AppImage from '../../../../components/ui/AppImage/AppImage';
import AppText from '../../../../components/ui/AppText/AppText';
import AppView from '../../../../components/ui/AppView/AppView';
import { COLORS } from '../../../../constants/colors';
import { ILaunch } from '../../models/spacexLaunchExplorer.interface';

interface DetailsHeaderProps {
  launch: ILaunch;
}

const DetailsHeader: React.FC<DetailsHeaderProps> = ({ launch }) => (
  <>
    <AppText type="helveticaExtraBold32px" style={styles.title}>{launch.name}</AppText>
    {launch.links.patch.large ? (
      <AppImage source={{ uri: launch.links.patch.large }} style={styles.missionPatch} />
    ) : (
      <AppView style={styles.placeholderImage}><AppText type="helveticaRegular16px" color={COLORS.textSecondary}>No Image</AppText></AppView>
    )}
    <AppText type="helveticaBold16px" style={styles.label}>Date:</AppText>
    <AppText type="helveticaRegular16px">{new Date(launch.date_local).toLocaleString()}</AppText>
    <AppText type="helveticaBold16px" style={styles.label}>Status:</AppText>
    <AppText type="helveticaRegular16px" style={launch.success ? styles.successText : styles.failedText}>
      {launch.success ? 'Success' : 'Failed'}
    </AppText>
  </>
);

const styles = StyleSheet.create({
  title: {
    marginBottom: 10,
  },
  label: {
    marginTop: 8,
  },
  missionPatch: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
  },
  placeholderImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 10,
    backgroundColor: COLORS.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    color: COLORS.success,
  },
  failedText: {
    color: COLORS.error,
  },
});

export default DetailsHeader;
