import { integer, pgTable, timestamp, jsonb } from "drizzle-orm/pg-core";
import { usersTable } from "./users.ts";
import { challengesTable } from "./challenges.ts";

/*
* a (challenge) entry belongs to 1 challenge and 1 user 
*/

export const entriesTable = pgTable(
  "entries", 
  {
    entryId: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer().notNull().references(() => usersTable.userId),
    challengeId: integer().notNull().references(() => challengesTable.challengeId),
    submissionTime: timestamp().notNull(),
    data: jsonb().notNull(),
  }
);

export type Entry =  typeof entriesTable.$inferInsert;
export type NewEntry =  typeof entriesTable.$inferSelect;