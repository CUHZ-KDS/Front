'use client';
import { cn } from '@/lib/utils';
import { useBookStore } from '../../store/bookStore';
import React from 'react';
import { SEAT_GRADE_COLORS, SEAT_STATUS_CLASSES } from '../../tailwind';
import { GroupSortType, SeatStatus, SeatsType } from '../../types';

export default function SelectZone() {
  const selectZone = useBookStore(state => state.selectZone as GroupSortType | null); // Zone 타입 명시
  const selectSeats = useBookStore(state => state.selectSeats);
  const setSelectSeats = useBookStore(state => state.setSelectSeats);

  if (!selectZone) {
    return (
      <div className="flex h-full items-center justify-center">
        <h3 className="text-2xl font-bold">구역을 선택해주세요.</h3>
      </div>
    );
  }

  const handleClick = (seat: SeatsType) => {
    if (seat.status !== SeatStatus.AVAILABLE) return;

    const selectedSeatData = {
      zoneName: selectZone.zoneName,
      seat,
    };

    setSelectSeats(selectedSeatData);
  };

  const selectedSeatIds = selectSeats.map(seat => seat.seat.id);

  const allSeats = selectZone.seats.flat();

  const maxRow = Math.max(0, ...allSeats.map(s => s.row));
  const maxCol = Math.max(0, ...allSeats.map(s => s.col));

  // 행/열 레이블을 위한 배열 생성
  const rowLabels = Array.from({ length: maxRow }, (_, i) => i + 1);
  const colLabels = Array.from({ length: maxCol }, (_, i) => i + 1);

  return (
    <>
      <h3 className="text-center text-lg">{selectZone.zoneName}</h3>

      {/* 좌석 배치도를 감싸는 Grid 컨테이너 */}
      <div
        className="grid justify-start gap-1"
        style={{
          gridTemplateColumns: `auto repeat(${maxCol}, 1.25rem)`,
          gridTemplateRows: `auto repeat(${maxRow}, 1.25rem)`,
        }}
      >
        {/* 1. 첫 번째 셀 (왼쪽 상단 코너, 비워둠) */}
        <div className="col-start-1 row-start-1" />

        {/* 2. 열(Col) 레이블: 최상단 행에 좌석 열 번호 표시 */}
        {colLabels.map(colNum => (
          <div
            key={`col-label-${colNum}`}
            className="flex items-center justify-center text-xs font-semibold text-gray-500"
          >
            {colNum}
          </div>
        ))}

        {/* 3. 행(Row) 레이블 및 실제 좌석 렌더링 */}
        {rowLabels.map(rowNum => (
          <React.Fragment key={`row-${rowNum}`}>
            {/* 행(Row) 레이블: 각 행의 가장 왼쪽 컬럼에 행 번호 표시 */}
            <div
              key={`row-label-${rowNum}`}
              className="flex w-5 items-center justify-center text-xs font-semibold text-gray-500"
            >
              {rowNum}
            </div>

            {/* 해당 행의 모든 좌석들을 순회하며 렌더링 */}
            {colLabels.map(colNum => {
              const seat = allSeats.find(s => s.row === rowNum && s.col === colNum);

              if (!seat || !seat.isVisible) {
                return (
                  <div key={`empty-${rowNum}-${colNum}`} className="aspect-square h-auto w-5 p-0" />
                );
              }

              // 좌석 등급에 따른 기본 색상 클래스 가져오기
              const gradeClass = SEAT_GRADE_COLORS[seat.name];

              const isSelected = selectedSeatIds.includes(seat.id);

              // 좌석 상태에 따른 추가 클래스 결정
              let statusClass = '';
              if (seat.status === SeatStatus.BOOKED) {
                statusClass = SEAT_STATUS_CLASSES[SeatStatus.BOOKED];
              } else if (isSelected) {
                statusClass = 'bg-gray-600';
              } else {
                statusClass = SEAT_STATUS_CLASSES[SeatStatus.AVAILABLE]; // 선택 가능한 좌석
              }

              return (
                <button
                  title={`[${seat.name}] ${seat.row}열-${seat.col}`}
                  disabled={seat.status === SeatStatus.BOOKED} // 예약된 좌석은 비활성화
                  onClick={() => handleClick(seat)}
                  key={seat.id}
                  className={cn(
                    'relative aspect-square h-auto w-5 rounded-t-sm p-0',
                    gradeClass, // 등급별 기본 색상
                    statusClass, // 상태별 추가 색상 또는 스타일 (선택/예약됨)
                    seat.status !== SeatStatus.BOOKED && 'hover:brightness-90' // 예약되지 않은 좌석에만 hover 효과
                  )}
                >
                  {/* 선택된 좌석에만 체크 표시 렌더링 */}
                  {isSelected && (
                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs text-white">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
