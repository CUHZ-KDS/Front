'use client';
import { Button } from '@/components/ui/button';
import { useBookStore } from '../../store/bookStore';

interface BookedPreviewProps {
  handleBook: (ids: string[]) => void;
}

// 예약 API 필요
export default function BookedPreview({ handleBook }: BookedPreviewProps) {
  const selectSeats = useBookStore(state => state.selectSeats);
  const totalPrcie = selectSeats?.reduce((acc, cur) => acc + cur.seat.price, 0) || 0;

  const handleBooking = () => {
    const showSeatMappingIds = selectSeats.map(seat => seat.seat.id);
    handleBook(showSeatMappingIds);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-end text-lg">
        {totalPrcie.toLocaleString()} 원
      </div>
      <Button
        disabled={!totalPrcie}
        className="ml-auto h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
        variant="ff"
        onClick={handleBooking}
      >
        예매하기
      </Button>
    </div>
  );
}
