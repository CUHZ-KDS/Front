import { SeatGrade, SeatStatus } from './types';

// 등급별 색상 (Tailwind CSS 클래스명으로 바로 사용)
export const SEAT_GRADE_COLORS: Record<SeatGrade, string> = {
  [SeatGrade.S]: 'bg-[#3CB371]',
  [SeatGrade.R]: 'bg-[#1E90FF]',
  [SeatGrade.VIP]: 'bg-[#FFD700]',
};

// 상태별 추가 클래스 (Tailwind CSS 클래스명으로 바로 사용)
export const SEAT_STATUS_CLASSES: Record<SeatStatus, string> = {
  [SeatStatus.AVAILABLE]: 'cursor-pointer',
  [SeatStatus.BOOKED]: 'cursor-default bg-white',
};
