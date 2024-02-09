export type Payment = {
  id: number;
  appointmentId: number;
  amount: number;
  fee: number;
  currency: string;
  success: boolean;
  refunded: boolean;
};
