"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { lazy } from "react";

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
            className="h-6 w-6 rounded-full p-0"
          />
        }
      >
        <Expand className="h-4 w-4" />
      </DialogTrigger>

      {/* Changed dialog width to fit-content on large screens and added flex rules */}
      <DialogContent
        className="
        w-[95vw]
        max-w-[95vw]

        sm:max-w-xl

        lg:max-w-2xl

        rounded-xl

        p-3

        sm:p-5
        "
        >
                
        {/* Container that dynamically caps the image height on desktop screens */}
        <div className="relative w-full sm:w-125 max-h-[65vh] sm:max-h-[75vh] flex items-center justify-center overflow-hidden rounded-xl bg-muted mt-6 mx-auto">
          <img
            src={image}
            alt={name}
            className="w-auto
                max-w-full
                h-auto
                max-h-[65vh]
                object-contain"
            loading="lazy"
          />
        </div>

        <h3 className="text-center text-sm sm:text-lg  font-semibold mt-2 truncate">
          {name}
        </h3>
      </DialogContent>
    </Dialog>
  );
}
