import { pgTable, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const usersTable = pgTable("User", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  updated_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});

export const categoriesTable = pgTable("Category", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: varchar({ length: 255 }).notNull(),
  created_by: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  updated_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
