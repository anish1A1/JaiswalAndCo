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

      {/* Changed dialog width to fit-content on large screens and added flex rules */}
      <DialogContent className="flex flex-col max-w-md w-full rounded-2xl p-4 sm:max-w-2xl sm:w-auto h-auto max-h-[90vh]">
        
        {/* Container that dynamically caps the image height on desktop screens */}
        <div className="relative aspect-square w-full sm:w-[500px] max-h-[60vh] sm:max-h-[70vh] overflow-hidden rounded-xl bg-muted mt-6 mx-auto">
          <Image
            src={image}
            alt={name}
            fill
            priority
            className="object-contain"
          />
        </div>

        <h3 className="text-center text-lg font-semibold mt-2 truncate">
          {name}
        </h3>
      </DialogContent>
    </Dialog>
  );
}
