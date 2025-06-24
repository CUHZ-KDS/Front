import { Grade } from '@/types/showDetailType';

export interface ShowDescriptionProps {
  placeName: string;
  startDate: string;
  endDate: string;
  runningTimeMinute: number;
  minAge: number;
  grade: Grade[];
}

export interface ShowCalendarAndTimerProps {
  ticketDateTime: string;
  startDate: string;
  endDate: string;
  id: string;
  schedules: {
    id: string;
    showDate: string;
  }[];
}
