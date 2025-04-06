import { integer, pgTable, varchar, timestamp, jsonb, text, primaryKey } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users", 
  {
    email: varchar({ length: 255 }).notNull().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
  }
);

export const entriesTable = pgTable(
  "entries", 
  {
    entryId: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).references(() => usersTable.email).notNull(),
    submissionTime: timestamp().notNull(),
    data: jsonb().notNull(),
  }
);

export const challengesTable = pgTable(
  "challenges", 
  {
    challengeId: integer().primaryKey().generatedAlwaysAsIdentity(),
    type: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
  }
);

export const gymTable = pgTable(
  "gym", 
  {
    gymId: integer().primaryKey().generatedAlwaysAsIdentity(),
    location: varchar({ length: 255 }).notNull()
  }
);

export const gymChallenges = pgTable(
  "gymChallenges",
  {
    gymId: integer().notNull().references(() => gymTable.gymId),
    challengeId: integer().notNull().references(() => challengesTable.challengeId),
  },
  (table) => [
    primaryKey({ columns: [table.gymId, table.challengeId] }),
  ]
);

export const challengeEntries = pgTable(
  "challengeEntries", 
  {
    challengeId: integer().notNull().references(() => challengesTable.challengeId),
    entryId: integer().notNull().references(() => entriesTable.entryId)
  },
  (table) => [
    primaryKey({ columns: [table.challengeId, table.entryId] }),
  ]
);