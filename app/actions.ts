"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";

export async function bookTrial(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const fullName = formData.get("name") as string;
  const phoneNumber = formData.get("phone") as string;
  const trialDate = formData.get("subject") as string;

  if (!user) {
    return redirect("/api/auth/login");
  }
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        fullName: fullName,
        phoneNumber: phoneNumber,
        trial: true,
        trialDate: trialDate,
      },
    });

    return { success: true, redirectTo: "/" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to book trial." };
  }
}
