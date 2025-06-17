import { useEffect, useState } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';

export function useShowCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [count, setCount] = useState(0);

  function setIndex(index: number) {
    api?.scrollTo(index, false);
  }

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setSelectedIndex(api.selectedScrollSnap());
    api.on('select', () => {
      setSelectedIndex(api.selectedScrollSnap());
    });
  }, [api]);

  return { setApi, selectedIndex, count, setIndex };
}
