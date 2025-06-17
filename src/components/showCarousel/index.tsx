'use client';

import { useShowCarousel } from '@/hooks/useShowCarousel';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import CarouselPagination from './carousel-pagination';
import Poster from '../poster';
import { Card, CardContent } from '../ui/card';
import { cn } from '@/lib/utils';
import { ShowType } from '@/types/showType';

interface ShowCarouselProps {
  showList: ShowType[];
  isInteractive?: boolean;
  onItemClick?: (item: ShowType) => void;
  renderBottomContent?: (item: ShowType) => React.ReactNode;
}

export default function ShowCarousel({
  showList,
  isInteractive = true,
  onItemClick,
  renderBottomContent,
}: ShowCarouselProps) {
  const { selectedIndex, setApi, setIndex } = useShowCarousel();

  const totalSlides = showList.length > 4 ? showList.length - 3 : 1;

  return (
    <div>
      <CarouselPagination
        selectedIndex={selectedIndex}
        setIndex={setIndex}
        totalSlides={totalSlides}
      />
      <Carousel
        opts={{
          align: 'start',
          breakpoints: {},
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent className="-ml-1">
          {showList.map(show => (
            <CarouselItem key={show.id} className="pl-1 lg:basis-1/4">
              <div className="relative h-[450px] p-1">
                <Card
                  className={cn(
                    'w-full border-none p-0',
                    isInteractive && 'cursor-pointer duration-300 hover:scale-105'
                  )}
                  onClick={isInteractive && onItemClick ? () => onItemClick(show) : undefined}
                >
                  <CardContent className="w-full p-0">
                    <Poster className="h-[400px]" image={show.img_source} />
                  </CardContent>
                </Card>
                {renderBottomContent && renderBottomContent(show)}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="cursor-pointer" />
        <CarouselNext className="cursor-pointer" />
      </Carousel>
    </div>
  );
}
