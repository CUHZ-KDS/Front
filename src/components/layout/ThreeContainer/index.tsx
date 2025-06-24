import { cn } from '@/lib/utils';

export default function ThreeContainer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="mr-auto text-4xl font-bold select-none">{title}</h1>
      <div className="flex h-[600px] w-full justify-center gap-4 py-4">{children}</div>
    </div>
  );
}

export function LeftContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('relative w-[380px] shrink-0', className)}>{children}</div>;
}

export function CenterContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn('w-[500px] shrink-0', className)}>{children}</div>;
}

export function RightContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('relative flex w-[340px] shrink-0 flex-col border-l-2', className)}>
      {children}
    </div>
  );
}
