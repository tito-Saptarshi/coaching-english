import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TrialClassForm } from "../components/TrialClassForm";
import { redirect } from "next/navigation";
import prisma from "../lib/db";

async function getData(userId: string | undefined) {
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      email: true,
      fullName: true,
      userName: true,
      phoneNumber: true,
      trial: true,
      bought: true,
    },
  });
  return data;
}

export default async function TrialClass() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const data = await getData(user?.id);
  if (!user) return redirect("/api/auth/login");

//   if (data?.trial || data?.bought) return "/";

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
        <TrialClassForm />
      </div>
    </div>
  );
}
