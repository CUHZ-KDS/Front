import { Button } from '@/components/ui/button';
import ShowCalendar from '../calendar';

interface CalendarBookingSectionProps {
  startDate: string;
  endDate: string;
  schedules: { id: string; showDate: string }[];
  setSelectedDate: (date: Date | undefined) => void;
  selectedDate: Date | undefined;
  hanldeClick: () => void;
}

export default function CalendarBookingSection({
  endDate,
  hanldeClick,
  schedules,
  selectedDate,
  setSelectedDate,
  startDate,
}: CalendarBookingSectionProps) {
  return (
    <>
      <ShowCalendar
        start_date={startDate}
        end_date={endDate}
        schedules={schedules}
        setSelectedDate={setSelectedDate}
        selectedDate={selectedDate}
      />
      <Button
        disabled={!selectedDate}
        onClick={hanldeClick}
        className="absolute right-6 bottom-0 h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
        variant="ff"
      >
        좌석 선택하기
      </Button>
    </>
  );
}
