import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { gymTable } from "./gyms.ts";
import { challengesTable } from "./challenges.ts";

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
