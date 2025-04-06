import { integer, pgTable, varchar, text } from "drizzle-orm/pg-core";

export const challengesTable = pgTable(
  "challenges", 
  {
    challengeId: integer().primaryKey().generatedAlwaysAsIdentity(),
    type: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
  }
);