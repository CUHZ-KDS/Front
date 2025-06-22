import { ShowDetail } from '@/app/_features/show';
import ContainerWrapper from '@/components/layout/container-wrapper';
import Loading from '@/components/loading.tsx';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
export default function Page() {
  return (
    <ContainerWrapper>
      {/* 에러 및 로딩 컴포넌트 변경 예정 */}
      <ErrorBoundary fallback={<div>...에러</div>}>
        <Suspense fallback={<Loading />}>
          <ShowDetail />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
