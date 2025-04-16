import Dexie, { type EntityTable } from "dexie";

export type Gender =
  | "male"
  | "female"
  | "non-binary"
  | "unspecified"
  | undefined;
export type SkillLevel =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "pro"
  | "unspecified"
  | undefined;

interface Card {
  uuid: string;
  profile_uuid: string;
  code: string;
  number: number;
  id?: string;
  name?: string;
  set_name?: string;
  mana_cost?: string;
  cmc?: number;
  type_line?: string;
  foil?: boolean;
  quantity?: number;
  price?: number;
  collection_uuid?: number[];
}

interface Collection {
  uuid: string;
  profile_uuid: string;
  name: string;
  type: "deck" | "collection" | "binder" | "whishlist" | "bulk";
  description?: string;
  group?: string;
  cards?: Card[];
  last_updated?: Date;
  favourite?: boolean;
}

interface Profile {
  uuid: string;
  name: string;
  email: string;
  password: string;
  preferences?: {
    currency: string;
    storageLimit: number;
  };
  is_active?: boolean;
  collections?: Collection[];
  skillLevel?: SkillLevel;
  gender?: Gender;
  salt: string;
  iv: string;
}

const db = new Dexie("mtgdb") as Dexie & {
  profiles: EntityTable<Profile, "uuid">;
  collections: EntityTable<Collection, "uuid">;
  cards: EntityTable<Card, "uuid">;
};

db.version(1).stores({
  cards: "uuid, code, number",
  collections: "uuid, name, type, profile_uuid",
  profiles: "uuid, name, email, password",
});

export default db;
export type { Card, Collection, Profile };
