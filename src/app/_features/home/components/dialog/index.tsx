import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import Gradient from '@/components/gradient';
import { ShowDetailDialogProps } from '../../types';

export default function ShowDetailDialog({ selectedItem, onClose }: ShowDetailDialogProps) {
  return (
    <Dialog open={!!selectedItem} onOpenChange={onClose}>
      <DialogContent className="p-0 focus:outline-none" showCloseButton={false}>
        <DialogHeader className="sr-only">
          <DialogTitle>{selectedItem?.title}</DialogTitle>
          <DialogDescription>{selectedItem?.title}</DialogDescription>
        </DialogHeader>

        <Card
          className="relative h-[650px] border-none bg-cover bg-center"
          style={{ backgroundImage: `url(${selectedItem?.showImgUrl})` }}
        >
          <CardContent className="relative z-20 h-full">
            <div className="absolute bottom-0 left-0 w-full p-6">
              <div className="flex flex-col">
                <h3 className="mb-4 text-2xl">{selectedItem?.title}</h3>
                <div className="flex">
                  <div className="flex-1">
                    <ul>
                      <li>{selectedItem?.placeName}</li>
                      <li>{selectedItem?.minAge}세 이상 관람가</li>
                      <li>{selectedItem?.runningTimeMinute}분</li>
                      <li>
                        {selectedItem?.startDate} ~ {selectedItem?.endDate}
                      </li>
                    </ul>
                  </div>
                  <div className="flex items-end">
                    <Link
                      href={`show/${selectedItem?.id}`}
                      className="flex h-[49px] w-40 cursor-pointer items-center justify-center rounded-md bg-[#4000FF] text-xl hover:bg-[#4000FF]/90"
                    >
                      예매하러 가기
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <Gradient />
        </Card>
      </DialogContent>
    </Dialog>
  );
}
