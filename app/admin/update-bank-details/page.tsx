import { UpdateBankComp } from "@/app/components/admin/UpdateBankComp";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getUserProfile(userId: string) {
  noStore();
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}
export default async function UpdateBankDetails() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userData = await getUserProfile(user?.id);

  if (!user) {
    return redirect("/api/auth/login");
  }
  if (!userData?.admin) return redirect("/");

  const adminUser = userData?.admin;
  return <UpdateBankComp adminUser={adminUser}/>;
}
