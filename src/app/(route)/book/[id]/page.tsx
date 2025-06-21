import { BookDetail } from '@/app/_features/book';
import ContainerWrapper from '@/components/layout/container-wrapper';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

export default function BookPage() {
  // 로그인한 유저만 들어올 수 있음
  return (
    <ContainerWrapper>
      {/* 에러 및 로딩 컴포넌트 변경 예정 */}
      <ErrorBoundary fallback={<div>...에러</div>}>
        <Suspense fallback={<div>...로딩</div>}>
          <BookDetail />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
