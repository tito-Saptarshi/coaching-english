import { UpdateUserDetails } from "@/app/components/UpdateUserDetails";
import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { AlertTriangle, CheckCircle, Clock, XCircle } from "lucide-react";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";

async function getData(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default async function StudentProfile() {
  const student = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    paymentStatus: "Paid",
    studentId: "ST12345",
    course: "Computer Science",
    year: "3rd Year",
    gpa: "3.8",
    advisor: "Dr. Emily Brown",
    enrollmentDate: "September 1, 2021",
  };

  const { getUser } = getKindeServerSession();
  const data = await getUser();

  const user = await getData(data?.id);

  return (
    <div className="container mx-auto px-4 py-8 text-sm">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src={data.picture ?? "placeholder-avatar.jpg"} alt={user?.fullName} />
            <AvatarFallback>
              {user?.fullName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="text-center sm:text-left">
            <CardTitle className="text-2xl font-bold">
              {user?.fullName}
            </CardTitle>
            <p className="text-muted-foreground">
              Click EDIT PROFILE to update your namer
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className=" flex flex-col gap-y-4">
            <div>
              <Label>Email</Label>
              <p className="text-sm pl-4">{user?.email}</p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <p className="text-sm pl-4">
                {user?.phoneNumber ??
                  "Click EDIT PROFILE to add / update phone number"}
              </p>
            </div>
            <div>
              <Card className="p-2">
                <Label>Payment Status</Label>

                <div className="my-2 ml-2">
                  {user?.payment && user?.verified == true ? (
                    "verified"
                  ) : user?.payment == true ? (
                    <div className="flex items-cente text-base">
                      {" "}
                      pending for verificaiton{" "}
                      <Clock className="h-4 w-4 ml-1 inline" />
                    </div>
                  ) : user?.paymentDecline == true ? (
                    <div className="flex  flex-col">
                      <div className="flex text-red-900 items-center ">
                        <AlertTriangle className="inline" />
                        <p className="text-lg ml-1">Payment Verification Failed.</p>
                      </div>
                      <div className="text-sm my-2 ml-3">
                        <Link
                          className="text-red-900 hover:font-bold text-sm"
                          href={"/payment/continue"}
                        >
                          CLICK HERE to Upload Payment Details (if paid)
                        </Link>
                        <Link
                          className="text-red-900 hover:font-bold text-sm block mb-2"
                          href={"/payment"}
                        >
                          OR, CLICK HERE to continue to payments
                        </Link>
                        <p>
                          if you thing, there&apos;s a mistake made from our
                          side, you can write to us on
                          saptarshi.dev.20@gmail.com or call us at +911234567890
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      yet to enroll / not paid
                    </div>
                  )}
                </div>
              </Card>
            </div>
            {user?.declineMessage && (
              <div>
                <h1>Reason for Decline</h1>
                <p className="ml-4 text-red-900">{user?.declineMessage}</p>
              </div>
            )}
            <div>
              <Label>Enrollment Status</Label>
              <div className="text-sm pl-4">
                {user?.enrolled == true && user?.verified == true ? (
                  "Enrolled"
                ) : user?.enrolled == true ? (
                  <div>
                    <div className="flex">
                      <p className="pr-2">Enrolled</p>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <p className="text-foreground pl-2">
                      Enrollment may get cancel if payment verification fails.
                    </p>
                  </div>
                ) : user?.paymentDecline == true ? (
                  <div>
                    <div className="flex">
                      <p className="pr-2">
                        Disenrolled, payment verification failed
                      </p>
                      <XCircle className="h-5 w-5 text-red-500" />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <p className="mr-2">not enrolled</p>{" "}
                    <Link
                      className="text-red-900 hover:font-bold"
                      href={"/enroll"}
                    >
                      CLICK HERE to enroll now
                    </Link>{" "}
                  </div>
                )}
              </div>
            </div>
            {user?.verified && <div>
              <Label>Upcoming Classes</Label>
              <div className="text-sm pl-4">
                {user?.verified && <>
                  <Link
                      className="text-red-900 hover:font-bold "
                      href={"/trial-class/confirmation"}
                    >
                      {" "}
                      All Classes
                    </Link>
                </>}
              </div>
            </div>}
            <div>
              <Label>Trail Class</Label>
              <div className="text-sm pl-4">
                {user?.trial == true ? (
                  <div>
                    <p> Already registered for trial class</p>
                    <Link
                      className="text-red-900 hover:font-bold "
                      href={"/trial-class/confirmation"}
                    >
                      {" "}
                      Trial class details
                    </Link>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    <Link
                      className="text-red-900 hover:font-bold"
                      href={"/trial-class"}
                    >
                      CLICK HERE to take free trial class
                    </Link>{" "}
                  </div>
                )}
              </div>
            </div>

            {(user?.enrolled || user?.paymentDecline) && (
              <div>
                <Label>
                  Forgot to Upload Payment Transaction ID or Payment Receipt{" "}
                </Label>

                <div className="flex flex-col pl-4">
                  <Link
                    className="text-red-900 hover:font-bold text-sm"
                    href={"/payment/continue"}
                  >
                    CLICK HERE to reupload payment details
                  </Link>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <UpdateUserDetails />
        </CardFooter>
      </Card>
    </div>
  );
}
