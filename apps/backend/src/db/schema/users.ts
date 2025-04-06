import { pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable(
  "users", 
  {
    email: varchar({ length: 255 }).notNull().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    password: varchar({ length: 255 }).notNull(),
  }
);