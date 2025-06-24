export type Grade = {
  name: string;
  price: number;
};

export type ShowDetailType = {
  id: number;
  title: string;
  placeName: string;
  category: string;
  status: string;
  startDate: string;
  endDate: string;
  ticketDateTime: string;
  minAge: number;
  runningTimeMinute: number;
  intermissionTime: number;
  grade: Grade[];
  imgSource: string;
};

export type ShowDetailApiType = {
  code: string;
  message: string;
  data: ShowDetailType;
};

export type ShowSchedulesType = {
  schedules: { id: string; showDate: string }[];
};

export type ShowSchedulesApiType = {
  code: string;
  message: string;
  data: ShowSchedulesType;
};

export type ShowDetailAndSchedulesApiType = {
  detail: ShowDetailApiType;
  schedules: ShowSchedulesApiType;
};
