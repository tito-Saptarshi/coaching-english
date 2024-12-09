
import { MainClassCard } from "@/app/components/admin/MainClassCard";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  noStore();
  return await prisma.mainClassDate.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

async function getUserProfile(userId:string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId
    }
  })
}

export default async function CreateMainClass() {
  const data = await getData();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await getUserProfile(user?.id);
  if (!user) {
    return redirect("/api/auth/login");
  }
  if(!userData?.admin)
    return redirect("/");
  // console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-3">Main Class</h1>
      <Separator className="bg-slate-600 mx-2 mr-3" />
      <MainClassCard mainData={data} />;
    </div>
  );
}
