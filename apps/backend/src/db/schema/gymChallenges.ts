import { integer, pgTable, varchar, timestamp, jsonb, text, primaryKey } from "drizzle-orm/pg-core";
import { gymTable } from "./gyms";
import { challengesTable } from "./challenges";

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
