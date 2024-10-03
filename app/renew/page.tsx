"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Trophy, TrendingUp, Users, Zap, Sparkles } from "lucide-react";
import Link from "next/link";

export default function RenewSubscription() {
  const [renewalPeriod, setRenewalPeriod] = useState("6months");

  const renewalOptions = [
    { id: "6months", label: "6 Months", price: 24999 },
    { id: "12months", label: "12 Months", price: 44999 },
  ];

  const benefits = [
    { icon: Trophy, text: "Continue your academic progress" },
    { icon: TrendingUp, text: "Access to advanced modules and resources" },
    { icon: Users, text: "Stay with your peer group and mentors" },
    { icon: Zap, text: "Exclusive renewal discount" },
  ];

  const additionalPerks = [
    "Priority access to doubt-clearing sessions",
    "Personalized performance analysis",
    "Invitation to alumni networking events",
    "Early bird registration for competitive exams",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="max-w-3xl mx-auto relative">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl mb-4">
            Renew Your <span className="text-blue-600">Excel Academy</span>{" "}
            Subscription
          </h1>
          <p className="text-xl text-gray-600">
            Continue your journey to academic excellence
          </p>
        </div>

        <Card className="overflow-hidden shadow-2xl bg-white bg-opacity-80 backdrop-blur-sm">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center transform rotate-12">
            <Sparkles className="text-white w-12 h-12" />
          </div>
          <CardHeader className="relative z-10 border-b border-gray-200">
            <CardTitle className="text-3xl font-bold text-blue-600">
              Renewal Package
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Choose your preferred renewal period
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* <RadioGroup value={renewalPeriod} onValueChange={setRenewalPeriod} className="grid gap-4 sm:grid-cols-2">
              {renewalOptions.map((option) => (
                <div key={option.id}>
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
                  >
                    <span className="text-xl font-semibold mb-2">{option.label}</span>
                    <span className="text-3xl font-bold text-blue-600">₹{option.price.toLocaleString()}</span>
                  </Label>
                </div>
              ))}
            </RadioGroup> */}
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                1 Month Subscription
              </CardTitle>
              <CardDescription>
                <span className="text-4xl font-extrabold">$500</span> / month
              </CardDescription>
            </CardHeader>
            {/* <div className="mt-8 space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center bg-blue-50 p-4 rounded-lg shadow-sm transition-all duration-300 ease-in-out hover:shadow-md">
                  <benefit.icon className="h-8 w-8 text-blue-500 mr-4" />
                  <span className="text-lg text-gray-700">{benefit.text}</span>
                </div>
              ))}
            </div> */}

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Additional Renewal Perks:
              </h3>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {additionalPerks.map((perk, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-6 w-6 text-green-500 mr-3" />
                    <span className="text-gray-700">{perk}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 bg-gradient-to-r from-blue-100 to-indigo-100 p-6">
            <Link href={"/payment"}>
              <Button className="w-full text-xl py-6 bg-blue-600 hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg">
                Renew Now
              </Button>
            </Link>
            <p className="text-sm text-gray-600 text-center">
              * Your new subscription period will start immediately after your
              current one ends.
            </p>
          </CardFooter>
        </Card>

        <div className="mt-10 text-center">
          <p className="text-gray-700 text-lg">
            Need to discuss your renewal?{" "}
            <a
              href="#"
              className="font-medium text-blue-600 hover:text-blue-700 transition-colors duration-300 underline"
            >
              Contact your academic advisor
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
