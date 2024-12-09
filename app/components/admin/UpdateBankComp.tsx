"use client";
import { updateBankDetails } from "@/app/actions";
import { UploadDropzone } from "@/app/components/Uploadthing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useState } from "react";
export function UpdateBankComp({ adminUser }: { adminUser: boolean }) {
  const [imageUrl, setImageUrl] = useState<null | string>(null);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // console.log("Form submitted!");

    const formData = new FormData(event.currentTarget);
    formData.get("accountNumber") as string | null;
    formData.get("accountName") as string | null;
    formData.get("bankName") as string | null;
    formData.get("ifscCode") as string | null;
    formData.get("transactionImgUrl") as string | null;
    await updateBankDetails(formData, adminUser);
  };
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-foreground">
            Update Bank Details
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="transactionImgUrl"
            value={imageUrl || ""}
          />
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
          </div>

          <div>
            <Button type="submit" className="w-full">
              Update Bank Details
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
