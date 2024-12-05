"use server";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import bycript from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/app/data/user";
import { initialSidebarItems } from "@/app/data/sidebarItems";

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

  try {
    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    for (const item of initialSidebarItems) {
      await db.page.create({
        data: {
          title: item.title,
          url: item.url,
          icon: item.icon,
          userId: user.id
        }
      });
    }
    return { success: "User created!" };
  } catch (error) {
    if ((error as any).code === "P2002") {
      return { error: "Email already exists!" };
    }

    return { error: `Something went wrong: ${(error as any).message}` };
  }
};
