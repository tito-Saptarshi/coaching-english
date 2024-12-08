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
import { unstable_noStore as noStore } from "next/cache";
async function getUserProfile(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

async function getMainFeatures() {
  noStore();
  return await prisma.mainFeatures.findMany();
}

export default async function HomepageButtons({ price }: { price: number }) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await getUserProfile(user?.id ?? "");
  const mainFeatures = await getMainFeatures();

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
            <Button
              className="w-full"
              disabled={!userData || userData.trial}
            >
              {!userData
                ? "Sign up to book Trial"
                : userData.enrolled
                ? "Trial Class Already Booked"
                : "Book Trial Class"}
            </Button>
          </Link>

          {/* {userData?.trial ? (
            <Link href="/trial-class">
              <Button className="w-full">Book Trial Class</Button>
            </Link>
          ) : (
            <Link href="/trial-class">
              <Button disabled className="w-full">
                {userData
                  ? "Trial Class Already Booked"
                  : "Sign up to book Trial"}
              </Button>
            </Link>
          )} */}
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
          <p className="text-xl font-semibold">${price} / month</p>
          {/* Feature List */}
          {/* <ul className="space-y-2 text-gray-500 dark:text-gray-400 pb-4">
            <li>✔️ 2 classes per week</li>
            <li>✔️ Personalized learning plans</li>
            <li>✔️ 24/7 access to course materials</li>
            <li>✔️ Weekly assignments & quizzes</li>
            <li>✔️ Direct support from instructors</li>
          </ul> */}

          <ul className="space-y-2 text-gray-500 dark:text-gray-400 pb-4">
            {mainFeatures.map((item) => (
              <li key={item.id}>✔️ {item.features}</li>
            ))}
          </ul>

          <Link href="/enroll">
            <Button
              className="w-full"
              disabled={!userData || userData.enrolled}
            >
              {!userData
                ? "Sign up to enroll"
                : userData.enrolled
                ? "Already enrolled"
                : "Enroll Now"}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
