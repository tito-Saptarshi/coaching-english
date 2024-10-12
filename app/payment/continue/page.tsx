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

export default function ContinuePayment() {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("retry payment handleSubmit");

    const formData = new FormData(e.currentTarget);

    formData.get("paymentId") as string | null;

    await updatePaymentDetails(formData);
  };

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
          <form onSubmit={handleSubmit} className="space-y-4">
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
            </div>
            <div>
              <Label htmlFor="comments">Additional Comments (Optional)</Label>
              <Textarea
                id="comments"
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
