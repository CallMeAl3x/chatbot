"use server";
import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth/auth";
import { sendVerificationEmail } from "@/lib/auth/mail";
import { generateVerificationToken } from "@/lib/auth/tokens";
import { db } from "@/lib/db";
import { SettingsSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Vous devez être connecté" };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return { error: "Utilisateur non trouvé" };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.newPassword = undefined;
    values.password = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser && existingUser.id !== user.id) {
      return { error: "L'email est déjà utilisé" };
    }

    const verificationToken = await generateVerificationToken(values.email);

    await sendVerificationEmail(values.email, verificationToken.token);

    return {
      success: "Mail de confirmation envoyé à " + values.email
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordMatch = await bcrypt.compare(values.password, dbUser.password);

    if (!passwordMatch) {
      return { error: "Mot de passe invalide" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;

    await db.user.update({
      where: {
        id: dbUser.id
      },
      data: {
        ...values
      }
    });
  }

  await db.user.update({
    where: {
      id: dbUser.id
    },
    data: {
      ...values
    }
  });

  return { success: "Paramètres mis à jour !" };
};
