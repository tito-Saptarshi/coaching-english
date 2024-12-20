"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { QrCode, Copy, CheckCircle2, AlertTriangle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { confirmPaymentUser } from "../actions";
import { useRouter } from "next/navigation";
import { BankDetails } from "../lib/types";
import Image from "next/image";
import { UploadDropzone } from "./Uploadthing";

export function PaymentsForm({ paymentData, paymentPrice }: { paymentData: BankDetails; paymentPrice: number }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [receiptImage, setReceiptImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('Receipt Image:', receiptImage)
    // Reset form after submission
    setTransactionId("");
    setReceiptImage(null);
    setIsDialogOpen(false);
    // Open the confirmation dialog

    setIsConfirmationOpen(true);
    const formData = new FormData(e.currentTarget);
    formData.get("paymentId") as string | null;
    formData.get("comments") as string | null;
    if (imageUrl) {
      formData.append("transactionImgUrl", imageUrl);
    }
    const result = await confirmPaymentUser(formData); //
    if (!result) {
      console.error("No response from the server.");
      return;
    }

    if (result.success) {
      router.push(result.redirectTo || "/");
    } else if (result.redirectTo) {
      router.push(result.redirectTo);
    } else {
      console.error(result.error); // Handle any errors
    }
  };

  const ConfirmPaymentForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="transactionImgUrl" value={imageUrl || ""}/>
      <div>
        <Label htmlFor="transactionId">Transaction ID</Label>
        <Input
          id="transactionId"
          name="paymentId"
          placeholder="Enter your transaction ID"
          required
        />
      </div>
      <div>
        <Label htmlFor="receiptImage">Upload Receipt Image</Label>
        {/* <Input 
          id="receiptImage" 
          type="file" 
          accept="image/*"
          onChange={(e) => setReceiptImage(e.target.files?.[0] || null)}
          required
        /> */}
        {imageUrl === null ? (
          <UploadDropzone
            className="ut-button:ut-readying:bg-primary/50 ut-label:text-primary ut-button:ut-uploading:bg-primary/50 ut-button:ut-uploading:after:bg-primary "
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
            }}
            onUploadError={(error: Error) => {
              console.error("Upload Error:", error);
              alert("Error during upload. Please try again.");
            }}
          />
        ) : (
          <div className="flex flex-col items-end">
            <Image
              src={imageUrl}
              alt="uploaded image"
              width={500}
              height={400}
              className="h-80 rounded-lg w-full object-contain -mb-5"
            />
            <Button
              className="w-20"
              type="button"
              onClick={() => setImageUrl(null)}
            >
              Remove
            </Button>
          </div>
        )}
      </div>
      <div>
        <Label htmlFor="comments">Additional Comments (Optional)</Label>
        <Textarea
          id="comments"
          name="comments"
          placeholder="Any additional information about your payment"
        />
      </div>
      <Button type="submit" className="w-full">
        Submit Payment Details
      </Button>
    </form>
  );

  return (
    <div className="container mx-auto px-4 py-4">
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important Payment Information</AlertTitle>
        <AlertDescription>
          Please remember to submit your transaction ID and upload the receipt
          after making the payment. Failure to do so may result in your payment
          not being considered, even if you have transferred the amount.
        </AlertDescription>
      </Alert>
      {/* <h1 className="text-3xl font-bold text-center mb-8">Make Your Payment</h1> */}
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Details (Rs {paymentPrice} / month)</CardTitle>
            <CardDescription>
              Scan the QR code or use the account details below to make your
              payment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center mb-6">
              {/* below is the sample qr code */}
              {/* <QrCode size={200} /> */}
              <Image src={paymentData.scannerQR ?? ""} alt="imageUrl" width={300} height={300}/>
            </div>
            <div className="space-y-2">
              <div>
                <h3 className="font-semibold mb-1">Account Number</h3>
                <div className="flex items-center space-x-2">
                  <p className="bg-muted p-2 rounded-md flex-grow">
                    {paymentData?.accountNumber}
                  </p>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleCopy("1234567890")}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Account Name</h3>
                <p className="bg-muted p-2 rounded-md">
                 {paymentData?.accountName}
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Bank Name</h3>
                <p className="bg-muted p-2 rounded-md">{paymentData?.bankName}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-1">IFSC Code</h3>
                <p className="bg-muted p-2 rounded-md">{paymentData?.ifscCode}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Confirm Your Payment</CardTitle>
            <CardDescription>
              After making the payment, please provide the transaction details
              below
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ConfirmPaymentForm />
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              If you face any issues with your payment, please contact our
              support team at support@excellencecoaching.com
            </p>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8 md:hidden">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full">Confirm Payment</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Confirm Your Payment</DialogTitle>
              <DialogDescription>
                After making the payment, please provide the transaction details
                below
              </DialogDescription>
            </DialogHeader>
            <ConfirmPaymentForm />
          </DialogContent>
        </Dialog>
      </div>

      <Dialog open={isConfirmationOpen} onOpenChange={setIsConfirmationOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Payment Submitted</DialogTitle>
            <DialogDescription>
              Your payment details have been submitted successfully.
            </DialogDescription>
          </DialogHeader>
          <div className="py-6">
            <p className="text-center text-lg font-semibold">
              Your payment will be verified shortly.
            </p>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsConfirmationOpen(false)}
              className="w-full"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
