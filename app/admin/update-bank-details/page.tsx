"use client";
import { updateBankDetails } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BaseNextResponse } from "next/dist/server/base-http";

export default function UpdateBankDetails() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Form submitted!");

    const formData = new FormData(event.currentTarget);
    formData.get("accountNumber") as string | null;
    formData.get("accountName") as string | null;
    formData.get("bankName") as string | null;
    formData.get("ifscCode") as string | null;

    await updateBankDetails(formData, true);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Book a Free Trial Class
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose your preferred date and time for the trial class
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <Label htmlFor="name">Account Number</Label>
              <Input
                id="name"
                name="accountNumber"
                type="text"
                required
                className="mt-1"
                placeholder="1234567890"
              />
            </div>
            <div>
              <Label htmlFor="name">Account Name</Label>
              <Input
                id="name"
                name="accountName"
                type="text"
                required
                className="mt-1"
                placeholder="Excellence Coaching Institute"
              />
            </div>
            <div>
              <Label htmlFor="name">Bank Name</Label>
              <Input
                id="name"
                name="bankName"
                type="text"
                required
                className="mt-1"
                placeholder="Education Bank"
              />
            </div>

            <div>
              <Label htmlFor="phone">IFSC Code</Label>
              <Input
                id="phone"
                name="ifscCode"
                type="text"
                required
                className="mt-1"
                placeholder="+EDUC0001234"
              />
            </div>
            <div>
              <Label htmlFor="phone">Upload QR</Label>
              <Input
                id="phone"
                name="phone"
                type="file"
                className="mt-1"
                disabled
                placeholder="+EDUC0001234"
              />
            </div>
          </div>

          <div>
            <Button type="submit" className="w-full">
              Book Trial Class
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
