import { CreateClassCom } from "@/app/components/admin/CreateClassCom";
import prisma from "@/app/lib/db";

async function getData() {
  return await prisma.trailClassDate.findMany({
    select: {
      id: true,
      trialClass: true,
      optionalMessage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CreateTrialClass() {
  const data = await getData();
  console.log(data);

  return <CreateClassCom trialData={data} />;
}
