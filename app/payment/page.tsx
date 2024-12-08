import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { PaymentsForm } from "../components/PaymentsForms";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData() {
  
  noStore();
  const data =  await prisma.bankDetails.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 1, // Limit the result to 1
  });

  return data[0];

}

async function getPrice() {
  noStore();
  const data =  await prisma.price.findMany({
    orderBy: {
      date: 'desc',
    },
    take: 1, // Limit the result to 1
  });
  return data[0];
}

export default async function Payment() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }

  const paymentData = await getData();
  const paymentPrice = await getPrice();
  if (!paymentData) {
    return <div>No payment details found. Please add your bank information.</div>;
  }
  return <PaymentsForm  paymentData={paymentData} paymentPrice={paymentPrice.price}/>;
}
