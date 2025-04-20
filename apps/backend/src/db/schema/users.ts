import { pgTable, varchar, unique, uuid } from "drizzle-orm/pg-core";
import { gymTable } from "./gyms.ts";

/*
* Two users cannot have the same email
* Each user belongs to a home gym
*/

export const usersTable = pgTable(
  "users", 
  {
    id: uuid().primaryKey(),
    homeGymId: uuid().notNull().references(() => gymTable.id),
    email: varchar({ length: 255 }).notNull(),
    name: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
  },
  (table) => [
    unique().on(table.email) 
  ]
);

export type User =  typeof usersTable.$inferInsert;
export type NewUser =  typeof usersTable.$inferSelect;
export interface ClientUser {
  id: string,
  name: string,
  email: string,
  homeGymId: string,
}