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
  transactionImgUrl: string | null;
  optionalPaymentMessage: string | null;
  paymentDecline: boolean;
  declineMessage: string | null;
  newPayment: boolean;
};

export type TrialClass = {
  id: string;
  trialClass: string;
  optionalMessage: string;
  trialClassLink: string;
}

export type MainClass = {
  id: string;
  mainClass: string;
  optionalMessage: string;
}

export type PaymentDetails = {
  id: string;
  mainClass: string;
  optionalMessage: string;
}

export type BankDetails = {
  id: string;
  accountNumber?: string | null;
  accountName?: string | null;
  bankName?: string | null;
  ifscCode?: string | null;
  scannerQR?: string | null;
};