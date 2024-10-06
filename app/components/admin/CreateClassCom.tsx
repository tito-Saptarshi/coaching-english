"use client";
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
import { useState } from "react";

import { chooseTrialDates } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { CirclePlusIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ClassCard } from "../ClassCard";
import { TrialClass } from "@/app/lib/types";


export function CreateClassCom({ trialData }: { trialData: TrialClass[] }) {
  const [trialClass, setTrialClass] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted!");

    const formData = new FormData(event.currentTarget);
    const trialDate = formData.get("date") as string | null;
    const message = formData.get("optionalMessage") as string | null;

    console.log("Trial Date:", trialDate);
    console.log("Message:", message);

    const data2 = await chooseTrialDates(formData, true);
    if (data2.message === "yes" && data2.data) {
      setTrialClass(data2.data.trialClass);
    }
  };

  return (
    <div className="flex flex-col gap-y-4 pt-4">
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add class <CirclePlusIcon className="ml-1 h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create a Trial Class</DialogTitle>
              <DialogDescription>
                Provide a date and optional message to create a trial class.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="flex items-center space-x-2 ">
                <div className="grid flex-1 gap-2 py-2">
                  <Label htmlFor="date">Trial Date and Time</Label>
                  <Input id="date" name="date" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2 pb-2">
                  <Label htmlFor="optionalMessage">(Optional Message)</Label>
                  <Input id="optionalMessage" name="optionalMessage" />
                </div>
              </div>
              <div className="flex justify-between py-1">
                <DialogClose asChild>
                  <Button type="submit">Create Class</Button>
                </DialogClose>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button type="button" variant="destructive">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ClassCard trialData={trialData}/>
    </div>
  );
}
