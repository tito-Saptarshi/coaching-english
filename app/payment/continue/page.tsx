"use client";
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
import { updatePaymentDetails } from "@/app/actions";
import Image from "next/image";
import { useState } from "react";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ContinuePayment() {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("retry payment handleSubmit");

    const formData = new FormData(e.currentTarget);

    formData.get("paymentId") as string | null;
    formData.get("transactionImgUrl") as string | null;
    formData.get("comments") as string | null;
    const result = await updatePaymentDetails(formData);
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

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault(); // Ensure form default submission is prevented
  //   console.log("retry payment handleSubmit");

  //   try {
  //     const formData = new FormData(e.currentTarget);
  //     const paymentId = formData.get("paymentId") as string | null;
  //     const transactionImgUrl = formData.get("transactionImgUrl") as
  //       | string
  //       | null;
  //     const comments = formData.get("comments") as string | null;

  //     console.log("Form Data:", { paymentId, transactionImgUrl, comments });

  //     // Call your action
  //     await updatePaymentDetails(formData);
  //   } catch (error) {
  //     console.error("Error in handleSubmit:", error);
  //   }
  // };

  return (
    <div className="container mx-auto px-4 py-4 max-w-[1000px]">
      {" "}
      <Card className="">
        <CardHeader>
          <CardTitle>Confirm Your Payment</CardTitle>
          <CardDescription>
            After making the payment, please provide the transaction details
            below
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <h1>Check Bank details  </h1>
            <Button asChild variant="secondary">
              <Link href={"/payment"}>Bank Details</Link>
            </Button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="hidden"
              name="transactionImgUrl"
              value={imageUrl || ""}
            />
            <div>
              <Label htmlFor="paymentId">Transaction ID</Label>
              <Input
                id="paymentId"
                name="paymentId"
                placeholder="Enter your transaction ID"
                required
              />
            </div>
            <div>
              <Label htmlFor="receiptImage">Upload Receipt Image</Label>

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
        </CardContent>
        <CardFooter>
          <p className="text-sm text-muted-foreground">
            If you face any issues with your payment, please contact our support
            team at support@excellencecoaching.com
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
