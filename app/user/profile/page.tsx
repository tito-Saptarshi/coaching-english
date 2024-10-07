import { UpdateUserDetails } from "@/app/components/UpdateUserDetails";
import prisma from "@/app/lib/db";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Clock } from "lucide-react";
import Link from "next/link";

async function getData(userId: string) {
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

  const user = await getData(data.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
          <Avatar className="w-24 h-24">
            <AvatarImage src="/placeholder-avatar.jpg" alt={user?.fullName} />
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
            <p className="text-muted-foreground">{student.studentId}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Email</Label>
              <p className="text-sm">{user?.email}</p>
            </div>
            <div>
              <Label>Phone Number</Label>
              <p className="text-sm">{user?.phoneNumber}</p>
            </div>
            <div>
              <Label>Payment Status</Label>
              <div>
                {user?.payment && user?.verified == true ? (
                  "verified"
                ) : user?.payment == true ? (
                  <div className="flex items-center">
                    {" "}
                    pending for verificaiton{" "}
                    <Clock className="h-4 w-4 ml-1 inline" />
                  </div>
                ) : (
                  <div className="flex items-center">not paid</div>
                )}
              </div>
            </div>

            <div>
              <Label>Enrollment Status</Label>
              <div className="text-sm">
                {user?.enrolled == true ? (
                  "Enrolled"
                ) : (
                  <div className="flex flex-col">
                    <p className="mr-2">not enrolled</p>{" "}
                    <Link
                      className="text-red-900 hover:font-bold"
                      href={"/enroll"}
                    >
                      Click here to enroll now
                    </Link>{" "}
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label>Trail Class</Label>
              <div className="text-sm">
                {user?.enrolled == true ? (
                  "Trial class has already been taken"
                ) : (
                  <div className="flex flex-col">
                    <Link
                      className="text-red-900 hover:font-bold"
                      href={"/trial-class"}
                    >
                      Click here to take free trial class
                    </Link>{" "}
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <UpdateUserDetails />
        </CardFooter>
      </Card>
    </div>
  );
}
