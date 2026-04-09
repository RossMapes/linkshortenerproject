import { Link2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserLinks } from "@/data/links";
import { CreateLinkDialog } from "./components/create-link-dialog";
import { EditLinkDialog } from "./components/edit-link-dialog";
import { DeleteLinkDialog } from "./components/delete-link-dialog";

export default async function DashboardPage() {
  const links = await getUserLinks();

  return (
    <div className="mx-auto max-w-6xl px-8 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Your Links</h1>
        <CreateLinkDialog />
      </div>

      {links.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed py-20 text-center text-muted-foreground">
          <Link2 className="size-8" />
          <p className="text-sm">
            No links yet. Create your first short link to get started.
          </p>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {links.map((link) => (
            <li key={link.id}>
              <Card className="flex flex-col h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-semibold">
                    /{link.shortCode}
                  </CardTitle>
                  <CardDescription className="truncate text-sm">
                    {link.url}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Created{" "}
                      {new Intl.DateTimeFormat("en-GB", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(link.createdAt))}
                    </p>
                    <div className="flex items-center gap-1">
                      <EditLinkDialog
                        id={link.id}
                        initialUrl={link.url}
                        initialShortCode={link.shortCode}
                      />
                      <DeleteLinkDialog id={link.id} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
