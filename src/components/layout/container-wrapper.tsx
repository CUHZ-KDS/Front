import { ComponentProps } from 'react';

interface ContainerWrapperProps extends ComponentProps<'div'> {
  children: React.ReactNode;
}

export default function ContainerWrapper({ children }: ContainerWrapperProps) {
  return (
    <div className="w-full">
      <div className="flex h-full w-full flex-col items-center justify-center">{children}</div>
    </div>
  );
}
