import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const gymTable = pgTable(
  "gyms", 
  {
    gymId: integer().primaryKey().generatedAlwaysAsIdentity(),
    location: varchar({ length: 255 }).notNull()
  }
);