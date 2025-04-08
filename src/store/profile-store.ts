import { create } from "zustand";
import db, { Profile } from "@/app/db";
import { v4 as uuidv4 } from "uuid";

type ProfileState = {
  logged_profile_uuid: string | null;
  profile: Profile | null;
  session: string | null;
  login_error: boolean | null;
};

type ProfileAction = {
  logIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  loadProfile: (uuid: string) => Promise<void>;
  updateProfile: (profile: Profile) => Promise<void>;
  register: (
    profile: Partial<Profile> & {
      password: string;
      email: string;
      name: string;
    }
  ) => Promise<void>;
};

const useProfileStore = create<ProfileState & ProfileAction>((set) => ({
  logged_profile_uuid: null,
  profile: null,
  session: null,
  login_error: null,

  logIn: async (email, password) => {
    const sessionId = uuidv4();
    const profile = await db.profiles.where({ email, password }).first();
    if (profile) {
      set({
        logged_profile_uuid: profile.uuid,
        session: sessionId,
        profile,
        login_error: false,
      });
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
    await db.profiles.update(profile.uuid, profile);
    set({ profile });
  },

  register: async (profile) => {
    const newProfile = { ...profile, uuid: uuidv4() };
    await db.profiles.add(newProfile);
    set({ profile: newProfile, logged_profile_uuid: newProfile.uuid });
  },
}));

export default useProfileStore;
