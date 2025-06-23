'use client';

import Poster from '@/components/poster';
import Gradient from '@/components/gradient';
import InfoRow from './info-row';
import ShowCalendar from '../calendar';
import { useParams, useRouter } from 'next/navigation';
import { useShowDetail } from '../../hooks/useDetailShow';
import { Button } from '@/components/ui/button';
import { getRemainingSeconds } from '@/lib/getRemainingSeconds';
import React, { Suspense, useEffect, useState } from 'react';
import Loading from '@/components/loading.tsx';

const Timmer = React.lazy(() => import('@/components/countdownTimer'));

export default function ShowDetail() {
  const [isClient, setIsClient] = useState(false);
  const [done, setDone] = useState(false);
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { data: show } = useShowDetail(Number(id));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    title,
    place_name,
    running_time_minute,
    ticket_date_time,
    start_date,
    end_date,
    min_age,
    grade,
    img_source,
  } = show.data;

  function bookingHandler(id: string) {
    router.push(`/book/${id}`);
  }

  // ticket_date_time이 있을 때만 남은 시간 계산
  const time = ticket_date_time ? getRemainingSeconds(ticket_date_time) : 0;

  return (
    <div className="w-full">
      <h1 className="mr-auto text-4xl font-bold select-none">{title}</h1>
      <div className="flex gap-6 py-4">
        {/* 포스터 및 포스터의 어두운 배경을 렌더링 */}
        <div className="relative">
          <Poster className="h-[519px] w-[406px]" image={img_source || ''} />
          <Gradient />
        </div>
        <div className="w-full max-w-96 min-w-96 shrink-0">
          {/* 공연 설명 컴포넌트로 분리 생각 해보기 */}
          <InfoRow label="장소" value={place_name} />
          <InfoRow
            label="공연 기간"
            value={
              <div>
                {start_date} ~ {end_date}
              </div>
            }
          />
          <InfoRow label="공연 시간" value={`${running_time_minute}분`} />
          <InfoRow label="관람 연령" value={`${min_age}세 이상 관람가`} />

          <div className="w-full pt-10">
            <InfoRow
              label="가격"
              value={
                <div className="flex flex-col">
                  {grade.map(item => (
                    <div key={item.name} className="flex w-full justify-between">
                      <span className="mr-2 text-gray-300">{item.name}</span>
                      <span className="font-semibold whitespace-nowrap text-white">
                        {item.price.toLocaleString()}원
                      </span>
                    </div>
                  ))}
                </div>
              }
              isPriceSection={true}
            />
          </div>
        </div>
        <div className="relative ml-auto max-w-96 min-w-96 border-l-2">
          {/* ticket_date_time에 따라 카운트or캘린더 분기 */}
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                <Loading />
              </div>
            }
          >
            {isClient && (
              <>
                {!done ? (
                  <div className="flex h-full flex-col items-center">
                    <h3 className="text-cetner text-2xl font-bold">티켓팅 까지</h3>
                    <div className="flex flex-1 items-center justify-center">
                      <Timmer initialSeconds={time} onComplete={() => setDone(true)} />
                    </div>
                  </div>
                ) : (
                  <>
                    <ShowCalendar start_date={start_date} end_date={end_date} />
                    <Button
                      onClick={() => bookingHandler(id)}
                      className="absolute right-6 bottom-0 h-[49px] w-[162px] cursor-pointer text-xl font-semibold"
                      variant="ff"
                    >
                      좌석 선택하기
                    </Button>
                  </>
                )}
              </>
            )}
          </Suspense>
        </div>
      </div>
    </div>
  );
}
