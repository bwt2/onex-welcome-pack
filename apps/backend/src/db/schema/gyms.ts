import { integer, pgTable, unique, varchar } from "drizzle-orm/pg-core";

/*
* Two gyms need to be is distinct physical locations
* some countries dont have state, but all have a city and street address
* all location data stored in lowercase
*/

export const gymTable = pgTable(
  "gyms", 
  {
    gymId: integer().primaryKey().generatedAlwaysAsIdentity(),
    country: varchar({ length: 255 }).notNull(),
    state: varchar({ length: 255 }).notNull().default(""), // stupid drizzle bug forces this to be notnull: https://github.com/drizzle-team/drizzle-orm/issues/2636
    city: varchar({ length: 255 }).notNull(),
    streetAddress: varchar({ length: 255 }).notNull()
  },
  (table) => [
    unique().on(
      table.country, 
      table.state, 
      table.city,
      table.streetAddress
    ) 
  ]
);

export type Gym =  typeof gymTable.$inferInsert;
export type NewGym =  typeof gymTable.$inferSelect;