import { getRemainingSeconds } from '@/lib/getRemainingSeconds';
import React, { useState } from 'react';
import ShowCalendar from '../calendar';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { ShowCalendarAndTimerProps } from '../../types';
import CountdownTimer from '@/components/countdownTimer';

export default function ShowCalendarAndTimer({
  endDate,
  id,
  startDate,
  ticketDateTime,
}: ShowCalendarAndTimerProps) {
  const router = useRouter();
  const [done, setDone] = useState(false);

  const time = ticketDateTime ? getRemainingSeconds(ticketDateTime) : 0;

  function bookingHandler(id: string) {
    router.push(`/book/${id}`);
  }
  return (
    <>
      {time > 0 && !done ? (
        <div className="flex h-full flex-col items-center">
          <h3 className="text-cetner text-2xl font-bold">티켓팅 까지</h3>
          <div className="flex flex-1 items-center justify-center">
            <CountdownTimer initialSeconds={time} onComplete={() => setDone(true)} />
          </div>
        </div>
      ) : (
        <>
          <ShowCalendar start_date={startDate} end_date={endDate} />
          <Button
            onClick={() => bookingHandler(id)}
            className="absolute right-6 bottom-0 h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
            variant="ff"
          >
            좌석 선택하기
          </Button>
        </>
      )}
    </>
  );
}
