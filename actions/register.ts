"use server";

import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/tokens";
import { db } from "@/lib/db";
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
    return { error: "L'email est déjà utilisé" };
  }

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword
    }
  });

  const verificationToken = await generateVerificationToken(email);

  sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Email de confirmation envoyé !" };
};
