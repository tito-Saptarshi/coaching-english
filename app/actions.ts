"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import prisma from "./lib/db";
import { revalidatePath } from "next/cache";

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

export async function confirmPayment(userId: string, admin: boolean) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    return redirect("/api/auth/login");
  }
  if (!admin) {
    return redirect("/");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        verified: true,
        bought: true,
      },
      select: {
        id: true,
        verified: true,
        bought: true,
        payment: true,
        enrolled: true,
        trial: true,
        trialDate: true,
        validity: true,
      },
    });

    revalidatePath(`/users/${userId}`);
    return {
      message: "yes",
      updatedUser, // Return the updated user data
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

// admin can confirm payment details
// export async function confirmPayment(userId: string, admin: boolean) {
//   const { getUser } = getKindeServerSession();
//   const user = await getUser();
//   if (!user) {
//     return redirect("/api/auth/login");
//   }
//   if (!admin) {
//     return redirect("/");
//   }

//   try {
//     await prisma.user.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         verified: true,
//         bought: true,
//       },
//     });

//     revalidatePath(`/users/${userId}`);
//     return {
//       message: "yes",
//     };
//   } catch (error) {
//     console.log(error);
//     return {
//       message: "no",
//     };
//   }
// }

export async function enrollUser(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const fullName = formData.get("name") as string;
  const phoneNumber = formData.get("phone") as string;
  console.log("name and phone " + fullName + " " + phoneNumber);

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
        enrolled: true,
      },
    });

    return { success: true, redirectTo: "/payment" };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to book trial." };
  }
}

// user subscribe to the course(30 days)
export async function confirmPaymentUser(formData: FormData) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const purchaseDate = new Date();
  const validityDate = new Date(purchaseDate);
  validityDate.setDate(purchaseDate.getDate() + 30);

  if (!user) {
    return redirect("/api/auth/login");
  }

  const transactionId = formData.get("paymentId") as string;
  try {
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        paymentId: transactionId,
        validity: validityDate,
        payment: true,
      },
    });
    return { success: true, redirectTo: "/payment" };
  } catch (error) {
    console.log("confirmPaymentUser error:  " + error);
    return { success: false, error: "Failed to book trial." };
  }
}
