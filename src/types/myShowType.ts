type SeatType = {
  seatId: number;
  zone: string;
  row: number;
  column: number;
};

type ShowType = {
  title: string;
  scheduleDateTime: string;
  place: string;
  img_sorce: string;
};
type ReservationsType = {
  id: number; // 임시 아이디
  reservationId: number;
  status: string;
  price: number;
  seat: SeatType;
  show: ShowType;
  reservedAt: string;
};
export type MyShowType = {
  reservations: ReservationsType[];
};

export type MyShowApiType = {
  code: string;
  message: string;
  data: MyShowType;
};
