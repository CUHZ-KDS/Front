'use client';

import { useSeats } from '../../hooks/useSeats';
import { useParams } from 'next/navigation';
import ThreeContainer, {
  CenterContainer,
  LeftContainer,
  RightContainer,
} from '@/components/layout/ThreeContainer';
import ZonePreview from '../left/zone-preview';
import SelectZone from '../center/selectZone';
import SelectSeat from '../right/select-seat';
import BookedPreview from '../right/booked-preview';
import { useBookStore } from '../../store/bookStore';
import { useEffect, useState } from 'react';
import { useBookMutation } from '../../hooks/useBookMutation';
import PaymentView from '../right/payment-view';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function BookDetail() {
  const params = useParams<{ id: string }>();
  const { id: scheduleId } = params;
  const { data: seatsData } = useSeats(scheduleId);
  const [open, setIsOpen] = useState(false);
  const reset = useBookStore(state => state.reset);
  const availableSeats = useBookStore(state => state.availableSeats);

  {
    /* 예매 API - 완료시 결제창 열림 */
  }
  const {
    data: reservationData,
    mutate: bookMutate,
    reset: mutationReset,
    error,
  } = useBookMutation(scheduleId);

  const handleBooking = (ids: string[]) => {
    bookMutate(ids, {
      onSuccess: () => {
        setIsOpen(true);
      },
      onError: () => {
        toast.error('잠시 후 다시 시도해주세요.');
        console.error(error?.message);
      },
    });
  };

  {
    /* 결제창을 닫아야 예매 Dialog 닫을 수 있음 */
  }
  const onOpenChange = () => {
    setIsOpen(false);
    mutationReset();
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  return (
    <ThreeContainer title={seatsData?.showTitle}>
      <LeftContainer className="flex h-90 flex-shrink-0 flex-col rounded-md border-2 border-gray-600 p-4">
        <h3 className="pb-2 text-xl">전체 좌석 예약 현황</h3>
        <ZonePreview seatsData={seatsData} />
      </LeftContainer>
      <CenterContainer>
        <SelectZone />
      </CenterContainer>
      <RightContainer className="px-2">
        <div className="flex-1 overflow-y-auto py-4">
          <div className="flex flex-row items-center py-2">
            <h3 className="text-xl">선택 좌석</h3>
            <p className="px-2 py-1 text-sm text-gray-400">선택 가능 좌석수 {availableSeats}</p>
            <Button
              variant="outline"
              className="ml-auto h-7 w-6 cursor-pointer px-0"
              onClick={reset}
            >
              <RotateCcw size={16} />
            </Button>
          </div>
          <SelectSeat />
        </div>

        <div className="border-b-2 border-white py-4" />
        <div className="mt-10 flex h-full max-h-40 flex-col font-bold">
          <h3 className="pb-4 text-xl">결제 예정 금액</h3>
          <BookedPreview handleBook={handleBooking} />
          {/* 결제창 */}
          {/* 예매 응답 받고 확인되면 그때 띄워주기 */}
          {reservationData && (
            <PaymentView
              open={open}
              onOpenChange={onOpenChange}
              showTitle={seatsData.showTitle}
              {...reservationData}
            />
          )}
        </div>
      </RightContainer>
    </ThreeContainer>
  );
}
