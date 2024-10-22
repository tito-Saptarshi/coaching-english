import { UpdateHomePage } from "@/app/components/admin/UpdateHomePage";
import { UpdateMainFeatures } from "@/app/components/admin/UpdateMainFeatures";
import prisma from "@/app/lib/db";
import { Separator } from "@/components/ui/separator";
import { unstable_noStore as noStore } from "next/cache";
async function getData() {
  noStore();
  return prisma.mainFeatures.findMany();
}

export default async function UpdateHome() {
  const data = await getData();
  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <UpdateHomePage />
      <Separator className="my-4 p-0.5 rounded-e-full" />
      <UpdateMainFeatures data={data}/>
    </div>
  );
}
