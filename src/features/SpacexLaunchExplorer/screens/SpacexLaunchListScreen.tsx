import PageHeader from '@/src/components/Headers/PageHeader/PageHeader';
import AppText from '@/src/components/ui/AppText/AppText';
import { COLORS } from '@/src/constants/colors';
import React, { FC } from 'react';
import withRootStore from '../../../HOCs/withRootStore';
import { PropsWithStore } from '../../../mobxStore/RootStore';
import LaunchList from '../components/LaunchList/LaunchList'; // Corrected import
import { useSpacexLaunchListScreen } from '../hooks/useSpacexLaunchListScreen';

const SpacexLaunchListScreen: FC<PropsWithStore<{}>> = ({ rootStore }) => {
  const { spaceXStore } = rootStore!;
  const { onRefresh, handleLaunchItemPress, loadMoreLaunches } = useSpacexLaunchListScreen({ rootStore: rootStore! });

  return (
    <>
      <PageHeader.Spaced leftItem={<AppText color={COLORS.textPrimary} type={'helveticaBlack24px'} > SpaceX Launch Explorer </AppText>} />
      <LaunchList
        launches={spaceXStore.filteredLaunches}
        loading={spaceXStore.loadingLaunches}
        refreshing={spaceXStore.refreshing}
        onRefresh={onRefresh}
        searchQuery={spaceXStore.searchQuery}
        onSearchQueryChange={(t)=>spaceXStore.setSearchQuery(t)}
        onLaunchItemPress={handleLaunchItemPress}
        error={spaceXStore.error}
        loadMoreLaunches={loadMoreLaunches}
        hasMoreLaunches={spaceXStore.hasMoreLaunches}
        loadingMoreLaunches={spaceXStore.loadingMoreLaunches}
      />
    </>
  );
};

export default withRootStore(SpacexLaunchListScreen);
