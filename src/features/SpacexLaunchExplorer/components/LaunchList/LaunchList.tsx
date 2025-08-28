import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, TextInput } from 'react-native';
import AppText from '../../../../components/ui/AppText/AppText';
import AppView from '../../../../components/ui/AppView/AppView';
import { COLORS } from '../../../../constants/colors';
import { ILaunch } from '../../models/spacexLaunchExplorer.interface';
import LaunchItem from './LaunchItem';

interface LaunchListProps {
  launches: ILaunch[];
  loading: boolean;
  refreshing: boolean;
  onRefresh: () => void;
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onLaunchItemPress: (launchId: string) => void;
  error: string | null;
  loadMoreLaunches: () => void; // New prop for pagination
  hasMoreLaunches: boolean; // New prop for pagination
  loadingMoreLaunches: boolean; // New prop for pagination
}

const LaunchList: React.FC<LaunchListProps> = observer(
  ({
    launches,
    loading,
    refreshing,
    onRefresh,
    searchQuery,
    onSearchQueryChange,
    onLaunchItemPress,
    error,
    loadMoreLaunches,
    hasMoreLaunches,
    loadingMoreLaunches,
  }) => {
    const renderLaunchItem = useCallback(
      ({ item }: { item: ILaunch }) => (
        <LaunchItem item={item} onPress={onLaunchItemPress} />
      ),
      [onLaunchItemPress],
    );

    const renderFooter = useCallback(() => {
      if (!loadingMoreLaunches || !hasMoreLaunches) return null;
      return (
        <AppView style={styles.footerLoader}>
          <ActivityIndicator size="small" color={COLORS.brandAccentViolet} />
        </AppView>
      );
    }, [loadingMoreLaunches, hasMoreLaunches]);

    if (loading && !refreshing) {
      return (
        <AppView style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.brandAccentViolet} />
        </AppView>
      );
    }

    return (
      <AppView style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by mission name..."
          placeholderTextColor={COLORS.textMuted}
          value={searchQuery}
          onChangeText={onSearchQueryChange}
        />
        <FlatList
          data={launches}
          showsVerticalScrollIndicator={false}
          style={styles.flatList}
          contentContainerStyle={styles.flatListContent}
          keyExtractor={(item, index) => item.id || item.flight_number?.toString() || `${item.name}-${index}`}
          renderItem={renderLaunchItem}
          onEndReached={loadMoreLaunches}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={COLORS.brandAccentViolet} />
          }
          ListEmptyComponent={
            <AppView style={styles.centered}>
              <AppText type="helveticaRegular16px" color={COLORS.textSecondary}>No launches found.</AppText>
            </AppView>
          }
        />
        
      </AppView>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: COLORS.backgroundDefault,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: COLORS.brandAccentViolet,
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 16,
    width:'100%',
    backgroundColor: COLORS.neutral100,
    color: COLORS.textPrimary,
  },
  flatList: {
    width: '100%'
  },
  flatListContent: {
    gap: 10
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  errorContainer: {   
    backgroundColor: COLORS.error,

  },
  errorText: {
    color: COLORS.textLight,
  },
});

export default LaunchList;
