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
  name: string;
  isVisible: boolean;
  status: string;
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
