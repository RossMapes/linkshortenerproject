<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.

<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

This project is a URL link shortener built with Next.js 16 (App Router), React 19, TypeScript, Clerk auth, Drizzle ORM, and Neon PostgreSQL.

## Non-Negotiable Rules

- All files are TypeScript (`.ts` / `.tsx`). No `.js` or `.jsx` files.
- Strict TypeScript — no `any`, no `ts-ignore`.
- Use the `@/` path alias for all internal imports.
- Server Components are the default. Only add `'use client'` when strictly necessary.
- Never hardcode secrets or credentials. Use environment variables.
- Run `npm run lint` after any change to verify no ESLint violations.
- **NEVER use `middleware.ts`** — it is deprecated in this version of Next.js. Use `proxy.ts` instead for all middleware/proxy logic.
