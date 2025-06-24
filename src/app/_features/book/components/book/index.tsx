'use client';

import { useSeats } from '../../hooks/useSeats';
import { useParams } from 'next/navigation';
import ThreeContainer, {
  CenterContainer,
  LeftContainer,
  RightContainer,
} from '@/components/layout/ThreeContainer';
import ZonePreview from '../left/zone-preview';
import CountdownTimer from '@/components/countdownTimer';
import SelectZone from '../center/selectZone';
import SelectSeat from '../right/select-seat';
import PaymentPreview from '../right/payment-preview';
import { useBookStore } from '../../store/bookStore';
import { useEffect } from 'react';

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const { id: scheduleId } = params;
  const { data: seatsData } = useSeats(scheduleId);
  const selectSeats = useBookStore(state => state.selectSeats);
  const reset = useBookStore(state => state.reset);
  const availableSeats = useBookStore(state => state.availableSeats);

  const handlePayment = () => {
    console.log(selectSeats);
    // seatid -> path
    // scheduleId -> body
  };

  const onComplte = () => {
    // 카운트가 다 됐을때 실행
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <ThreeContainer title={seatsData?.showTitle}>
      <LeftContainer className="flex h-90 flex-shrink-0 flex-col rounded-md border-2 border-gray-600 p-4">
        <>
          <h3 className="pb-2 text-xl">전체 좌석 예약 현황</h3>
          <ZonePreview seatsData={seatsData} />
        </>
      </LeftContainer>
      <CenterContainer className="px-2">
        <>
          <CountdownTimer initialSeconds={600} onComplete={onComplte} />
          <SelectZone />
        </>
      </CenterContainer>
      <RightContainer className="px-2">
        <>
          <div className="flex-1 overflow-y-auto py-4">
            <div className="flex flex-row items-center justify-between py-2">
              <h3 className="text-xl">선택 좌석</h3>
              <p className="py-1 text-sm text-gray-400">선택 가능 좌석수 {availableSeats}</p>
            </div>
            <SelectSeat />
          </div>

          <div className="border-b-2 border-white py-4" />
          <div className="mt-10 flex h-full max-h-40 flex-col font-bold">
            <h3 className="pb-4 text-xl">결제 예정 금액</h3>
            <PaymentPreview handlePayment={handlePayment} />
          </div>
        </>
      </RightContainer>
    </ThreeContainer>
  );
}
