import { cn } from '@/lib/utils';
import { SEAT_GRADE_COLORS, SEAT_STATUS_CLASSES } from '../../tailwind';
import { SeatStatus, SeatsType } from '../../types';

interface ZoneItemProps {
  seats: SeatsType[];
  selectedSeatIds: {
    zoneName: string;
    seat: SeatsType;
  }[];
}

export default function ZoneItem({ seats, selectedSeatIds }: ZoneItemProps) {
  const ids = selectedSeatIds.map(seats => seats.seat.id);
  return (
    <div className="flex flex-row gap-1">
      {seats.map(seat => {
        const gradeClass = SEAT_GRADE_COLORS[seat.name];
        const isBooked = seat.status === SeatStatus.BOOKED;
        const isSelected = ids.includes(seat.id);

        let statusClass = '';
        if (isBooked) {
          statusClass = SEAT_STATUS_CLASSES[SeatStatus.BOOKED];
        } else if (isSelected) {
          statusClass = 'bg-gray-600';
        } else {
          statusClass = SEAT_STATUS_CLASSES[SeatStatus.AVAILABLE]; // 선택 가능한 좌석
        }

        if (!seat || !seat.isVisible) {
          return (
            <div key={`empty-${seat.id}`} className="aspect-square h-auto w-1 rounded-t-sm p-0" />
          );
        }

        return (
          <div
            key={seat.id}
            className={cn(
              'relative aspect-square h-auto w-1 rounded-t-sm p-0',
              gradeClass, // 등급별 기본 색상
              statusClass // 상태별 추가 색상 또는 스타일 (선택/예약됨)
            )}
          ></div>
        );
      })}
    </div>
  );
}
