"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUser } from "../actions";

export function UpdateUserDetails() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted!");

    const formData = new FormData(event.currentTarget);
    formData.get("name") as string | null;
    formData.get("phone") as string | null;

    await updateUser(formData);
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" name="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone Number
                </Label>
                <Input id="username" name="phone" className="col-span-3" />
              </div>
              <DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogClose>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Button>Contact Advisor</Button>
    </>
  );
}
