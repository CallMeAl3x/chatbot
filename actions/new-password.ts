"use server";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
  if (!token) {
    return {
      error: "Token invalide"
    };
  }

  const validateFields = NewPasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Mot de passe invalide"
    };
  }

  const { password } = validateFields.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return {
      error: "Token invalide"
    };
  }

  const hasExpired = new Date() > existingToken.expires;

  if (hasExpired) {
    return {
      error: "Ce token a expiré !"
    };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return {
      error: "L'email n'est pas associé à un compte !"
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: existingUser.id
    },
    data: {
      password: hashedPassword
    }
  });

  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id
    }
  });

  return {
    success: "Mot de passe réinitialisé avec succès"
  };
};
