import { CreateClassCom } from "@/app/components/admin/CreateClassCom";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

async function getData() {
  return await prisma.trailClassDate.findMany({
    select: {
      id: true,
      trialClass: true,
      optionalMessage: true,
      trialClassLink: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getUserProfile(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default async function CreateTrialClass() {
  const data = await getData();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await getUserProfile(user?.id);
  if (!user) {
    return redirect("/api/auth/login");
  }
  if (!userData?.admin) return redirect("/");
  // console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-3">Trial Class</h1>
      <Separator className="bg-slate-600 mx-2 mr-3" />
      <CreateClassCom trialData={data} />;
    </div>
  );
}
