import { action, computed, makeAutoObservable, observable } from 'mobx';
import { ILaunch, ILaunchPad } from '../../../features/SpacexLaunchExplorer/models/spacexLaunchExplorer.interface'; // Corrected import
import { getLaunches, getLaunchpad } from '../../../features/SpacexLaunchExplorer/services/spacexLaunchExplorer.service'; // Corrected import
import { RootStoreType } from '../../RootStore';

export class SpaceXStore {
  rootStore: RootStoreType;

  @observable launches: ILaunch[] = [];
  @observable launchpads: Record<string, ILaunchPad> = {}; // Store launchpads by ID
  @observable loadingLaunches: boolean = false;
  @observable loadingLaunchpad: boolean = false;
  @observable error: string | null = null;
  @observable searchQuery: string = '';
  @observable refreshing: boolean = false;
  @observable offset: number = 0;
  @observable limit: number = 10;
  @observable hasMoreLaunches: boolean = true;
  @observable loadingMoreLaunches: boolean = false;

  constructor(rootStore: RootStoreType) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  @action
  setSearchQuery(query: string) {
    this.searchQuery = query;
    this.offset = 0; // Reset offset on search query change
    this.hasMoreLaunches = true; // Assume more launches on search
    // Removed this.fetchLaunches(false) to ensure local search doesn't trigger API call
  }

  @computed
  get filteredLaunches(): ILaunch[] {
    // Filter on the already loaded launches. For full pagination with search, backend filtering would be ideal.
    if (!this.searchQuery) {
      return this.launches;
    }
    return this.launches.filter(launch =>
      launch.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  @action
  async fetchLaunches(refresh: boolean = false, isLoadMore: boolean = false) {
    if (this.loadingLaunches || this.loadingMoreLaunches) {
      return; // Prevent multiple simultaneous fetches
    }

    if (isLoadMore && !this.hasMoreLaunches) {
      return; // No more data to load
    }


    if (refresh) {
      this.refreshing = true;
      this.offset = 0;
      this.launches = []; // Clear existing launches on refresh
      this.hasMoreLaunches = true;
    } else if (isLoadMore) {
      this.loadingMoreLaunches = true;
    } else {
      this.loadingLaunches = true;
      this.offset = 0; // Reset offset for initial fetch
      this.launches = []; // Clear existing launches for initial fetch
      this.hasMoreLaunches = true;
    }

    this.error = null;
    try {
      const response = await getLaunches(this.limit, this.offset);
      if (response.success && Array.isArray(response.data)) {
        this.launches = isLoadMore ? [...this.launches, ...response.data] : response.data;
        // Since response.data is an array, we can't get hasNextPage/nextPage from it
        // So we assume no more launches if less than limit is returned
        this.hasMoreLaunches = response.data.length === this.limit;
        if (this.hasMoreLaunches) {
            this.offset += response.data.length;
        }
      } else {
        this.error = response.message || 'Failed to fetch launches.';
      }
    } catch (err) {
      this.error = 'An error occurred while fetching launches.';
      console.error(err);
    } finally {
      this.loadingLaunches = false;
      this.refreshing = false;
      this.loadingMoreLaunches = false;
    }
  }

  @action
  loadMoreLaunches() {
    this.fetchLaunches(false, true);
  }

  @action
  async fetchLaunchpad(id: string) {
    this.loadingLaunchpad = true;
    this.error = null;
    try {
      const response = await getLaunchpad(id);
      if (response.success && response.data) {
        this.launchpads[id] = response.data; // Store launchpad by ID
      } else {
        this.error = response.message || 'Failed to fetch launchpad details.';
      }
    } catch (err) {
      this.error = 'An error occurred while fetching launchpad details.';
      console.error(err);
    } finally {
      this.loadingLaunchpad = false;
    }
  }

  // Method to get a specific launchpad from the store
  getLaunchpadById(id: string): ILaunchPad | undefined {
    return this.launchpads[id];
  }
}
