import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bycript from "bcryptjs";

import { LoginSchema } from "./schemas";
import { getUserByEmail } from "./app/data/user";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) {
            return null;
          }

          const passwordMatch = await bycript.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        return null;
      }
    })
  ],

  trustHost: true, // Ajoute cette option pour approuver tous les hôtes (pour usage local uniquement)
} satisfies NextAuthConfig;
