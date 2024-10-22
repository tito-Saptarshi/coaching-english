'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Users, UserPlus, Clipboard, DollarSign, Edit } from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const navItems = [
    { title: "Create Normal Classes", description: "Set up regular class schedules", icon: BookOpen, href: "/admin/create-main-class" },
    { title: "Create / Update Trial Classes", description: "Schedule trial sessions for new students", icon: Clipboard, href: "/admin/create-trial-class" },
    { title: "Trial Class Registrations", description: "View students registered for trial classes", icon: UserPlus, href: "/admin/trial-class" },
    { title: "All Students", description: "Manage and view all enrolled students", icon: Users, href: "/admin/dashboard/users" },
    { title: "Update Bank Details", description: "Here you can update your bank details and QR code", icon: DollarSign, href: "/admin/update-bank-details" },
    { title: "Update", description: "Update class name and trial/main class cards", icon: Edit, href: "/admin/update-home" },
  ]

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 lg:mb-10">Admin Dashboard</h1>
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {navItems.map((item, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <CardDescription className="min-h-[40px]">{item.description}</CardDescription>
              <Link href={item.href} passHref>
                <Button className="w-full mt-4">{item.title}</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}