"use client"

import * as React from "react"
import * as DialogPrimitive from "@radix-ui/react-dialog"

import { cn } from "@/lib/utils"

const Drawer = DialogPrimitive.Root

const DrawerTrigger = DialogPrimitive.Trigger

const DrawerClose = DialogPrimitive.Close

const DrawerPortal = DialogPrimitive.Portal

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DrawerOverlay.displayName = "DrawerOverlay"

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 flex flex-col rounded-t-3xl bg-background p-5 shadow-lg duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        className
      )}
      {...props}
    >
      <div className="mx-auto mb-4 h-1.5 w-[40%] rounded-full bg-muted-foreground/20" />
      {children}
    </DialogPrimitive.Content>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

export {
  Drawer,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerOverlay,
  DrawerPortal,
}
