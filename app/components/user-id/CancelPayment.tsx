import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
export function CancelPayment({
  userId,
  cancelPayment,
}: {
  userId: string;
  cancelPayment: () => void;
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [declineReason, setDeclineReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleClick = async () => {
    setIsLoading(true);
    await cancelPayment();
    setIsLoading(false);
  };


  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="m-2 w-1/2 mx-auto justify-center">Decline</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Decline Payment</DialogTitle>
          </DialogHeader>
          <form action="">
            <div className="space-y-4">
              <p>Are you sure you want to decline the payment?</p>
              <div>
                <Label htmlFor="reason" className="my-2">
                  Reason for declining
                </Label>
                <Textarea
                  id="reason"
                  placeholder="Enter reason here..."
                  className="m-2"
                  name="reason"
                  value={declineReason}
                  onChange={(e) => setDeclineReason(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="destructive">
                Confirm Decline
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
