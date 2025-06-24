import React, { useState } from 'react';
import { getRemainingSeconds } from '@/lib/getRemainingSeconds';
import { useRouter } from 'next/navigation';
import { ShowCalendarAndTimerProps } from '../../types';
import { format } from 'date-fns';
import TimerSection from './timer-section';
import CalendarBookingSection from './calendar-booking-section';

export default function ShowCalendarAndTimer({
  endDate,
  startDate,
  ticketDateTime,
  schedules,
}: ShowCalendarAndTimerProps) {
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const time = ticketDateTime ? getRemainingSeconds(ticketDateTime) : 0;

  const handleClick = () => {
    if (selectedDate) {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');

      const findItem = schedules.find(schedule => schedule.showDate === formattedDate);
      router.push(`/book/${findItem?.id}`);
    }
  };

  return (
    <>
      {time > 0 && !done ? (
        <TimerSection time={time} onComplete={() => setDone(true)} />
      ) : (
        <CalendarBookingSection
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          schedules={schedules}
          endDate={endDate}
          startDate={startDate}
          hanldeClick={handleClick}
        />
      )}
    </>
  );
}
