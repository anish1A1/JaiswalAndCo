"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface Props {
  image: string;
  name: string;
}

export default function ProductImageViewer({
  image,
  name,
}: Props) {
  return (
    <Dialog>
      {/* Base UI uses the 'render' prop instead of 'asChild' */}
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="sm"
            className="w-full gap-2"
          />
        }
      >
        <Expand className="h-4 w-4" />
        View Image
      </DialogTrigger>

      {/* Your DialogContent component automatically displays the close button */}
      <DialogContent className="max-w-md rounded-2xl p-3 sm:max-w-2xl">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted mt-6">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-contain"
          />
        </div>

        <h3 className="text-center text-lg font-semibold">
          {name}
        </h3>
      </DialogContent>
    </Dialog>
  );
}
