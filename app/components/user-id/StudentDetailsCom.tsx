"use client";

import { confirmPayment } from "@/app/actions";
import { CourseInfo } from "@/app/components/user-id/CourseInfo";
import { PayInfo } from "@/app/components/user-id/PayInfo";
import { User } from "@/app/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
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
export function StudentDetailsCom({
  data,
  userId,
}: {
  data: User | null;
  userId: string;
}) {
  const [enrolled, setEnrolled] = useState(data?.enrolled);
  const [payment, setPayment] = useState(data?.payment);
  const [verified, setVerified] = useState(data?.verified);
  const [bought, setBought] = useState(data?.bought);

  const handleConfirmPayment = async () => {
    const response = await confirmPayment(userId, true);
    if (response.message === "yes" && response.updatedUser) {
      const updatedUser = response.updatedUser;
      setEnrolled(updatedUser.enrolled);
      setPayment(updatedUser.payment);
      setVerified(updatedUser.verified);
      setBought(updatedUser.bought);
    }
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

        <CourseInfo
          data={data}
          enrolled={enrolled!}
          payment={payment!}
          verified={verified!}
          bought={bought!}
          trial={data?.trial ?? null}
          trialDate={data?.trialDate ?? ""}
          validity={data?.validity}
        />
        <Separator />
        <div className="space-y-4">
          <Label className="text-base">P!ayment Information</Label>
          <div className="space-y-2">
            <Label htmlFor="transactionId">Transaction ID</Label>
            <div id="transactionId" className="text-sm font-medium">
              {data?.paymentId || "no payment Id"}
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
      <PayInfo
        data={data}
        enrolled={enrolled ?? null}
        payment={payment ?? null}
        verified={verified ?? null}
        bought={bought ?? null}
        handleConfirmPayment={handleConfirmPayment}
      />
    </Card>
  );
}
