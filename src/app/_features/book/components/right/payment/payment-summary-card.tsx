import SeatItem from '@/components/seat/seat-item';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { SeatsType } from '../../../types';

interface SeatDetail {
  zoneName: string;
  seat: SeatsType;
}

interface PaymentSummaryCardProps {
  showTitle: string;
  selectSeats: SeatDetail[];
  totalPrice: number;
}

const PaymentSummaryCard = ({ showTitle, totalPrice, selectSeats }: PaymentSummaryCardProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-lg">{showTitle}</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        {/* <CardContent>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2 text-sm">
              <Calendar size={18} /> 2025.06.27 (날짜 필요)
            </p>
            <p className="flex items-center gap-2 text-sm">
              <MapPin size={18} /> CGV 강남점 3관 (장소 필요)
            </p>
          </div>
        </CardContent> */}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Users size={21} />
            선택 좌석
          </CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="flex flex-col gap-2">
            {selectSeats.map(seat => (
              <li key={seat.seat.id}>
                <SeatItem zoneName={seat.zoneName} {...seat.seat} />
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="sr-only">
          <CardTitle>결제 금액</CardTitle>
          <CardDescription>결제 금액을 확인해주세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-2 text-lg font-bold">
            <div className="flex items-center justify-between">
              <span>총 결제금액</span>
              <span>{totalPrice.toLocaleString()} 원</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSummaryCard;
