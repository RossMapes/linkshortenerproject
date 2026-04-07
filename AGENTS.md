<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Link Shortener — Agent Instructions

This project is a URL link shortener built with Next.js 16 (App Router), React 19, TypeScript, Clerk auth, Drizzle ORM, and Neon PostgreSQL. Before writing or modifying any code, read the relevant standards doc from the `/docs` directory.

## Standards Docs

| Topic | File |
|---|---|
| Authentication (Clerk) | [docs/auth.md](docs/auth.md) |
| UI Components (shadcn/ui) | [docs/ui.md](docs/ui.md) |

## BLOCKING REQUIREMENT — Docs Must Be Read First

**Before writing or modifying ANY code**, you MUST use `read_file` to load and read every doc in the table above. This is not optional and applies to ALL tasks, regardless of scope. Do not generate a single line of code until all docs have been read in full.

Enforcement steps (mandatory, in order):
1. Identify which docs are relevant to the task (when in doubt, read all of them).
2. Call `read_file` on each relevant doc and read the full contents.
3. Only then begin writing or modifying code.

## Non-Negotiable Rules

- **ALWAYS read ALL relevant docs (listed above) via `read_file` BEFORE writing any code — no exceptions.**
- All files are TypeScript (`.ts` / `.tsx`). No `.js` or `.jsx` files.
- Strict TypeScript — no `any`, no `ts-ignore`.
- Use the `@/` path alias for all internal imports.
- Server Components are the default. Only add `'use client'` when strictly necessary.
- Never hardcode secrets or credentials. Use environment variables.
- Run `npm run lint` after any change to verify no ESLint violations.
