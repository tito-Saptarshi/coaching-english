import prisma from "@/app/lib/db";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckCircle, XCircle } from "lucide-react";

async function getData(userId: string) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      userName: true,
      fullName: true,
      trial: true,
      bought: true,
      verified: true,
      payment: true,
      trialDate: true,
      paymentId: true,
      admin: true,
      validity: true,
      enrolled: true,
    },
  });
  return data;
}

export default async function StudentDetails({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

  // Mock data for the student
  const student = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    phoneNumber: "+1 (555) 123-4567",
    trialClassTaken: true,
    trialClassDate: "2023-09-15",
    enrolled: true,
    feesPaid: false,
    transactionId: "TRX123456",
    receiptImage: "/placeholder.svg?height=300&width=400",
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Student Details</CardTitle>
        <CardDescription>
          Information about the student in the coaching institute
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label className="text-base">Personal Information</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <div id="name" className="text-sm font-medium">
                {data?.fullName}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <div id="email" className="text-sm font-medium break-all">
                {data?.email}
              </div>
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div id="phone" className="text-sm font-medium">
                {data?.phoneNumber}
              </div>
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-2">
          <Label className="text-base">Course Information</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Label>Trial Class Taken</Label>
              {data?.trial ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            {data?.trialDate ? (
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">{data?.trialDate}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <p>
                  <span className="text-sm mr-1">
                    : no trial date picked 
                  </span>
                    <XCircle className="h-5 w-5 text-red-500 inline-block" />
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label>Enrolled for Course</Label>
              {student.enrolled ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            {student.enrolled && (
              <div className="flex items-center space-x-2">
                <p>
                  Validity till :{"  "}
                  <span className="text-sm">
                    {" "}
                    {data?.validity?.toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <Label>Bought Course</Label>
              {data?.bought ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Label>Payment made : </Label>
              {data?.payment ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Label>Payment verified</Label>
              {data?.verified ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
            </div>
          </div>
        </div>
        <Separator />
        <div className="space-y-4">
          <Label className="text-base">Payment Information</Label>
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <div id="transactionId" className="text-sm font-medium">
              {student.transactionId}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="receipt">Receipt</Label>
            <div className="border rounded-lg overflow-hidden">
              <img
                id="receipt"
                src={student.receiptImage}
                alt="Payment Receipt"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Verify Payment
        </Button>
      </CardFooter>
    </Card>
  );
}
