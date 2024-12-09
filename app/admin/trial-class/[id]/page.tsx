import TrialMembers from "@/app/components/admin/TrialMembers";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

function replacePercentWithSpace(input: string): string {
  return input.replaceAll("%20", " ");
}
function replacecolonWithSpace(input: string): string {
  return input.replaceAll("%3A", ":");
}
async function getData(date: string) {
  noStore();
  const data = await prisma.user.findMany({
    where: {
      trialDate: date,
    },
  });
  return data;
}

export default async function MembersTrialClass({
  params,
}: {
  params: { id: string };
}) {
  const paramsDate = replacePercentWithSpace(params.id);
  const paramsColon = replacecolonWithSpace(paramsDate);
  const data = await getData(paramsColon);
  console.log("data" + data);
  console.log("paramsData" + paramsDate);
  console.log("paramsDataColon " + paramsColon);
  
  return (
    <div>
      {/* {data.map((data) => (
        <div key={data?.id}>
          <h1>{data?.email}</h1>
        </div>
      ))} */}
      <TrialMembers data={data} />
    </div>
  );
}
