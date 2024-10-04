"use client";

import { confirmPayment } from "@/app/actions";
import { User } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

export function PayInfo({ data }: { data: User | null }) {
  const [enrolled, setEnrolled] = useState(data?.enrolled);

  const [payment, setPayment] = useState(data?.payment);
  const [verified, setVerified] = useState(data?.verified);
  const [bought, setBought] = useState(data?.bought);

  const [isLoading, setisLaoding] = useState(false);

  useEffect(() => {
    setEnrolled(enrolled);
    setPayment(payment);
    setVerified(verified);
    setBought(bought);
  }, [data, enrolled, payment, verified, bought]);

  const handleClick = () => {
    setisLaoding(true);
    confirmPayment(data?.id || "", true);

    setEnrolled(!enrolled);
    setPayment(!payment);
    setVerified(!verified);
    setBought(!bought);
    setisLaoding(false);
  };

  if (!data) {
    return <div>No course information available.</div>;
  }
  return (
    <CardFooter>
      {data?.payment ? (
        <Button
          variant="default"
          className="w-full"
          onClick={() => handleClick()}
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="animate-spin" /> // Show loader when isLoading is true
          ) : (
            "Verify Payment"
          )}
        </Button>
      ) : (
        <Button disabled variant="outline" className="w-full">
          Payment not made yet
        </Button>
      )}
    </CardFooter>
  );
}
