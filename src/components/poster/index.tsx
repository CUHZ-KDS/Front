import { ComponentProps } from 'react';
import { Card } from '../ui/card';
import { cn } from '@/lib/utils';

interface PosterProps extends ComponentProps<'div'> {
  image: string;
  className?: string;
}

export default function Poster({ image, className, ...props }: PosterProps) {
  return (
    <Card
      className={cn('bg-contain bg-center', className)}
      style={{ backgroundImage: `url(${image})` }}
      {...props}
    ></Card>
  );
}
