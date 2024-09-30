import { AllUsersList } from "@/app/components/AllUsersList";
import prisma from "@/app/lib/db";

async function getData() {
  const data = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      phoneNumber: true,
      userName: true,
      fullName: true,
      trial: true,
      bought: true,
      verified: true,
      payment: true,
      trialDate: true,
      paymentId: true,
      admin: true,
    },
  });
  return data;
}

const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    subscribed: true,
    course: "Math 101",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    subscribed: false,
    course: "Physics 201",
    joinDate: "2023-02-20",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    subscribed: true,
    course: "Chemistry 301",
    joinDate: "2023-03-10",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    subscribed: true,
    course: "Biology 101",
    joinDate: "2023-04-05",
  },
  {
    id: 5,
    name: "Ethan Hunt",
    email: "ethan@example.com",
    subscribed: false,
    course: "Computer Science 201",
    joinDate: "2023-05-12",
  },
];

export default async function AllUsers() {

  const data = await getData();
  console.log(data);
  

  return <AllUsersList users={data} />;
}
