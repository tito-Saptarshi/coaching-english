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

// create and modify dates
export async function chooseTrialDates(formData: FormData, admin: boolean) {
  const trialDate = formData.get("date") as string;
  const message = formData.get("optionalMessage") as string;
  console.log("Trial Date:", trialDate);
  console.log("Message:", message);
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    console.log("chooseTrialDate");

    console.log(trialDate);
    console.log(message);

    if (!user) {
      return redirect("/api/auth/login");
    }
    if (!admin) {
      return redirect("/");
    }

    const data = await prisma.trailClassDate.create({
      data: {
        trialClass: trialDate,
        optionalMessage: message,
      },
    });
    revalidatePath(`/create-trial-class`);
    return {
      message: "yes",
      data, // Return the updated user data
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function deleteTrialDates(formData: FormData, admin: boolean) {
  const trialDate = formData.get("date") as string;
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return redirect("/api/auth/login");
    }

    if (!admin) {
      return redirect("/");
    }
    await prisma.trailClassDate.deleteMany({
      where: {
        trialClass: trialDate,
      },
    });

    await prisma.user.updateMany({
      where: {
        trialDate: trialDate,
      },
      data: {
        trialDate: "re-scheduled",
      },
    });
    revalidatePath(`/create-trial-class`);
    return {
      message: "yes",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function updateTrialDates(formData: FormData, admin: boolean) {
  try {
    const oldDate = formData.get("oldDate") as string;
    const date = formData.get("date") as string;
    const optionalMessage = formData.get("optionalMessage") as string;

    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return redirect("/api/auth/login");
    }
    if (!admin) {
      return redirect("/");
    }
    await prisma.trailClassDate.updateMany({
      where: {
        trialClass: oldDate,
      },
      data: {
        trialClass: date,
        optionalMessage: optionalMessage,
      },
    });

    await prisma.user.updateMany({
      where: {
        trialDate: oldDate,
      },
      data: {
        trialDate: date,
      },
    });
    revalidatePath(`/create-trial-class`);
    return {
      message: "yes",
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function chooseMainDates(formData: FormData, admin: boolean) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return redirect("/api/auth/login");
    }
    if (!admin) {
      return redirect("/");
    }

    const mainDate = formData.get("date") as string;
    const message = formData.get("message") as string;

    const data = await prisma.mainClassDate.create({
      data: {
        mainClass: mainDate,
      },
      select: {
        id: true,
        mainClass: true,
      },
    });

    revalidatePath(`/admin/create-class`);
    return {
      message: "yes",
      data, // Return the updated user data
    };
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function deleteMainDates(mainDate: string, admin: boolean) {
  try {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user) {
      return redirect("/api/auth/login");
    }

    if (!admin) {
      return redirect("/");
    }
    await prisma.mainClassDate.deleteMany({
      where: {
        mainClass: mainDate,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      message: "no",
    };
  }
}

export async function testServerAction(id: string) {
  await prisma.testModel.updateMany({
    where: {
      place: id,
    },
    data: {
      date: id,
    },
  });
}
