import ContainerWrapper from '@/components/layout/container-wrapper';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Show } from '../_features/home';

export default function Page() {
  return (
    <ContainerWrapper>
      <h1 className="mr-auto text-4xl font-bold select-none">공연</h1>

      {/* 에러 및 로딩 컴포넌트 변경 예정 */}
      <ErrorBoundary fallback={<div>...에러</div>}>
        <Suspense fallback={<div>...로딩</div>}>
          <Show />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
