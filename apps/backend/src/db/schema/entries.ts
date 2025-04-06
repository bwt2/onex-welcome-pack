import { integer, pgTable, varchar, timestamp, jsonb } from "drizzle-orm/pg-core";
import { usersTable } from "./users.ts";

export const entriesTable = pgTable(
  "entries", 
  {
    entryId: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({ length: 255 }).references(() => usersTable.email).notNull(),
    submissionTime: timestamp().notNull(),
    data: jsonb().notNull(),
  }
);