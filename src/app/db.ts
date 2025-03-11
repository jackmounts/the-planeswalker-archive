import Dexie, { type EntityTable } from "dexie";

interface Card {
  uuid: number;
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
}

interface Collection {
  uuid: number;
  profile_uuid: number;
  name: string;
  type: "deck" | "collection" | "binder" | "whishlist" | "bulk";
  description?: string;
  group?: string;
  cards?: Card[];
}

interface Profile {
  uuid: number;
  name: string;
  email: string;
  password: string;
  preferences: {
    currency: string;
    storageLimit: number;
  };
  is_active?: boolean;
  collections?: Collection[];
}

const db = new Dexie("mtgdb") as Dexie & {
  profiles: EntityTable<Profile, "uuid">;
  collections: EntityTable<Collection, "uuid">;
  cards: EntityTable<Card, "uuid">;
};

db.version(1).stores({
  cards: "+++uuid, code, number",
  collections: "+++uuid, name, type, profile_uuid",
  profiles: "+++uuid, name, email",
});

export default db;
export type { Card, Collection, Profile };
