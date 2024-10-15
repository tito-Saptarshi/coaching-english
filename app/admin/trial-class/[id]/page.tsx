import TrialMembers from "@/app/components/admin/TrialMembers";
import prisma from "@/app/lib/db";
import { unstable_noStore as noStore } from "next/cache";

function replacePercentWithSpace(input: string): string {
  return input.replaceAll("%20", " ");
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
// https://ww13.gogoanimes.fi/bleach-dub-episode-280
export default async function MembersTrialClass({
  params,
}: {
  params: { id: string };
}) {
  const date = replacePercentWithSpace(params.id);
  const data = await getData(date);
  return (
    <div>
      {data.map((user) => (
        <div key={user?.id}>
          <h1>{user?.email}</h1>
        </div>
      ))}
      <TrialMembers data={data} />
    </div>
  );
}
