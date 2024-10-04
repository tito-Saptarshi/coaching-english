"use client";

import { User } from "@/app/lib/types";
import { Label } from "@/components/ui/label";
import { Calendar, CheckCircle, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

export function CourseInfo({ data }: { data: User | null }) {
  const [trial, setTrial] = useState(data?.trial);
  const [trialDate, setTrialDate] = useState(data?.trial);

  const [enrolled, setEnrolled] = useState(data?.trialDate);

  const [payment, setPayment] = useState(data?.payment);
  const [verified, setVerified] = useState(data?.verified);
  const [bought, setBought] = useState(data?.bought);
  const [validity, setValidity] = useState(data?.validity);

  useEffect(() => {
    setTrial(trial);
    setTrialDate(trialDate);
    setEnrolled(enrolled);
    setPayment(payment);
    setVerified(verified);
    setBought(bought);
    setValidity(validity);
  }, [data, trial, trialDate, enrolled, payment, verified, bought, validity]);

  if (!data) {
    return <div>No course information available.</div>;
  }
  return (
    <div className="space-y-2">
      <Label className="text-base">Course Information</Label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center space-x-2">
          <Label>Trial Class Taken</Label>
          {trial ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        {trialDate ? (
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{data?.trialDate}</span>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p>
              <span className="text-sm mr-1">: no trial date picked</span>
              <XCircle className="h-5 w-5 text-red-500 inline-block" />
            </p>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Label>Enrolled for Course</Label>
          {enrolled ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        {validity ? (
          <div className="flex items-center space-x-2">
            <p>
              Validity till :{"  "}
              <span className="text-sm">
                {" "}
                {validity?.toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p>
              <span className="text-sm mr-1">: no trial date picked</span>
              <XCircle className="h-5 w-5 text-red-500 inline-block" />
            </p>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <Label>Bought Course : </Label>
          {bought ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <p className="text-sm">
              <XCircle className="h-5 w-5 text-red-500 inline-block mr-1" />
              Yet not verified
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Label>Payment made : </Label>
          {payment ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Label>Payment verified</Label>
          {verified ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : (
            <XCircle className="h-5 w-5 text-red-500" />
          )}
        </div>
      </div>
    </div>
  );
}
