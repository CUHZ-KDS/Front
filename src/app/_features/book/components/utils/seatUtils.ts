import { AllSeatsDataType, GroupSortType, SeatsType } from '../../types';

export const groupAndSortSeats = (seats: AllSeatsDataType): GroupSortType[] => {
  const zoneMap = new Map<string, string>();
  seats?.zones?.forEach(zone => {
    zoneMap.set(zone.zoneId, zone.zoneName);
  });

  const groupedSeatsByZone = new Map<string, SeatsType[]>();
  seats?.seats?.forEach(seat => {
    if (!groupedSeatsByZone.has(seat.zoneId)) {
      groupedSeatsByZone.set(seat.zoneId, []);
    }
    groupedSeatsByZone.get(seat.zoneId)?.push(seat);
  });

  const finalGroupedData: GroupSortType[] = Array.from(groupedSeatsByZone.entries()).map(
    ([zoneId, seatsInZone]) => {
      // 해당 zoneId의 zoneName을 가져옵니다.
      const zoneName = zoneMap.get(zoneId) || '알 수 없는 구역'; // zoneName이 없을 경우 대비

      // row별로 좌석들을 다시 그룹화합니다.
      const seatsByRow = new Map<number, SeatsType[]>();
      seatsInZone?.forEach(seat => {
        if (!seatsByRow.has(seat.row)) {
          seatsByRow.set(seat.row, []);
        }
        seatsByRow.get(seat.row)?.push(seat);
      });

      // row 순서대로 정렬된 2중 배열을 만듭니다.
      const sortedRows: SeatsType[][] = Array.from(seatsByRow.entries())
        .sort((a, b) => a[0] - b[0])
        .map(([, rowSeats]) => rowSeats);

      return {
        zoneName: zoneName,
        zoneId: zoneId,
        seats: sortedRows,
      };
    }
  );

  return finalGroupedData;
};
