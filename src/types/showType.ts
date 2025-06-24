export type ShowType = {
  id: string;
  title: string;
  placeName: string;
  category: string;
  startDate: string;
  endDate: string;
  imgSource: string;
  ticketStartDateTime: number;
  minAge: number;
  runningTimeMinute: number;
  intermissionTime: number;
};

export type ShowApiType = {
  code: string;
  message: string;
  data: ShowType[];
};
