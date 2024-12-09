import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ExternalLinkIcon } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import prisma from "../lib/db";

async function getData(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function getClasses() {
  noStore();
  return await prisma.mainClassDate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// interface Class {
//   id: string;
//   date: string;
//   link: string;
//   message: string;
// }

// const classes: Class[] = [
//   {
//     id: "1",
//     date: "2023-06-15T10:00:00Z",
//     link: "https://zoom.us/j/1234567890",
//     message: "Introduction to React Hooks",
//   },
//   {
//     id: "2",
//     date: "2023-06-17T14:00:00Z",
//     link: "https://zoom.us/j/0987654321",
//     message: "Advanced State Management with Redux",
//   },
//   {
//     id: "3",
//     date: "2023-06-20T09:00:00Z",
//     link: "https://zoom.us/j/1122334455",
//     message: "Building Responsive Layouts with CSS Grid",
//   },
//   // Add more classes as needed
// ];

export default async function UpcomingClasses() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  const userData = await getData(user.id);
  if (!userData?.verified) return redirect("/payment");

  const classes = await getClasses();

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Upcoming Classes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {classes.map((classItem) => (
          <Card key={classItem.id}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CalendarIcon className="mr-2" />
                {classItem.mainClass}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="pb-1"> Class Link - {classItem.link}</p>
              {classItem.optionalMessage && (
                <CardDescription className="mb-4">
                  Message - {classItem.optionalMessage}
                </CardDescription>
              )}
              <Button asChild>
                <a
                  href={
                    classItem.link.startsWith("http")
                      ? classItem.link
                      : `https://${classItem.link}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <ExternalLinkIcon className="mr-2 h-4 w-4" /> Join Class
                </a>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
