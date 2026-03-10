"use client";

import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockUser } from "@/lib/mock-data";
import { Pencil } from "lucide-react";

export function ProfileSection() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(mockUser.fullName);
  const [email, setEmail] = useState(mockUser.email);
  const [phone, setPhone] = useState(mockUser.phone);

  const initials = mockUser.fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-4">
      <Avatar className="h-14 w-14 border border-border">
        <AvatarFallback className="bg-secondary text-secondary-foreground text-lg">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
        <p className="text-xs text-muted-foreground font-mono">
          {mockUser.beamPayId}
        </p>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Pencil className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[380px]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="editName">Full Name</Label>
              <Input
                id="editName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editEmail">Email</Label>
              <Input
                id="editEmail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="editPhone">Phone</Label>
              <Input
                id="editPhone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Button onClick={() => setOpen(false)} className="w-full">
              Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
