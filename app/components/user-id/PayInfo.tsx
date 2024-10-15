"use client";

import { User } from "@/app/lib/types";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Loader } from "lucide-react";
import { useState } from "react";

export function PayInfo({
  data,
  verified,
  handleConfirmPayment,
}: {
  data: User | null;
  enrolled: boolean | null;
  payment: boolean | null;
  verified: boolean | null;
  bought: boolean | null;
  handleConfirmPayment: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);

  // const handleClick = () => {
  //   setisLaoding(true);
  //   confirmPayment(data?.id || "", true);

  //   setEnrolled(!enrolled);
  //   setPayment(!payment);
  //   setVerified(!verified);
  //   setBought(!bought);
  //   setisLaoding(false);
  // };

  const handleClick = async () => {
    setIsLoading(true);
    await handleConfirmPayment();
    setIsLoading(false);
  };

  if (!data) {
    return <div>No course information available.</div>;
  }
  return (
    <CardFooter>
      {/* <p>payemnt verified : {verified ? <p>yes</p> : <p> no </p>}</p> */}

      <Button
        variant="default"
        className="w-full"
        onClick={() => handleClick()}
        disabled={isLoading || false}
      >
        {isLoading ? <Loader className="animate-spin" /> : "Verify Payment"}
      </Button>
    </CardFooter>
  );
}
