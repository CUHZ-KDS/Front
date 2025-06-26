'use client';
import { loadTossPayments, TossPaymentsPayment } from '@tosspayments/tosspayments-sdk';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReservationType } from '../../types';
import { useBookStore } from '../../store/bookStore';
// import CountdownTimer from '@/components/countdownTimer';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, CreditCard, MapPin, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SeatItem from '@/components/seat/seat-item';
import { useEffect, useState } from 'react';

interface PaymentViewProps extends ReservationType {
  isPaymentView: boolean;
  setIsPaymentView: (b: boolean) => void;
  showTitle: string;
}

// 추후 리팩토링
const clientKey = process.env.NEXT_PUBLIC_TOSS_API_KEY || '';

export default function PaymentView({
  isPaymentView,
  setIsPaymentView,
  orderToken,
  // reservedSeatIds,
  totalAmount,
  showTitle,
}: PaymentViewProps) {
  const selectSeats = useBookStore(state => state.selectSeats);
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [isPaymenting, setIsPaymenting] = useState(false);
  const totalPrcie = selectSeats?.reduce((acc, cur) => acc + cur.seat.price, 0) || 0;

  // const onComplte = () => {
  //   // 카운트가 다 됐을때 실행
  // };

  // const handlePayment = () => {
  //   // 결제 API를 쏴야함.
  // };
  const testOrderId = 'qwer_asdf';

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPaymenting(true);

    if (!payment) {
      alert('결제 모듈을 로딩 중입니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    try {
      await payment?.requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: totalAmount,
        },
        orderId: testOrderId,
        orderName: `${showTitle} 티켓 ${selectSeats.length} 매`,
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
    } catch (e) {
      setIsPaymenting(false);
      console.error(e);
    }
  };

  const handleClose = () => {
    if (!isPaymenting) {
      setIsPaymentView(false);
    }
  };

  useEffect(() => {
    const tossLoad = async () => {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        const tosspayment = tossPayments.payment({ customerKey: orderToken || 'testKey@' });
        if (tosspayment) return setPayment(tosspayment);
      } catch (e) {
        console.error(e);
      }
    };

    tossLoad();
  }, [orderToken]);

  return (
    <Dialog open={isPaymentView} onOpenChange={handleClose}>
      <DialogContent className="w-md">
        <DialogHeader>
          <DialogTitle className="text-center">예매 정보 확인</DialogTitle>
          <DialogDescription>결제 전 선택하신 좌석과 가격을 확인해주세요.</DialogDescription>
        </DialogHeader>

        <div>
          {/* <CountdownTimer
            className="text-md"
            size={20}
            strokeWidth={2}
            initialSeconds={600}
            onComplete={onComplte}
          /> */}

          <form onSubmit={handlePay}>
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{showTitle}</CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2">
                    <p className="flex items-center gap-2 text-sm">
                      <Calendar size={18} /> 2025.06.27 (날짜 필요)
                    </p>
                    <p className="flex items-center gap-2 text-sm">
                      <MapPin size={18} /> CGV 강남점 3관 (장소 필요)
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Users size={21} />
                    선택 좌석
                  </CardTitle>
                  <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-2">
                    {selectSeats.map(seat => (
                      <li key={seat.seat.id}>
                        <SeatItem zoneName={seat.zoneName} {...seat.seat} />
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="sr-only">
                  <CardTitle>결제 금액</CardTitle>
                  <CardDescription>결제 금액을 확인해주세요.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-2 text-lg font-bold">
                    <div className="flex items-center justify-between">
                      <span>총 결제금액</span>
                      <span>{totalPrcie.toLocaleString()} 원</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div>
                <Button
                  // disabled 결제중일때 disabled처리하기
                  variant="ff"
                  className="ml-auto flex w-32 cursor-pointer items-center gap-2"
                >
                  <CreditCard />
                  결제 하기
                </Button>
              </div>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
