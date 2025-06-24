'use client';
import { cn } from '@/lib/utils';
import { useBookStore } from '../../store/bookStore';
import { SeatsType } from '../../types';

export default function SelectZone() {
  const selectZone = useBookStore(state => state.selectZone);
  const selectSeats = useBookStore(state => state.selectSeats);
  const setSelectSeats = useBookStore(state => state.setSelectSeats);

  if (!selectZone) {
    return (
      <div className="flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold">구역을 선택해주세요.</h3>
      </div>
    );
  }

  const handleClick = (seat: SeatsType) => {
    if (seat.status !== 'available') return;

    const slectSeatData = {
      zoneName: selectZone?.zoneName,
      seat,
    };
    setSelectSeats(slectSeatData);
  };

  const selectedSeatIds = selectSeats.map(seat => seat.seat.id);

  return (
    <>
      <h3 className="text-center text-lg">{selectZone?.zoneName}</h3>
      <div className="flex flex-col gap-1">
        {selectZone.seats.map((seats, i) => (
          <div key={i} className={cn('flex flex-row gap-1')}>
            {seats.map(seat => (
              <button
                onClick={() => handleClick(seat)}
                key={seat.id}
                className={cn(
                  'aspect-square h-auto w-5 p-0',
                  seat.isVisible &&
                    seat.status === 'available' &&
                    'cursor-pointer bg-white hover:bg-gray-400',
                  seat.isVisible && seat.status === 'booked' && 'bg-[#979797]',
                  selectedSeatIds.includes(seat.id) && 'bg-red-600'
                )}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
