
import { create } from "domain";
import { relations } from "drizzle-orm";
import { integer, text, boolean, pgTable, serial, timestamp, bigint } from "drizzle-orm/pg-core";

const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  clerkId: text("clerk_id").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  photo: text("photo").notNull(),
  createdAt : timestamp("created_at").notNull().defaultNow(),
  updatedAt : timestamp("updated_at").notNull().defaultNow(),
});

export default users;

export const todo = pgTable("todo", {
  id: bigint("id", { mode: "number" }).primaryKey(),
  text: text("text").notNull(),
  done: boolean("done").default(false).notNull(),
  userId: bigint("user_id", { mode: "number" }).notNull().references(() => users.id),
});

export const todosRelation = relations(todo, ({ one }) => ({
  user: one(users, {
    fields: [todo.userId],
    references: [users.id],
  }),
}));
export const usersRelation = relations(users, ({ many }) => ({
  todos: many(todo),
}));