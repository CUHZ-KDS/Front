'use client';
import ShowCarousel from '@/components/showCarousel';
import { useMyShowList } from '../../hooks/useMy';
import { Button } from '@/components/ui/button';
import Poster from '@/components/poster';
import Loading from '@/components/loading.tsx';
import { useProtect } from '@/hooks/useProtect';

export default function My() {
  const { data: myShowList } = useMyShowList();
  const { isLoading } = useProtect();
  if (isLoading) return <Loading />;
  return (
    <div className="w-full">
      <ShowCarousel
        showList={myShowList.data.reservations}
        isInteractive={false}
        renderItem={item => (
          <div className="relative">
            {/* 추후 리팩토링 필요 */}
            <Poster className="h-[400px] opacity-20" image={item.show.img_sorce} />
            <div className="absolute bottom-0 p-6">
              <h2 className="text-xl">{item.show.title}</h2>
              <div>
                <div>row: {item.seat.row}</div>
                <div>column: {item.seat.column}</div>
              </div>
            </div>
            <div className="absolute inset-0 z-30 rounded-xl bg-white/10"></div>
          </div>
        )}
        renderBottomContent={item => (
          <div className="py-1">
            {/* 추후 리팩토링 필요 (취소 핸들러 예정) */}
            <Button
              onClick={() => console.log(item.id)}
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
