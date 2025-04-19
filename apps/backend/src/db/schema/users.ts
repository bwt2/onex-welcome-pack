import { pgTable, varchar, integer, unique } from "drizzle-orm/pg-core";
import { gymTable } from "./gyms.ts";

/*
* Two users cannot have the same email
* Each user belongs to a home gym
*/

export const usersTable = pgTable(
  "users", 
  {
    userId: integer().primaryKey().generatedAlwaysAsIdentity(),
    homeGymId: integer().notNull().references(() => gymTable.gymId),
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
  userId: number,
  name: string,
  email: string,
  homeGymId: number,
}