import { create } from "zustand";
import db, { Profile } from "@/app/db";

type ProfileState = {
  logged_profile_uuid: number | null;
  profile: Profile | null;
  login_error: boolean | null;
};

type ProfileAction = {
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loadProfile: (uuid: number) => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
};

const useProfileStore = create<ProfileState & ProfileAction>((set) => ({
  logged_profile_uuid: null,
  profile: null,
  login_error: null,

  logIn: async (email, password) => {
    const profile = await db.profiles.where({ email, password }).first();
    if (profile) {
      set({ logged_profile_uuid: profile.uuid, profile, login_error: false });
    } else {
      set({ login_error: true });
    }
  },

  logOut: async () => {
    set({ logged_profile_uuid: null, profile: null });
  },

  loadProfile: async (uuid) => {
    const profile = await db.profiles.get(uuid);
    set({ profile });
  },

  updateProfile: async (profile) => {
    await db.profiles.update(1, profile);
    set({ profile });
  },
}));

export default useProfileStore;
