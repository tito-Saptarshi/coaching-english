import { CreateClassCom } from "@/app/components/admin/CreateClassCom";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";

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

export default async function CreateTrialClass() {
  const data = await getData();
  // console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-3">Trial Class</h1>
      <Separator className="bg-slate-600 mx-2 mr-3" />
      <CreateClassCom trialData={data} />;
    </div>
  );
}
