import { pgTable, varchar, uuid, timestamp, real } from "drizzle-orm/pg-core";
import { relations, sql } from "drizzle-orm";

export const usersTable = pgTable("User", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  updated_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
export const usersRelation = relations(usersTable, ({ many }) => ({
  categories: many(categoriesTable),
  products: many(productsTable),
}));

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
export const categoriesRelation = relations(
  categoriesTable,
  ({ one, many }) => ({
    products: many(productsTable),
    user: one(usersTable, {
      fields: [categoriesTable.created_by],
      references: [usersTable.id],
    }),
  })
);

export const productsTable = pgTable("Product", {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  category_id: uuid()
    .references(() => categoriesTable.id, { onDelete: "cascade" })
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar({ length: 255 }),
  price: real().notNull(),
  created_by: uuid()
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),
  updated_at: timestamp().notNull(),
  created_at: timestamp().defaultNow().notNull(),
});
export const productsRelations = relations(productsTable, ({ one }) => ({
  category: one(categoriesTable, {
    fields: [productsTable.category_id],
    references: [categoriesTable.id],
  }),
  user: one(usersTable, {
    fields: [productsTable.created_by],
    references: [usersTable.id],
  }),
}));
