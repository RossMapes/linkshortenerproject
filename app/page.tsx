import { SignInButton } from "@clerk/nextjs";
import { Link2, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const features = [
  {
    icon: Link2,
    title: "Shorten Any URL",
    description:
      "Paste a long link and get a clean, shareable short URL in seconds. No technical knowledge required.",
  },
  {
    icon: FolderOpen,
    title: "Manage Your Links",
    description:
      "View, edit, and organise all your short links from one dashboard. Stay in control of every redirect you create.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center gap-8 px-6 py-24 text-center">
        <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Short links. Huge impact.
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Turn unwieldy URLs into memorable short links you can share anywhere
          — and share them anywhere.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <SignInButton mode="modal">
            <Button size="lg" variant="outline">
              Sign In
            </Button>
          </SignInButton>
        </div>
      </section>

      {/* Features */}
      <section className="border-t bg-muted/40 px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-2xl font-semibold tracking-tight sm:text-3xl">
            Everything you need to share smarter
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, description }) => (
              <Card key={title}>
                <CardHeader>
                  <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t px-6 py-6 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} LinkShortener. All rights reserved.
      </footer>
    </div>
  );
}
