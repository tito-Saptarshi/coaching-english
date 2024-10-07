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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import { MainClass } from "../lib/types";
import { deleteMainDates, updateMainDates } from "../actions";




export function MainClassView({ mainData }: { mainData: MainClass[] }) {

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.get("oldDate") as string | null;
    formData.get("date") as string | null;
    formData.get("optionalMessage") as string | null;

    await updateMainDates(formData, true);
  };

  const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.get("date") as string | null;

    await deleteMainDates(formData, true);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">Class Schedule</h1>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="space-y-2">
          {mainData.map((classItem) => (
            <Card key={classItem.id} className="overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <div className="flex-grow">
                    <h2 className="text-base sm:text-lg font-semibold">
                      {classItem.mainClass}
                    </h2>
                    {/* <p className="text-sm text-muted-foreground flex items-center mt-1">
                      <Clock className="mr-1 h-3 w-3" />
                      {classItem.time}
                    </p> */}
                    {classItem.optionalMessage && (
                      <div className="flex items-start mt-2">
                        <MessageCircle className="mr-1 h-3 w-3 mt-0.5 flex-shrink-0" />
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {classItem.optionalMessage}
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-2 sm:mt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Update Trial Date</DialogTitle>
                          <DialogDescription>
                            <p className="text-base">{classItem.mainClass}</p>
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleEdit}>
                          <input
                            type="hidden"
                            name="oldDate"
                            value={classItem.mainClass}
                          />
                          <div className="flex items-center space-x-2 ">
                            <div className="grid flex-1 gap-2 py-2">
                              <Label htmlFor="date">
                                Update Class Date and Time
                              </Label>
                              <Input id="date" name="date" />
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="grid flex-1 gap-2 pb-2">
                              <Label htmlFor="optionalMessage">
                                Change Optional Message
                              </Label>
                              <Input
                                id="optionalMessage"
                                name="optionalMessage"
                              />
                            </div>
                          </div>
                          <div className="flex justify-between py-1">
                            <DialogClose asChild>
                              <Button type="submit">Update Class</Button>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Trial Date ?</DialogTitle>
                          <DialogDescription>
                            <p className="text-xl font-black font-bold">
                              {classItem.mainClass}
                            </p>
                          </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleDelete}>
                          <input
                            type="hidden"
                            name="date"
                            value={classItem.mainClass}
                          />

                          <div className="flex justify-between py-1">
                            <DialogClose asChild>
                              <Button variant="destructive" type="submit">
                                Delete Class
                              </Button>
                            </DialogClose>
                            <DialogFooter className="sm:justify-start">
                              <DialogClose asChild>
                                <Button type="button">Close</Button>
                              </DialogClose>
                            </DialogFooter>
                          </div>
                        </form>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
