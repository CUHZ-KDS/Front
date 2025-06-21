import { cn } from '@/lib/utils';
import { ZoneType } from '../../dummy';
import { groupAndSortSeats } from '../utils/seatUtils';

interface ZoneItemProps {
  zoneData: ZoneType;
  isSelected: boolean;
  onSelect: (zone: ZoneType) => void;
}

export default function ZoneItem({ isSelected, onSelect, zoneData }: ZoneItemProps) {
  const groupSeats = groupAndSortSeats(zoneData.seats);
  return (
    <div
      onClick={() => onSelect(zoneData)}
      className={cn(
        'flex h-full flex-1 cursor-pointer flex-col rounded-sm p-1 hover:outline',
        isSelected && 'outline outline-red-600'
      )}
    >
      <h3 className="text-center font-bold">{zoneData.zoneName} 구역</h3>
      <div className="flex flex-col gap-1">
        {groupSeats.map((seats, i) => (
          <div key={i} className="flex flex-row gap-1">
            {seats.map(seat => (
              <button
                key={seat.id}
                className={cn(
                  'aspect-square h-1 w-1 p-0',
                  seat.status === 'available' && 'cursor-pointer bg-white hover:bg-gray-400',
                  seat.status === 'book' && 'bg-[#979797]'
                )}
              ></button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
