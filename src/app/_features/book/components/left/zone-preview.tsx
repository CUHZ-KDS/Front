import { useBookStore } from '../../store/bookStore';
import { memo } from 'react';
import { AllSeatsDataType } from '../../types';
import { cn } from '@/lib/utils';
import { groupAndSortSeats } from '../utils/seatUtils';
import ZoneItem from './zone-item';

export default memo(function ZonePreview({ seatsData }: { seatsData: AllSeatsDataType }) {
  const setSelectZone = useBookStore(state => state.setSelectZone);
  const selectedZone = useBookStore(state => state.selectZone);
  const selectSeats = useBookStore(state => state.selectSeats);

  const groupZone = groupAndSortSeats(seatsData);

  return (
    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-2">
      {groupZone.map(zone => (
        <div
          key={zone.zoneId}
          className={cn(
            'flex cursor-pointer flex-col gap-1 rounded-sm p-1 hover:outline',
            selectedZone?.zoneId === zone.zoneId && 'outline-1'
          )}
          onClick={() => setSelectZone(zone)}
        >
          <h3 className="text-center text-sm">{zone.zoneName}</h3>
          {zone.seats.map((seats, i) => (
            <ZoneItem key={zone.zoneId + i} seats={seats} selectedSeatIds={selectSeats} />
          ))}
        </div>
      ))}
    </div>
  );
});
