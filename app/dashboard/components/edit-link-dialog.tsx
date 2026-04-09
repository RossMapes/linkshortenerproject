"use client";

import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateLinkAction } from "./actions";

interface EditLinkDialogProps {
  id: number;
  initialUrl: string;
  initialShortCode: string;
}

export function EditLinkDialog({
  id,
  initialUrl,
  initialShortCode,
}: EditLinkDialogProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState(initialUrl);
  const [shortCode, setShortCode] = useState(initialShortCode);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit() {
    setError(null);
    setPending(true);
    const result = await updateLinkAction({ id, url, shortCode });
    setPending(false);

    if ("error" in result) {
      setError(result.error);
      return;
    }

    setOpen(false);
  }

  function handleOpenChange(value: boolean) {
    setOpen(value);
    if (!value) {
      setUrl(initialUrl);
      setShortCode(initialShortCode);
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <Pencil className="size-4" />
          <span className="sr-only">Edit link</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Link</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-short-code">Short Code</Label>
            <Input
              id="edit-short-code"
              type="text"
              placeholder="my-link"
              value={shortCode}
              onChange={(e) => setShortCode(e.target.value)}
              disabled={pending}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="edit-url">Destination URL</Label>
            <Input
              id="edit-url"
              type="url"
              placeholder="https://example.com/very/long/url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={pending}
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            disabled={pending || !url || !shortCode}
          >
            {pending ? "Saving…" : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
