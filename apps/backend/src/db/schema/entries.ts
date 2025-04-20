import { uuid, pgTable, timestamp, jsonb } from "drizzle-orm/pg-core";
import { usersTable } from "./users.ts";
import { challengesTable } from "./challenges.ts";

/*
* a (challenge) entry belongs to 1 challenge and 1 user 
*/

export const entriesTable = pgTable(
  "entries", 
  {
    id: uuid().primaryKey(),
    userId: uuid().notNull().references(() => usersTable.id),
    challengeId: uuid().notNull().references(() => challengesTable.id),
    submissionTime: timestamp().notNull(),
    data: jsonb().notNull(),
  }
);

export type Entry =  typeof entriesTable.$inferInsert;
export type NewEntry =  typeof entriesTable.$inferSelect;