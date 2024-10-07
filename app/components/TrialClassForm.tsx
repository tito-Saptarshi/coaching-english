"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bookTrial } from "../actions";
import { useRouter } from "next/navigation";
import { TrialClass } from "../lib/types";
export function TrialClassForm({ classData }: { classData: TrialClass[] }) {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.get("name") as string | null;
    formData.get("phone") as string | null;
    formData.get("subject") as string | null;

    const result = await bookTrial(formData); // Call the server action
    if (!result) {
      console.error("No response from the server.");
      return;
    }

    if (result.success) {
      router.push(result.redirectTo || "/");
    } else if (result.redirectTo) {
      router.push(result.redirectTo); // Handle redirect if not logged in
    } else {
      console.error(result.error); // Handle any errors
    }
  };
  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="rounded-md shadow-sm space-y-4">
        <div>
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1"
            placeholder="John Doe"
          />
        </div>

        <div>
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            className="mt-1"
            placeholder="+1234567890"
          />
        </div>
        <div>
          <Label htmlFor="subject">Choose Date</Label>
          <Select name="subject" required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select a subject" />
            </SelectTrigger>
            <SelectContent>
              {classData.map((classItem) => (
                <SelectItem value={classItem.trialClass} key={classItem.id}>
                  {classItem.trialClass}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Book Trial Class
        </Button>
      </div>
    </form>
  );
}
