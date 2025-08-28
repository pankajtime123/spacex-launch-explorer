import { RootStoreType } from '@/src/mobxStore/RootStore';
import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect } from 'react';
import { RootStackScreenProps } from '../../../navigation/RootStack/types';

export const useSpacexLaunchListScreen = ({rootStore}:{rootStore: RootStoreType})  => {
  const { spaceXStore } = rootStore
  const navigation = useNavigation<RootStackScreenProps<'Home'>['navigation']>();

  useEffect(() => {
    spaceXStore.fetchLaunches();
  }, []);

  const onRefresh = useCallback(() => {
    spaceXStore.fetchLaunches(true);
  }, []);

  const handleLaunchItemPress = useCallback((launchId: string) => {
    navigation.navigate('LaunchDetails', { launchId });
  }, []);

  return {
    spaceXStore,
    onRefresh,
    handleLaunchItemPress,
    loadMoreLaunches: () => {
        spaceXStore.loadMoreLaunches();
    },
    hasMoreLaunches: spaceXStore.hasMoreLaunches,
    loadingMoreLaunches: spaceXStore.loadingMoreLaunches,
    };
};
