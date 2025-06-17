'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { ko } from 'date-fns/locale';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';

{
  /* 캘린더는 추후 Detail 정보와 연동되어야 함 */
}
{
  /* 날짜는 API에서 받아온 데이터에서 선택 가능 */
}
export default function ShowCalendar() {
  return (
    <Card className="border-none bg-inherit p-0">
      <CardContent>
        <Calendar
          hideNavigation={true}
          showOutsideDays={false}
          className="w-full"
          classNames={{
            caption_label: 'text-[28px] m-auto font-semibold',
            month_caption: 'flex',
          }}
          mode="single"
          locale={ko}
          formatters={{
            formatCaption: month => format(month, 'yyyy년 M월', { locale: ko }),
          }}
        />
        <Button
          className="absolute right-6 bottom-0 h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
          variant="ff"
        >
          좌석 선택하기
        </Button>
      </CardContent>
    </Card>
  );
}
