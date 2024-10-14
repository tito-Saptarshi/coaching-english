import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardContent, Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";
import { Calendar, Users, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Initial Navbar */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Transform Your Future with Acme Coaching
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Expert guidance to help you achieve your goals. Start your journey today.
                </p>
              </div>
              {/* Cards for trial class and normal class */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Trial Class Card */}
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
                      Enroll in our regular classes to gain full access to all course materials.
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
                  <h3 className="text-xl font-bold">Flexible Scheduling</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Choose from a variety of time slots that fit your busy lifestyle.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <Users className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Expert Instructors</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Learn from industry professionals with years of experience.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex flex-col items-center space-y-2 p-6">
                  <BookOpen className="h-12 w-12 text-primary" />
                  <h3 className="text-xl font-bold">Comprehensive Curriculum</h3>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                    Access a wide range of courses designed to meet your learning goals.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Ready to Get Started?
            </h2>
            <div className="mx-auto max-w-sm space-y-4">
              <Input placeholder="Enter your email" type="email" />
              <Button className="w-full">Request Information</Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">© 2024 Acme Coaching. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
