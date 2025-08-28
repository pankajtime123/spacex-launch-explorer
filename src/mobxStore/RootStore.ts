
import { SpaceXStore } from "./domain/SpaceX/SpaceXStore"; // Import SpaceXStore

export type PropsWithStore<T> = T & {
  rootStore?: RootStore;
};

export type RootStoreType = RootStore

class RootStore {
  spaceXStore: SpaceXStore; // Add SpaceXStore instance
  stores: any[];

  constructor() {
    this.spaceXStore = new SpaceXStore(this); // Initialize SpaceXStore

    this.stores = [
      this.spaceXStore, // Add SpaceXStore to the stores array
    ];
  }

}

export default new RootStore();
