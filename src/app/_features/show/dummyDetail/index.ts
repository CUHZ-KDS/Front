import { ShowDetailApiType } from '@/types/showDetailType';

export const dummyData: ShowDetailApiType = {
  code: 'S200',
  message: '공연 목록 조회에 성공하였습니다.',
  data: {
    id: 12345,
    title: '메디슨 카운티의 다리',
    place_name: '광림아트센터 BBH홀',
    category: 'MUSICAL',
    status: 'ACTIVE',
    start_date: '2025-07-01',
    end_date: '2025-08-31',
    ticket_date_time: '2025-06-20T14:00:00',
    min_age: 15,
    running_time_minute: 120,
    intermission_time: 15,
    grade: [
      {
        name: 'VIP석',
        price: 99000,
      },
      {
        name: 'S석',
        price: 59000,
      },
      { name: 'R석', price: 19000 },
    ],
  },
};
