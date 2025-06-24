'use client';
import ContainerWrapper from '@/components/layout/container-wrapper';
import Loading from '@/components/loading.tsx';
import { useProtect } from '@/hooks/useProtect';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const NoSSRBookDetail = dynamic(() => import('@/app/_features/book/components/book/index'), {
  ssr: false,
});

export default function BookPage() {
  // 로그인한 유저만 들어올 수 있음
  const { isLoading } = useProtect();

  if (isLoading) {
    return (
      <div className="flex w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <ContainerWrapper>
      {/* 에러 및 로딩 컴포넌트 변경 예정 */}
      <ErrorBoundary fallback={<div>공연을 찾을 수 없습니다.</div>}>
        <Suspense fallback={<Loading />}>
          <NoSSRBookDetail />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
