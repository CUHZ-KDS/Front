export type ShowType = {
  id: string;
  title: string;
  place_name: string;
  category: string;
  start_date: string;
  end_date: string;
  img_source: string;
  ticket_date_time: number;
  min_age: number;
  running_time_minute: number;
  intermission_time: number;
};

export type ShowApiType = {
  code: string;
  message: string;
  data: ShowType[];
};
