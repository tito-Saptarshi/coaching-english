import Link from "next/link";
import {
  CalendarIcon,
  CheckCircleIcon,
  LinkIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      trialDate: true,
    },
  });
}

async function getTrialClassData(trialClass: string) {
  noStore();
  return await prisma.trailClassDate.findMany({
    where: {
      trialClass: trialClass,
    },
    select: {
      trialClassLink: true,
      optionalMessage: true,
      trialClass: true,
    },
  });
}

export default async function TrialClassConfirmation() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  const trialClassData = await getTrialClassData(data?.trialDate ?? "");
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <CheckCircleIcon className="h-6 w-6 text-green-500" />
            <CardTitle className="text-2xl">Trial Class Booked! </CardTitle>
          </div>
          <CardDescription>
            <h1>Your trial class has been successfully scheduled.</h1>
            <p className="mt-2 font-bold text-black text-lg">
              Date and Time for your Trial Class :{" "}
              {trialClassData[0]?.trialClass}
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Class Link</h3>
            <div className="flex items-center space-x-2 bg-muted p-3 rounded-md">
              <LinkIcon className="h-5 w-5 text-primary" />
              <p className="text-primary hover:underline break-all">
                {trialClassData[0]?.trialClassLink}
              </p>
            </div>
          </div>
          <div>
            {trialClassData[0]?.optionalMessage && (
              <div className="flex items-center space-x-2  p-3 ">
                <h1 className="font-bold">Notice: </h1>
                <p className="text-primary ">
                  {trialClassData[0]?.optionalMessage}
                </p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Important Information</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>
                Your trial class is scheduled for{" "}
                <span className="font-bold">{data?.trialDate}.</span>
              </li>
              <li>
                Please join the class 5 minutes before the scheduled time.
              </li>
              <li>
                Ensure you have a stable internet connection for the best
                experience.
              </li>
            </ul>
          </div>
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader className="pb-2">
              <h3 className="text-lg font-semibold">Changes to Your Booking</h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                In case of any changes to the trial class date or link, we will
                notify you via:
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center space-x-2">
                  <MailIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm">Email notification</span>
                </div>
                <div className="flex items-center space-x-2">
                  <UserIcon className="h-5 w-5 text-primary" />
                  <span className="text-sm">Updates in your profile</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href={"/user/profile"}>
            <Button className="w-full sm:w-auto mt-2 sm:mt-0">
              <UserIcon className="mr-2 h-4 w-4" />
              View Profile
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
