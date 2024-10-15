import prisma from "@/app/lib/db";
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

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Group, MessageCircle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  return await prisma.trailClassDate.findMany({
    select: {
      id: true,
      trialClass: true,
      optionalMessage: true,
      trialClassLink: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}
async function getUserProfile(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
export default async function TrialClassMail() {
  const data = await getData();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await getUserProfile(user?.id);
  if (!user) {
    return redirect("/api/auth/login");
  }
  if (!userData?.admin) return redirect("/");
  return (
    <div className="w-full max-w-3xl mx-auto p-2 sm:p-4">
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Trial Class Schedule
      </h1>
      <ScrollArea className="h-[calc(100vh-100px)]">
        <div className="space-y-2">
          {data.map((classItem) => (
            <Card key={classItem.id} className="overflow-hidden">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                  <div className="flex-grow">
                    <h2 className="text-base sm:text-lg font-semibold">
                      {classItem.trialClass}
                    </h2>
                    <h2 className="text-base  inline-block">
                      <span className="font-semibold text-sm">
                        Class Link :
                      </span>{" "}
                      {classItem.trialClassLink}
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
                    <Link href={`/admin/trial-class/${classItem?.trialClass}`}>
                      <Button variant="outline" size="icon">
                        <Group className="h-4 w-4" />
                      </Button>
                    </Link>
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
