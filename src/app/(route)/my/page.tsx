import { My } from '@/app/_features/my';
import ContainerWrapper from '@/components/layout/container-wrapper';
import Loading from '@/components/loading.tsx';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function MyPage() {
  return (
    <ContainerWrapper>
      <h1 className="mr-auto text-4xl font-bold select-none">마이 페이지</h1>
      <ErrorBoundary fallback={<div>...에러</div>}>
        <Suspense fallback={<Loading />}>
          <My />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
