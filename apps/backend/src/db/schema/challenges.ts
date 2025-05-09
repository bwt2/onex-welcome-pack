import { uuid, pgTable, varchar, unique } from "drizzle-orm/pg-core";
import { gymTable } from "./gyms.ts";

/*
* A gym cannot have two challenges with the same title
*/

export const challengesTable = pgTable(
  "challenges", 
  {
    id: uuid().primaryKey(),
    gymId: uuid().notNull().references(() => gymTable.id),
    title: varchar({ length: 255 }).notNull(),
    type: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    unique().on(table.gymId, table.title) 
  ]
);

export type Challenge =  typeof challengesTable.$inferInsert;
export type NewChallenge =  typeof challengesTable.$inferSelect;
