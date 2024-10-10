import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PaymentsForm } from "../components/PaymentsForms";
import prisma from "../lib/db";
import { redirect } from "next/navigation";

async function getData(userId: string) {
  return await prisma.bankDetails.findUnique({
    where: {
      id: userId,
    },
  });
}

export default async function Payment() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const paymentData = await getData(user.id);
  if (!paymentData) {
    return <div>No payment details found. Please add your bank information.</div>;
  }
  return <PaymentsForm  paymentData={paymentData} />;
}
