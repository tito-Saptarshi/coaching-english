export type User = {
  id: string;
  email: string;
  phoneNumber?: string | null;
  userName?: string | null;
  fullName: string;
  trial: boolean;
  bought: boolean;
  verified: boolean;
  payment: boolean;
  admin: boolean;
  trialDate?: string | null;
  paymentId?: string | null;
};
