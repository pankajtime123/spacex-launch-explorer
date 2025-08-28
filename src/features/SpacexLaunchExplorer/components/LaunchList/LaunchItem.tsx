import AppPressable from '@/src/components/ui/AppPressable/AppPressable';
import { COLORS } from '@/src/constants/colors';
import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import AppImage from '../../../../components/ui/AppImage/AppImage';
import AppRow from '../../../../components/ui/AppRow/AppRow';
import AppText from '../../../../components/ui/AppText/AppText';
import AppView from '../../../../components/ui/AppView/AppView';
import { ILaunch } from '../../models/spacexLaunchExplorer.interface';

interface LaunchItemProps {
  item: ILaunch;
  onPress: (launchId: string) => void;
}

const LaunchItem: React.FC<LaunchItemProps> = memo(({ item, onPress }) => (
  <AppPressable
    style={styles.launchItem}
    onPress={() => onPress(item.id)}
  >
    <AppRow gap={24} style={styles.launchRow}>
      {item.links.patch.small ? (
        <AppImage source={{ uri: item.links.patch.small }} style={styles.patchImage} />
      ) : (
        <AppView style={styles.placeholderImage}><AppText type={'helveticaRegular10px'} color={COLORS.textSecondary}>No Image</AppText></AppView>
      )}
      <AppView style={styles.launchInfo}>
        <AppText maxWidth={'80%'} type={'helveticaMedium16px'} >{item.name}</AppText>
        <AppText mt={4} type={'helveticaRegular10px'} color={COLORS.textSecondary} >
          {new Date(item.date_local).toLocaleDateString()}
        </AppText>
        <AppText mt={12} maxWidth={'80%'} type={'helveticaMedium14px'} color={COLORS.textSecondary} >
          Status: <AppText color={item?.success ? COLORS.success : COLORS.error} type={'helveticaMedium14px'} >
            {item.success ? 'success' : 'failed'}
          </AppText>
        </AppText>
      </AppView>
    </AppRow>
  </AppPressable>
));

const styles = StyleSheet.create({
  launchItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: COLORS.neutral200,
    width: '100%',
    borderRadius: 10,
    backgroundColor: COLORS.neutral100
  },
  launchRow: {
    alignItems: 'center',
  },
  patchImage: {
    width: 50,
    height: 50,
  },
  placeholderImage: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.backgroundMuted,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  launchInfo: {
    width: '100%'
  },
});

export default LaunchItem;
