'use client';

import Poster from '@/components/poster';
import Gradient from '@/components/gradient';
import InfoRow from './info-row';
import ShowCalendar from '../calendar';
import { useParams } from 'next/navigation';
import { useShowDetail } from '../../hooks/useDetailShow';

export default function ShowDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: show } = useShowDetail(true, Number(id));
  const {
    place_name,
    running_time_minute,
    // ticket_date_time,
    start_date,
    end_date,
    min_age,
    grade,
  } = show.data;
  return (
    <div className="w-full">
      <h1 className="mr-auto text-4xl font-bold select-none">{show.data.title}</h1>
      <div className="flex gap-6 py-4">
        {/* 포스터 및 포스터의 어두운 배경을 렌더링 */}
        <div className="relative">
          <Poster className="h-[519px] w-[406px]" image="/images/a1.jpg" />
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
        <div className="relative ml-auto max-w-96 min-w-96">
          {/* ticket_date_time에 따라 카운트or캘린더 분기 */}
          <ShowCalendar />
        </div>
      </div>
    </div>
  );
}
