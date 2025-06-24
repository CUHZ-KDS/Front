import { ShowDescriptionProps } from '../../types';
import InfoRow from '../detail/info-row';

export default function ShowDescription({
  placeName,
  startDate,
  endDate,
  runningTimeMinute,
  minAge,
  grade,
}: ShowDescriptionProps) {
  return (
    <>
      <InfoRow label="장소" value={placeName} />
      <InfoRow
        label="공연 기간"
        value={
          <div>
            {startDate} ~ {endDate}
          </div>
        }
      />
      <InfoRow label="공연 시간" value={`${runningTimeMinute || 0}분`} />
      <InfoRow label="관람 연령" value={`${minAge || 0}세 이상 관람가`} />

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
    </>
  );
}
