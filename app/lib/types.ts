export type User = {
  id: string;
  email: string;
  phoneNumber?: string | null;
  userName?: string | null;
  fullName: string;
  trial: boolean;
  trialDate?: string | null;
  enrolled: boolean;
  paymentId?: string | null;
  payment: boolean;
  verified: boolean;
  bought: boolean;
  validity?: Date | null; 
  admin: boolean;
};

export type TrialClass = {
  id: string;
  trialClass: string;
  optionalMessage: string;
}
