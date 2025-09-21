import { relations } from "drizzle-orm";
import {
  pgEnum as createPgEnum,
  integer,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

import { user } from "./auth";

// Enums
export const transactionTypeEnum = createPgEnum("transaction_type", [
  "income",
  "expense",
]);
export const assetTypeEnum = createPgEnum("asset_type", [
  "property",
  "vehicle",
  "investment",
  "other",
]);
export const investmentTypeEnum = createPgEnum("investment_type", [
  "stock",
  "mutual_fund",
  "crypto",
  "bond",
  "other",
]);

// Transactions table
export const transaction = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  type: transactionTypeEnum("type").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Assets table
export const asset = pgTable("assets", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  type: assetTypeEnum("type").notNull(),
  currentValue: numeric("current_value", { precision: 12, scale: 2 }).notNull(),
  acquisitionDate: timestamp("acquisition_date").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Investments table
export const investment = pgTable("investments", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  type: investmentTypeEnum("type").notNull(),
  amount: numeric("amount", { precision: 12, scale: 2 }).notNull(),
  purchaseDate: timestamp("purchase_date").notNull(),
  currentValue: numeric("current_value", { precision: 12, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Budgets table
export const budget = pgTable("budgets", {
  id: serial("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  category: text("category").notNull(),
  limitAmount: numeric("limit_amount", { precision: 12, scale: 2 }).notNull(),
  period: text("period").notNull(), // e.g., "monthly", "weekly"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relations
export const transactionsRelations = relations(transaction, ({ one }) => ({
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
}));

export const assetsRelations = relations(asset, ({ one }) => ({
  user: one(user, {
    fields: [asset.userId],
    references: [user.id],
  }),
}));

export const investmentsRelations = relations(investment, ({ one }) => ({
  user: one(user, {
    fields: [investment.userId],
    references: [user.id],
  }),
}));

export const budgetsRelations = relations(budget, ({ one }) => ({
  user: one(user, {
    fields: [budget.userId],
    references: [user.id],
  }),
}));
