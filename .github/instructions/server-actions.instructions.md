---
description: Read this before creating or modifying any data mutations (create, update, delete) in the project.
---

# Server Actions

## Rules

- ALL data mutations must use Next.js Server Actions. Never mutate data in API routes or client-side fetch calls.
- Server actions must be called from Client Components only.
- Server action files MUST be named `actions.ts` and colocated in the same directory as the component that calls them.
- Never use the `FormData` TypeScript type. Define explicit TypeScript types for all data passed to server actions.
- Validate ALL incoming data with [Zod](https://zod.dev) before any other logic.
- ALWAYS check for an authenticated user (via `auth()` from Clerk) before performing any database operations. Throw or return an error if no session exists.
- Never use Drizzle queries directly inside server actions. All database operations must go through helper functions in the `/data` directory.
- Never `throw` errors from server actions. Always return a typed result object with either a `success` property or an `error` property (string message).

## Example Structure

```
app/
  dashboard/
    components/
      create-link-form.tsx   ← Client Component that calls the action
      actions.ts             ← Server action colocated here
data/
  links.ts                   ← Drizzle helper functions
```

## Example Server Action

```ts
"use server";

import { z } from "zod";
import { auth } from "@clerk/nextjs/server";
import { createLink } from "@/data/links";

const schema = z.object({
  url: z.string().url(),
});

export async function createLinkAction(input: {
  url: string;
}): Promise<{ success: true } | { error: string }> {
  const { userId } = await auth();
  if (!userId) return { error: "Unauthorized" };

  const result = schema.safeParse(input);
  if (!result.success) return { error: result.error.errors[0].message };

  await createLink({ userId, url: result.data.url });
  return { success: true };
}
```
