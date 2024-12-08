"use client";

import { useState } from "react";
import { Trash2, Plus } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { createHomePage, updateHomePage } from "@/app/actions";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
export function UpdateHomePage() {
  const router = useRouter();
  const [className, setClassName] = useState("");
  const [description, setDescription] = useState("");
  const [rules, setRules] = useState<string[]>([""]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.get("heading") as string | null;
    formData.get("desc") as string | null;

    const result = await createHomePage(formData); // Call the server action

    if (result.success) {
      router.push(result.redirectTo || "/");
    } else if (result.redirectTo) {
      router.push(result.redirectTo); // Handle redirect if not logged in
    } else {
      console.error(result.error); // Handle any errors
    }
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Edit Class</h1>
      <Card className="pl-4 pb-4">
        <CardHeader>
          <CardTitle>Update Coaching and Description</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="className"
              className="block text-base font-medium  mb-1"
            >
              Coaching Name
            </label>
            <Input
              type="text"
              id="className"
              name="heading"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="mt-1 block w-full md:w-4/5 lg:w-11/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              placeholder="Enter class name"
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-base font-medium  mb-1"
            >
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              name="desc"
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full md:w-4/5 lg:w-11/12 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              rows={3}
              placeholder="Enter class description"
            />
          </div>
          <Button type="submit">Update</Button>
        </form>
      </Card>
    </>
  );
}
