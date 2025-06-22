'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';

interface ShowCalendarProps {
  /** 공연 시작일 (형식: 'YYYY-MM-DD') */
  start_date: string;
  /** 공연 종료일 (형식: 'YYYY-MM-DD') */
  end_date: string;
}

export default function ShowCalendar({ start_date, end_date }: ShowCalendarProps) {
  const startDate = new Date(start_date);
  const endDate = new Date(end_date);

  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  return (
    <Card className="border-none bg-inherit p-0">
      <CardContent>
        <Calendar
          disabled={date => {
            return date < startDate || date > endDate;
          }}
          // hideNavigation={true}
          showOutsideDays={false}
          className="w-full"
          classNames={{
            caption_label: 'text-[20px] m-auto font-semibold',
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
