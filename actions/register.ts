"use server";

import { getUserByEmail } from "@/app/data/user";
import { db } from "@/lib/db/db";
import { RegisterSchema } from "@/schemas";
import bycript from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bycript.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email is already in use" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  return {
    success: "User created !"
  };
};
