export enum SeatGrade {
  S = 'S석',
  R = 'R석',
  VIP = 'VIP석',
}

export enum SeatStatus {
  AVAILABLE = 'available',
  BOOKED = 'booked',
}

export interface AllSeatsApiType {
  code: string;
  message: string;
  data: AllSeatsDataType;
}

export interface AllSeatsDataType {
  placeId: string;
  showId: string;
  showScheduleId: string;
  showTitle: string;
  seats: SeatsType[];
  zones: ZoneType[];
}

export interface SeatsType {
  zoneId: string;
  id: string;
  row: number;
  col: number;
  name: SeatGrade;
  isVisible: boolean;
  status: SeatStatus;
  price: number;
}

export interface ZoneType {
  zoneId: string;
  zoneName: string;
}

export interface GroupSortType {
  zoneName: string;
  zoneId: string;
  seats: SeatsType[][];
}

export interface ReservationType {
  orderToken: string;
  totalAmount: number;
  reservedSeatIds: number[];
}

export interface ReservationsApiType {
  code: string;
  message: string;
  data: ReservationType;
}

export interface PaymentViewProps extends ReservationType {
  open: boolean;
  onOpenChange: () => void;
  showTitle: string;
}

export interface PaymentResponseData {
  paymentKey: string;
  orderId: string;
  amount: {
    value: number;
    currency: string;
  };
}
