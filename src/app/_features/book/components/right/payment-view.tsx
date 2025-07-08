'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { PaymentViewProps } from '../../types';
import { useBookStore } from '../../store/bookStore';
import dynamic from 'next/dynamic';
import Loading from '@/components/loading.tsx';
import PaymentSummaryCard from './payment/payment-summary-card';
import TossPaymentForm from './payment/toss-playment-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const NoSSRCountdownTimer = dynamic(() => import('@/components/countdownTimer'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function PaymentView({
  open,
  onOpenChange,
  orderToken,
  totalAmount,
  showTitle,
}: PaymentViewProps) {
  const selectSeats = useBookStore(state => state.selectSeats);
  const totalPrcie = selectSeats?.reduce((acc, cur) => acc + cur.seat.price, 0) || 0;
  const router = useRouter();

  {
    /* 결제에 성공하면 'my page'로 이동됩니다. */
  }
  const handlePaymentSuccess = () => {
    toast.success('예매가 완료되었습니다.');
    router.replace('/my');
  };

  {
    /* '결제 창'을 닫습니다. */
  }
  const handlePaymentError = () => {
    const container = document.querySelector('#__tosspayments_payment-gateway_dimmer__');
    const iframe = document.querySelector('iframe[src*="payment-gateway"]');
    if (container || iframe) {
      container?.remove();
      iframe?.remove();
    }
  };

  {
    /* '결제 창'과 '예매 정보 확인 창'을 닫습니다. */
  }
  const handleCountdownComplete = () => {
    onOpenChange();
    handlePaymentError();
    toast.error('결제 시간이 만료되었습니다. 다시 시도해주세요.');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-md" onPointerDownOutside={e => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">예매 정보 확인</DialogTitle>
          <DialogDescription></DialogDescription>
          <NoSSRCountdownTimer
            className="text-md"
            size={20}
            strokeWidth={2}
            initialSeconds={600}
            onComplete={handleCountdownComplete}
          />
        </DialogHeader>

        <PaymentSummaryCard
          selectSeats={selectSeats}
          showTitle={showTitle}
          totalPrice={totalPrcie}
        />

        <TossPaymentForm
          handlePaymentSuccess={handlePaymentSuccess}
          handlePaymentError={handlePaymentError}
          numberOfTickets={selectSeats.length}
          showTitle={showTitle}
          orderToken={orderToken}
          totalAmount={totalAmount}
        />
      </DialogContent>
    </Dialog>
  );
}
