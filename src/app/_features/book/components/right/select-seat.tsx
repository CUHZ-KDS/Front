'use client';

import { useBookStore } from '../../store/bookStore';

export default function SelectSeat() {
  const selectSeats = useBookStore(state => state.selectSeats);

  return (
    <ul>
      {selectSeats?.map(seat => (
        <li key={seat.seat.id} className="flex items-center gap-2">
          <div>{seat.zoneName} 구역</div>
          <div className="h-5 w-5 rounded-sm bg-red-600"></div>
          <div>
            {seat.seat.row} {seat.seat.column}
          </div>
          <div>99,000 원</div>
        </li>
      ))}
    </ul>
  );
}
