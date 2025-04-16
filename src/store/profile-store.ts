import { create } from "zustand";
import { persist } from "zustand/middleware";
import db, { Gender, Profile, SkillLevel } from "@/app/db";
import { v4 as uuidv4 } from "uuid";
import {
  getRandomBytes,
  deriveKey,
  encryptPassword,
  decryptPassword,
} from "@/lib/crypto";

type ProfileState = {
  logged_profile_uuid: string | null;
  profile: Profile | null;
  session: string | null;
  login_error?: boolean | null;
  register_error?: string | null;
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
      skillLevel?: SkillLevel;
      gender?: Gender;
    }
  ) => Promise<void>;
};

const useProfileStore = create(
  persist<ProfileState & ProfileAction>(
    (set) => ({
      logged_profile_uuid: null,
      profile: null,
      session: null,
      login_error: null,
      register_error: null,

      logIn: async (email, password) => {
        const sessionId = uuidv4();
        const profile = await db.profiles.where({ email }).first();

        if (!profile) {
          set({ login_error: true });
          return;
        }

        try {
          const salt = Uint8Array.from(atob(profile.salt), (c) =>
            c.charCodeAt(0)
          );
          const iv = Uint8Array.from(atob(profile.iv), (c) => c.charCodeAt(0));
          const encrypted = Uint8Array.from(atob(profile.password), (c) =>
            c.charCodeAt(0)
          );
          const key = await deriveKey(password, salt);
          const decryptedPassword = await decryptPassword(encrypted, key, iv);

          if (decryptedPassword === password) {
            set({
              logged_profile_uuid: profile.uuid,
              session: sessionId,
              profile,
              login_error: false,
            });
          } else {
            set({ login_error: true });
          }
        } catch (err) {
          console.error("Errore nella decriptazione:", err);
          set({ login_error: true });
        }
      },

      logOut: async () => {
        set({ logged_profile_uuid: null, profile: null, session: null });
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
        const existingProfile = await db.profiles
          .where({ email: profile.email })
          .first();
        if (existingProfile) {
          set({
            register_error: "Another wizard already took your email address!",
          });
        }

        const uuid = uuidv4();
        const salt = getRandomBytes(16);
        const iv = getRandomBytes(12);
        const key = await deriveKey(profile.password!, salt);
        const encryptedPassword = await encryptPassword(
          profile.password!,
          key,
          iv
        );

        const newProfile: Profile = {
          ...profile,
          uuid,
          password: Buffer.from(encryptedPassword).toString("base64"),
          salt: Buffer.from(salt).toString("base64"),
          iv: Buffer.from(iv).toString("base64"),
        };

        await db.profiles.add(newProfile);
        set({ profile: newProfile, logged_profile_uuid: uuid });
      },
    }),
    {
      name: "profile-store",
    }
  )
);

export default useProfileStore;
