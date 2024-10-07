
import { MainClassCard } from "@/app/components/admin/MainClassCard";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";

async function getData() {
  return await prisma.mainClassDate.findMany({
    select: {
      id: true,
      mainClass: true,
      optionalMessage: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export default async function CreateMainClass() {
  const data = await getData();
  console.log(data);

  return (
    <div>
      <h1 className="text-3xl font-bold text-center pb-3">Main Class</h1>
      <Separator className="bg-slate-600 mx-2 mr-3" />
      <MainClassCard mainData={data} />;
    </div>
  );
}
