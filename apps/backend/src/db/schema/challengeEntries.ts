import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { challengesTable } from "./challenges";
import { entriesTable } from "./entries";

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