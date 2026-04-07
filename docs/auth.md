# Authentication — Clerk

## Non-Negotiable Rule

**All authentication is handled exclusively by Clerk. Do not implement any custom auth, NextAuth, or any other authentication library.** If an auth need arises that seems unsupported by Clerk, find the Clerk-native solution.

## Route Protection Rules

| Route | Behavior |
|---|---|
| `/dashboard` | Protected — requires the user to be signed in. Unauthenticated users are redirected to sign in. |
| `/` (homepage) | Public — but if the user **is** signed in, redirect them to `/dashboard`. |
| `/:slug` (short-link redirect) | Public — no auth required. |

Enforce these rules in `middleware.ts` using `clerkMiddleware`:

```ts
// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/", "/sign-in(.*)", "/sign-up(.*)", "/:slug"]);
const isDashboard = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  const { userId } = await auth();

  // Redirect signed-in users away from the homepage to /dashboard
  if (userId && request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Protect /dashboard — unauthenticated users are redirected to sign-in
  if (isDashboard(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
```

## Sign In / Sign Up — Always Modal

Sign-in and sign-up flows must always open as a **modal overlay**, never as a redirect to a separate page. Use the `mode="modal"` prop on both components.

```tsx
import { SignInButton, SignUpButton } from "@clerk/nextjs";

<SignInButton mode="modal">
  <button>Sign In</button>
</SignInButton>

<SignUpButton mode="modal">
  <button>Sign Up</button>
</SignUpButton>
```

Do not use `<SignIn />` or `<SignUp />` as full-page components. Do not create `/sign-in` or `/sign-up` route pages.

## Getting the Current User

**Server Components, Layouts, Server Actions:**

```ts
import { auth } from "@clerk/nextjs/server";

const { userId } = await auth();
if (!userId) throw new Error("Unauthorized");
```

**Client Components:**

```tsx
"use client";
import { useAuth } from "@clerk/nextjs";

const { userId, isSignedIn } = useAuth();
```

## Conditional Rendering by Auth State

Use Clerk's `<Show>` component for auth-gated UI in Server Components:

```tsx
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

<Show when="signed-out">
  <SignInButton mode="modal"><button>Sign In</button></SignInButton>
  <SignUpButton mode="modal"><button>Sign Up</button></SignUpButton>
</Show>
<Show when="signed-in">
  <UserButton />
</Show>
```

## Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...
```

Never hardcode these values. They must be set in `.env.local`.
