export interface ReservationsApiType {
  code: string;
  message: string;
  data: ReservationsDataType;
}
export interface ReservationsDataType {
  orderToken: string;
  totalAmount: number;
  reservedSeatIds: number[];
}

export interface ApproveApiType {
  code: string;
  message: string;
  data: ApproveDataType;
}
export interface ApproveDataType {
  orderToken: string;
  approvedAt: string;
  amonut: number;
  paymentMethod: string;
}

export interface CancelApiType {
  code: string;
  message: string;
  data: null;
}
