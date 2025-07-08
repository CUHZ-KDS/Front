'use client';
import ShowCarousel from '@/components/showCarousel';
import { useMyShowList } from '../../hooks/useMy';
import { Button } from '@/components/ui/button';
import Poster from '@/components/poster';
import Loading from '@/components/loading.tsx';
import { useProtect } from '@/hooks/useProtect';
import { useShowCancel } from '../../hooks/useShowCancel';

export default function My() {
  const { data: myShowList } = useMyShowList();
  const { isLoading } = useProtect();
  const { mutate, isPending } = useShowCancel();

  if (isLoading) return <Loading />;

  return (
    <div className="w-full">
      <ShowCarousel
        showList={myShowList.reservations}
        isInteractive={false}
        renderItem={item => (
          <div className="relative">
            {/* 추후 리팩토링 필요 */}
            <Poster className="h-[400px] opacity-20" image={item.show.showImgUrl} />
            <div className="absolute bottom-0 p-6">
              <h2 className="text-xl">{item.show.title}</h2>
              <div>
                <div>
                  {item.seat.row} 열 {item.seat.column} 번
                </div>
                <div></div>
              </div>
            </div>
            <div className="absolute inset-0 z-30 rounded-xl bg-white/10"></div>
          </div>
        )}
        renderBottomContent={item => (
          <div className="py-1">
            {/* 추후 리팩토링 필요 (취소 핸들러 예정) */}
            <Button
              // item.id가 아닌 orderId가 필요 (임시 조치)
              onClick={() => mutate(item.id.toString())}
              disabled={isPending}
              variant="rr"
              className="ml-auto block w-36 cursor-pointer"
            >
              예매 취소하기
            </Button>
          </div>
        )}
      />
    </div>
  );
}
