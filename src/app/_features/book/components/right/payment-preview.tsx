import { Button } from '@/components/ui/button';
import { useBookStore } from '../../store/bookStore';

interface PaymentPreviewProps {
  handlePayment: () => void;
}

export default function PaymentPreview({ handlePayment }: PaymentPreviewProps) {
  const selectSeats = useBookStore(state => state.selectSeats);

  const totalPrcie = selectSeats?.reduce((acc, cur) => acc + cur.seat.price, 0) || 0;

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-end text-lg">
        {totalPrcie.toLocaleString()} 원
      </div>
      <Button
        disabled={!totalPrcie}
        className="ml-auto h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
        variant="ff"
        onClick={handlePayment}
      >
        결제하기
      </Button>
    </div>
  );
}
