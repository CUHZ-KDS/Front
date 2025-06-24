'use client';

import { useBookStore } from '../../store/bookStore';

export default function SelectSeat() {
  const selectSeats = useBookStore(state => state.selectSeats);
  return (
    <ul>
      {selectSeats?.map(seats => (
        <li key={seats.seat.id} className="flex items-center gap-2">
          <div>{seats.zoneName}</div>
          <div className="h-5 w-5 rounded-sm bg-red-600"></div>
          <div>
            {seats.seat.row} {seats.seat.col}
          </div>
          <div>
            <p>{seats.seat.price.toLocaleString()} 원</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
