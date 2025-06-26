'use client';

import { useBookStore } from '../../store/bookStore';
import SeatItem from '@/components/seat/seat-item';
import { SeatStatus, SeatsType } from '../../types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

export default function SelectSeat() {
  const selectZone = useBookStore(state => state.selectZone);
  const selectSeats = useBookStore(state => state.selectSeats);
  const setSelectSeats = useBookStore(state => state.setSelectSeats);

  const handleClick = (seats: SeatsType) => {
    if (seats.status !== SeatStatus.AVAILABLE) return;
    if (!selectZone) return;

    const selectedSeatData = {
      zoneName: selectZone?.zoneName,
      seat: seats,
    };

    setSelectSeats(selectedSeatData);
  };
  return (
    <ul className="flex flex-col gap-2">
      {selectSeats?.map(seats => (
        <li key={seats.seat.id} className="flex items-center gap-2">
          <SeatItem zoneName={seats.zoneName} {...seats.seat} />
          <Button
            variant="outline"
            className="h-7 w-6 cursor-pointer"
            onClick={() => handleClick(seats.seat)}
          >
            <X size={15} />
          </Button>
        </li>
      ))}
    </ul>
  );
}
