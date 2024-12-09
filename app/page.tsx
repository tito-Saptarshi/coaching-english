import { unstable_noStore as noStore } from "next/cache";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, Users, BookOpen } from "lucide-react";
import HomepageButtons from "@/app/components/HomepageButtons";
import prisma from "./lib/db";

async function getData() {
  noStore();
  const data = await prisma.classCard.findMany({
    orderBy: {
      date: "desc",
    },
    take: 1, // Limit the result to 1
  });
  return data[0];
}

async function getPrice() {
  noStore();
  const data = await prisma.price.findMany({
    orderBy: {
      date: "desc",
    },
    take: 1, // Limit the result to 1
  });
  return data[0];
}

export default async function Home() {
  // const classData = await getData();
  const data = await getData();
  const price = await getPrice();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Initial Navbar */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {data.heading}
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  {data.description}
                </p>
              </div>
              {/* Cards for trial class and normal class */}
              <HomepageButtons price={price.price} />
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Our Services
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Calendar className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Convenient Timing</h3>
                  <p className=" text-sm text-gray-500 dark:text-gray-400"> A carefully chosen batch time designed to maximize participation and suit most learners&apos; schedules, ensuring consistent learning progress.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Expert Instructors</h3>
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    Learn from certified trainers with years of experience in teaching English communication skills to diverse groups.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold text-center">
                    Comprehensive Curriculum
                  </h3>
                  <p className=" text-sm text-gray-500 dark:text-gray-400">
                    Gain fluency in spoken English with a step-by-step curriculum covering grammar, vocabulary, pronunciation, and
                    real-life conversations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}

        {/* <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Ready to Get Started?
            </h2>
            <div className="mx-auto max-w-sm space-y-4">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full">Request Information</Button>
            </div>
          </div>
        </section> */}
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2024 {data.heading}. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          {/* <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link> */}
          {/* <p className="text-xs hover:underline underline-offset-4">developer: saptarshi</p> */}
        </nav>
      </footer>
    </div>
  );
}
