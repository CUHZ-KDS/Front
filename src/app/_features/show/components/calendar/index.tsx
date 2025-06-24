'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

interface ShowCalendarProps {
  start_date: string;
  end_date: string;
  schedules: { id: string; showDate: string }[];
  selectedDate: Date | undefined;
  setSelectedDate: (date: Date | undefined) => void;
}

export default function ShowCalendar({
  start_date,
  end_date,
  schedules,
  selectedDate,
  setSelectedDate,
}: ShowCalendarProps) {
  // 서버에서 받아온 스케쥴 데이터
  const allowedDates = schedules.map(schedule => new Date(schedule.showDate));
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);

  return (
    <Card className="border-none bg-inherit p-0">
      <CardContent>
        <Calendar
          selected={selectedDate}
          onSelect={setSelectedDate}
          disabled={date => {
            const isOutsideRange = date < startDate || date > endDate;

            const isAllowedDate = allowedDates.some(
              allowedDate =>
                allowedDate.getFullYear() === date.getFullYear() &&
                allowedDate.getMonth() === date.getMonth() &&
                allowedDate.getDate() === date.getDate()
            );

            return isOutsideRange || !isAllowedDate;
          }}
          // hideNavigation={true}
          showOutsideDays={false}
          className="w-full"
          classNames={{
            caption_label: 'text-[20px] m-auto font-semibold',
            today: '',
          }}
          mode="single"
          locale={ko}
          formatters={{
            formatCaption: month => format(month, 'yyyy년 M월', { locale: ko }),
          }}
        />
      </CardContent>
    </Card>
  );
}
