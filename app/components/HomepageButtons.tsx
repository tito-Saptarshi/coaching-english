import { Button } from "@/components/ui/button";
import {
  CardContent,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";
import prisma from "../lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default async function HomepageButtons() {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   const userData = await getUserProfile(user?.id);
  
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      <Card className="p-6">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold">Trial Class</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Experience a free trial class before enrolling in the full program.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">$0 - Free</p>
          <Link href="/trial-class">
            <Button className="w-full">Book Trial Class</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Normal Class Card with additional points */}
      <Card className="p-6">
        <CardHeader className="space-y-4">
          <CardTitle className="text-2xl font-bold">Regular Classes</CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Enroll in our regular classes to gain full access to all course
            materials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">$199 / month</p>
          {/* Feature List */}
          <ul className="space-y-2 text-gray-500 dark:text-gray-400 pb-4">
            <li>✔️ 2 classes per week</li>
            <li>✔️ Personalized learning plans</li>
            <li>✔️ 24/7 access to course materials</li>
            <li>✔️ Weekly assignments & quizzes</li>
            <li>✔️ Direct support from instructors</li>
          </ul>
          <Link href="/enroll">
            <Button className="w-full">Enroll Now</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
