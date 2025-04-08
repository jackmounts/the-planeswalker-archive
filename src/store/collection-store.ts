import { create } from "zustand";
import db, { Collection } from "@/app/db";
import useProfileStore from "./profile-store";

type CollectionState = {
  collections: Collection[];
};

type CollectionAction = {
  loadCollections: () => Promise<void>;
  createCollection: (collection: Collection) => Promise<void>;
  updateCollection: (collection: Collection) => Promise<void>;
  deleteCollection: (uuid: string) => Promise<void>;
};

const useCollectionStore = create<CollectionState & CollectionAction>(
  (set) => ({
    collections: [],

    loadCollections: async () => {
      const { logged_profile_uuid } = useProfileStore.getState();
      const collections = await db.collections
        .where("profile_uuid")
        .equals(logged_profile_uuid!)
        .toArray();
      set({ collections });
    },

    createCollection: async (collection) => {
      await db.collections.add(collection);
      await useCollectionStore.getState().loadCollections();
    },

    updateCollection: async (collection) => {
      await db.collections.update(collection.uuid, collection);
      await useCollectionStore.getState().loadCollections();
    },

    deleteCollection: async (uuid) => {
      await db.collections.delete(uuid);
      await useCollectionStore.getState().loadCollections();
    },
  })
);
