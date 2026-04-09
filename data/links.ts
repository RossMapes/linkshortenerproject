import { auth } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { db } from "@/index";
import { links } from "@/db/schema";

export async function insertLink({
  userId,
  url,
  shortCode,
}: {
  userId: string;
  url: string;
  shortCode: string;
}) {
  return db.insert(links).values({ userId, url, shortCode });
}

export async function getUserLinks() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  return db
    .select()
    .from(links)
    .where(eq(links.userId, userId))
    .orderBy(desc(links.createdAt));
}

export async function updateLink({
  id,
  userId,
  url,
  shortCode,
}: {
  id: number;
  userId: string;
  url: string;
  shortCode: string;
}) {
  return db
    .update(links)
    .set({ url, shortCode })
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function deleteLink({
  id,
  userId,
}: {
  id: number;
  userId: string;
}) {
  return db
    .delete(links)
    .where(and(eq(links.id, id), eq(links.userId, userId)));
}

export async function getLinkByShortCode(shortCode: string) {
  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortCode, shortCode))
    .limit(1);
  return result[0] ?? null;
}
