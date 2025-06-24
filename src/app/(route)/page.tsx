'use client';
import ContainerWrapper from '@/components/layout/container-wrapper';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Loading from '@/components/loading.tsx';
import dynamic from 'next/dynamic';

const NoSSRShow = dynamic(() => import('@/app/_features/home/components/show'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Page() {
  return (
    <ContainerWrapper>
      <h1 className="mr-auto text-4xl font-bold select-none">공연</h1>
      <ErrorBoundary fallback={<div>공연 조회에 실패했습니다.</div>}>
        <Suspense fallback={<Loading />}>
          <NoSSRShow />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
