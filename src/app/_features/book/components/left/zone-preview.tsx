import { bookingDummyData } from '../../dummy';
import { useBookStore } from '../../store/bookStore';
import { memo } from 'react';
import ZoneItem from './zone-item';

export default memo(function ZonePreview() {
  const setSelectZone = useBookStore(state => state.setSelectZone);
  const selectedZone = useBookStore(state => state.selectZone);

  return (
    <div className="grid flex-1 grid-cols-2 grid-rows-2 gap-2">
      {bookingDummyData.map(stat => (
        <ZoneItem
          key={stat.zoneId}
          isSelected={selectedZone?.zoneId === stat.zoneId}
          onSelect={setSelectZone}
          zoneData={stat}
        />
      ))}
    </div>
  );
});
