import { getSeatGradeColor } from '@/app/_features/book/tailwind';
import { Badge } from '../ui/badge';
import { SeatGrade } from '@/app/_features/book/types';
import { cn } from '@/lib/utils';

interface SeatItemProps {
  zoneName: string;
  name: SeatGrade;
  row: number;
  col: number;
  price: number;
}
export default function SeatItem({ col, name, row, price, zoneName }: SeatItemProps) {
  const badgeColor = getSeatGradeColor(name);
  return (
    <div className="flex w-full items-center gap-2">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge className={cn('w-12 text-[10px] text-black', badgeColor)}>{name}</Badge>
          <span>
            {zoneName} {row}열 {col}번
          </span>
        </div>
        <span>{price.toLocaleString()} 원</span>
      </div>
    </div>
  );
}
