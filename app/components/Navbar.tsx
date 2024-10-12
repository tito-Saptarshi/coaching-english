import { Button } from "@/components/ui/button";
import {
  getKindeServerSession,
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { UserDropdown } from "./UserDropdown";
import prisma from "../lib/db";
import { unstable_noStore as noStore } from "next/cache";
async function getData(userId: string) {
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      admin: true,
    },
  });
  return data;
}

export async function Navbar() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const admin = await getData(user?.id?? "");
  // console.log("user " + user.email + user.id + user.username);
  console.log(admin + "admin");
  
  
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center">
      <Link className="flex items-center justify-center " href="/">
        <GraduationCap className="h-6 w-6" />
        <span className="sr-only">Acme Coaching</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 mr-2">
        <Link
          className="text-sm font-medium hover:underline underline-offset-4"
          href="/"
        >
          Contact
        </Link>
        {user && admin?.admin ? (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 "
            href="/admin/dashboard/users"
          >
            admin
          </Link>
        ) : (
          <Link
            className="text-sm font-medium hover:underline underline-offset-4 hidden"
            href="/"
          >
            admin2
          </Link>
        )}
      </nav>

      {user ? (
        <UserDropdown userImage={user.picture} />
      ) : (
        <div className="flex items-center gap-x-4">
          <Button variant="secondary" asChild>
            <RegisterLink>Sign up</RegisterLink>
          </Button>
          <Button asChild>
            <LoginLink>Log in</LoginLink>
          </Button>
        </div>
      )}
    </header>
  );
}
