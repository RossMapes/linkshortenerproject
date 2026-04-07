# UI Components — shadcn/ui

## Non-Negotiable Rule

**All UI elements must use shadcn/ui components. Do not create custom components.** If a UI need arises, find the appropriate shadcn/ui component or compose existing ones.

## Adding Components

Install new shadcn/ui components via the CLI:

```bash
npx shadcn@latest add <component-name>
```

Components are added to `components/ui/`. Never modify files in that directory — they are owned by shadcn/ui.

## Usage

Import components from `@/components/ui/`:

```tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

## Styling

- Use the `cn()` utility from `@/lib/utils` to merge class names.
- Use Tailwind utility classes for layout and spacing adjustments.
- Do not override shadcn/ui component internals with custom CSS.

## Composition Rules

- Prefer composing shadcn/ui primitives over building new components from scratch.
- If a layout requires multiple shadcn/ui components together, co-locate them in a page or feature file — do not abstract into a new one-off component.
