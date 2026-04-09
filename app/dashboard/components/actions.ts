"use server";

import { randomBytes } from "crypto";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { deleteLink, insertLink, updateLink } from "@/data/links";

const schema = z.object({
  url: z.string().url("Please enter a valid URL"),
});

export async function createLinkAction(input: {
  url: string;
}): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const result = schema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };

  const shortCode = randomBytes(4).toString("hex");

  await insertLink({ userId, url: result.data.url, shortCode });

  revalidatePath("/dashboard");
  return { success: true };
}

const updateSchema = z.object({
  id: z.number().int().positive(),
  url: z.string().url("Please enter a valid URL"),
  shortCode: z
    .string()
    .min(1, "Short code is required")
    .max(20, "Short code must be 20 characters or less"),
});

export async function updateLinkAction(input: {
  id: number;
  url: string;
  shortCode: string;
}): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const result = updateSchema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };

  await updateLink({
    id: result.data.id,
    userId,
    url: result.data.url,
    shortCode: result.data.shortCode,
  });

  revalidatePath("/dashboard");
  return { success: true };
}

const deleteSchema = z.object({
  id: z.number().int().positive(),
});

export async function deleteLinkAction(input: {
  id: number;
}): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const result = deleteSchema.safeParse(input);
  if (!result.success) return { error: result.error.issues[0].message };

  await deleteLink({ id: result.data.id, userId });

  revalidatePath("/dashboard");
  return { success: true };
}
