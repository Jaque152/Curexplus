"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      position="bottom-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-paper group-[.toaster]:text-ink group-[.toaster]:border-sand group-[.toaster]:rounded-xl group-[.toaster]:shadow-lift",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-pine group-[.toast]:text-paper group-[.toast]:rounded-full",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
          title: "group-[.toast]:font-display",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
