// enum GradeName {
//   vip = 'VIP석',
//   r = 'R석',
//   s = 'S석',
//   a = 'A석',
// }

type Grade = {
  name: string;
  price: number;
};

export type ShowDetailType = {
  id: number;
  title: string;
  place_name: string;
  category: string;
  status: string;
  start_date: string;
  end_date: string;
  ticket_date_time: string;
  min_age: number;
  running_time_minute: number;
  intermission_time: number;
  grade: Grade[];
};

export type ShowDetailApiType = {
  code: string;
  message: string;
  data: ShowDetailType;
};
