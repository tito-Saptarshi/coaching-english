"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, GraduationCap, Lightbulb, PenTool } from "lucide-react";
import { enrollUser } from "../actions";
import { useRouter } from "next/navigation";
export function EnrollmentForm() {
  const router = useRouter();

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault()
  //   console.log('Form submitted:', { name, phone })
  //   window.location.href = '/payments'
  // }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.get("name") as string | null;
    formData.get("phone") as string | null;

    const result = await enrollUser(formData); // Call the server action
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
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-blue-200">
          <BookOpen size={120} />
        </div>
        <div className="absolute top-3/4 left-3/4 transform -translate-x-1/2 -translate-y-1/2 text-blue-200">
          <GraduationCap size={120} />
        </div>
        <div className="absolute top-1/4 right-1/4 transform translate-x-1/2 -translate-y-1/2 text-blue-200">
          <Lightbulb size={120} />
        </div>
        <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 translate-y-1/2 text-blue-200">
          <PenTool size={120} />
        </div>
      </div>

      {/* Main content */}
      <Card className="w-full max-w-md relative z-10 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Student Enrollment
          </CardTitle>
          <CardDescription className="text-center">
            Join our coaching program and unlock your potential!
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="Enter your full name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your phone number"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Proceed to Payment
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
