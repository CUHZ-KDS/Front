'use client';

import LeftZoneView from '../left/left-zone-view';
import CenterView from '../center/center-view';
import RightView from '../right/right-view';
import Loading from '@/components/loading.tsx';
import { useProtect } from '@/hooks/useProtect';

export default function BookDetail() {
  const { isLoading } = useProtect();
  if (isLoading) return <Loading />;

  return (
    <div className="flex w-full flex-col">
      <h1 className="mr-auto text-4xl font-bold select-none">예약 공연 제목</h1>
      <div className="flex h-[600px] gap-2 py-4">
        {/* (좌측) 전체 좌석 예약 현황 */}
        <div className="flex h-90 flex-shrink-0 flex-col rounded-md border-2 border-gray-600 p-4">
          <LeftZoneView />
        </div>

        {/* (중앙) 선택 좌석 현황 */}
        <div className="flex w-[550px] flex-shrink-0 flex-col gap-2 p-4">
          <CenterView />
        </div>

        {/* (우측) 좌석 및 결제 금액 안내 */}
        <div className="flex w-[340px] flex-shrink-0 flex-col border-l-2 p-4">
          <RightView />
        </div>
      </div>
    </div>
  );
}
