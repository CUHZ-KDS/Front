import { Button } from '@/components/ui/button';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import { CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';
import { PaymentResponseData } from '../../../types';
import { usePaymentMutation } from '../../../hooks/usePaymentMutation';
import { toast } from 'sonner';

interface TossPaymentFormProps {
  orderToken: string;
  totalAmount: number;
  showTitle: string;
  numberOfTickets: number;
  handlePaymentSuccess: () => void;
  handlePaymentError: () => void;
}

const clientKey = process.env.NEXT_PUBLIC_TOSS_API_KEY || '';

const TossPaymentForm = ({
  numberOfTickets,
  orderToken,
  showTitle,
  totalAmount,
  handlePaymentSuccess,
  handlePaymentError,
}: TossPaymentFormProps) => {
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const { mutate: paymentMutation, isPending } = usePaymentMutation(orderToken);

  useEffect(() => {
    // 토스 결제창
    const tossLoad = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);
        const tosspayment = tossPayments.payment({ customerKey: orderToken });
        if (tosspayment) return setPayment(tosspayment);
      } catch (e) {
        console.error(e);
      }
    };
    tossLoad();
  }, [orderToken]);

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!payment) {
      toast.warning('모듈을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    try {
      const response: unknown = await payment?.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: totalAmount,
        },
        orderId: orderToken,
        orderName: `${showTitle} 티켓 ${numberOfTickets} 매`,
        customerEmail: '',
        customerName: '게스트',
        windowTarget: 'iframe',
        card: {
          useEscrow: false,
          flowMode: 'DEFAULT',
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });

      const data = response as PaymentResponseData;

      paymentMutation(data, {
        onSuccess: () => {
          handlePaymentSuccess();
        },
        onError: () => {
          handlePaymentError();
          toast.error('결제에 실패했습니다. 다시 시도해주세요.');
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handlePay}>
      <Button
        disabled={isPending}
        variant="ff"
        className="ml-auto flex w-32 cursor-pointer items-center gap-2"
      >
        <CreditCard />
        결제 하기
      </Button>
    </form>
  );
};

export default TossPaymentForm;
