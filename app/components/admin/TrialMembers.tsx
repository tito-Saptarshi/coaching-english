'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { User } from '@/app/lib/types'


// Mock data for students
const students = [
  { id: 1, name: 'Alice Johnson', phone: '123-456-7890', email: 'alice@example.com' },
  { id: 2, name: 'Bob Smith', phone: '234-567-8901', email: 'bob@example.com' },
  { id: 3, name: 'Charlie Brown', phone: '345-678-9012', email: 'charlie@example.com' },
  { id: 4, name: 'Diana Ross', phone: '456-789-0123', email: 'diana@example.com' },
  { id: 5, name: 'Ethan Hunt', phone: '567-890-1234', email: 'ethan@example.com' },
]

export default function TrialMembers({data} : {data : User[]}) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const copyEmails = async () => {
    const emails = data.map(student => student.email).join(', ')
    try {
      await navigator.clipboard.writeText(emails)
      setCopied(true)
      toast({
        title: "Emails copied!",
        description: "All student emails have been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy emails: ', err)
      toast({
        title: "Copy failed",
        description: "There was an error copying the emails. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Registered Students</CardTitle>
        <Button onClick={copyEmails} disabled={copied}>
          {copied ? 'Copied!' : 'Copy All Emails'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Email</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium">{student.fullName}</TableCell>
                  <TableCell>{student.phoneNumber}</TableCell>
                  <TableCell>{student.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      <Toaster />
    </Card>
  )
}