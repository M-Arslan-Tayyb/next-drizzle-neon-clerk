"use server";
import { db } from "@/db/drizzle";
import users from "@/db/schema";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  const data = await db.select().from(users);
  return data;
};

export const addUser = async (user:any) => {
  await db.insert(users).values({
      name: user.name,
      email: user.email,
      clerkId: user.clerkId,
      firstName: user.firstName,
      lastName: user.lastName,
      photo: user.photo,
  }).returning({clerkClientId: users?.clerkId});
  revalidatePath("/");
};