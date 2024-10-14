"use client";

import { confirmPayment } from "@/app/actions";
import { CourseInfo } from "@/app/components/user-id/CourseInfo";
import { PayInfo } from "@/app/components/user-id/PayInfo";
import { User } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useState } from "react";
import { CancelPayment } from "./CancelPayment";
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
  const [openDialog, setOpenDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState("");

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
  const candelPayment = async () => {
    const response = await confirmPayment(userId, true);
    if (response.message === "yes" && response.updatedUser) {
      const updatedUser = response.updatedUser;
      setEnrolled(updatedUser.enrolled);
      setPayment(updatedUser.payment);
      setVerified(updatedUser.verified);
      setBought(updatedUser.bought);
    }
  };


  const handleDeclinePayment = async () => {
    // Handle decline logic here
    console.log(`Declined for reason: ${declineReason}`);
    setOpenDialog(false);
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
              {data?.transactionImgUrl ? (
                <div className="relative w-full h-[300px] lg:h-[400px] bg-black overflow-hidden">
                  <Image
                    src={data?.transactionImgUrl}
                    alt={data?.transactionImgUrl}
                    className="absolute inset-0 w-full h-full object-contain"
                    layout="fill"
                  />
                </div>
              ) : (
                <div>
                  <h1>no receipt uploaded</h1>
                </div>
              )}
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


      <CancelPayment userId={userId} cancelPayment={cancelPayment}/>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="m-2 w-1/2 mx-auto justify-center">Decline</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Payment</DialogTitle>
          </DialogHeader>
          <form action="">
            <div className="space-y-4"> 
              <p>Are you sure you want to decline the payment?</p>
              <div>
                <Label htmlFor="reason" className="my-2">
                  Reason for declining
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason here..."
                  className="m-2"
                  name="reason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Confirm Decline
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
