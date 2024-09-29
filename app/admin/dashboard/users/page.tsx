"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, MoreHorizontal, Search } from "lucide-react"

// Mock data for demonstration
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", subscribed: true, course: "Math 101", joinDate: "2023-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", subscribed: false, course: "Physics 201", joinDate: "2023-02-20" },
  { id: 3, name: "Charlie Brown", email: "charlie@example.com", subscribed: true, course: "Chemistry 301", joinDate: "2023-03-10" },
  { id: 4, name: "Diana Ross", email: "diana@example.com", subscribed: true, course: "Biology 101", joinDate: "2023-04-05" },
  { id: 5, name: "Ethan Hunt", email: "ethan@example.com", subscribed: false, course: "Computer Science 201", joinDate: "2023-05-12" },
]

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterSubscribed, setFilterSubscribed] = useState<boolean | null>(null)

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(user => 
    filterSubscribed === null ? true : user.subscribed === filterSubscribed
  )

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Coaching Institute Admin Dashboard</h1>
      
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Filter by Status
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setFilterSubscribed(null)}>All</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterSubscribed(true)}>Subscribed</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFilterSubscribed(false)}>Not Subscribed</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Subscribed</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.subscribed ? "Yes" : "No"}</TableCell>
                <TableCell>{user.course}</TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Edit User</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}