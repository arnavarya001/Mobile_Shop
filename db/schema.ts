import { pgTable, serial, text, integer, doublePrecision } from "drizzle-orm/pg-core";

export const mobiles = pgTable("mobiles", {
  _id: serial("id").primaryKey(),
  brand: text("brand").notNull(),
  model: text("model").notNull(),
  ram: integer("ram").notNull(),
  storage: integer("storage").notNull(),
  price: doublePrecision("price").notNull(),
});
