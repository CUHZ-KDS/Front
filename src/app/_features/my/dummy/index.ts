import { MyShowApiType } from '@/types/myShowType';

const seatData = {
  // 배열이어야 할듯?
  seatId: 1,
  zone: 'VIP석',
  row: 1,
  column: 5,
};

const showData = {
  title: '뮤지컬 레미제라블',
  scheduleDateTime: '2025-06-20T19:30:00Z',
  place: '올림픽공원 체조경기장',
  img_sorce: '/images/a1.jpg', // 임시
  // show id도 있어야 할듯..?
};
const showData2 = {
  title: '뮤지컬2 레미제라블',
  scheduleDateTime: '2025-06-20T19:30:00Z',
  place: '올림픽공원 체조경기장',
  img_sorce: '/images/a2.jpg', // 임시
};
const showData3 = {
  title: '뮤지컬3 레미제라블',
  scheduleDateTime: '2025-06-20T19:30:00Z',
  place: '올림픽공원 체조경기장',
  img_sorce: '/images/a3.jpg', // 임시
};

export const dummyMyData: MyShowApiType = {
  code: 'S200',
  message: '예매 내역 조회가 완료되었습니다.',
  data: {
    reservations: [
      {
        id: 1,
        reservationId: 2001,
        status: 'RESERVED',
        price: 80000,
        seat: seatData,
        show: showData,
        reservedAt: '2025-06-13T00:33:00Z',
      },
      {
        id: 2,
        reservationId: 2002,
        status: 'RESERVED',
        price: 80000,
        seat: seatData,
        show: showData2,
        reservedAt: '2025-06-13T00:33:00Z',
      },
      {
        id: 3,
        reservationId: 2003,
        status: 'RESERVED',
        price: 80000,
        seat: seatData,
        show: showData3,
        reservedAt: '2025-06-13T00:33:00Z',
      },
    ],
  },
};
