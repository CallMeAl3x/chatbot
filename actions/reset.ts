"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/auth/mail";
import { generatePasswordResetToken } from "@/lib/auth/tokens";
import { ResetSchema } from "@/schemas";
import * as z from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Veuillez vérifier les champs"
    };
  }

  const { email } = validateFields.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      error: "Email non trouvé"
    };
  }

  // TODO : Generate token and send email
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
  return {
    success: "Email de réinitialisation de mot de passe envoyé à " + email
  };
};
