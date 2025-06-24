'use client';
import ContainerWrapper from '@/components/layout/container-wrapper';
import Loading from '@/components/loading.tsx';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const NoSSRShowDetail = dynamic(() => import('@/app/_features/show/components/detail/index'), {
  ssr: false,
  loading: () => <Loading />,
});

export default function Page() {
  return (
    <ContainerWrapper>
      <ErrorBoundary fallback={<div>해당 공연을 찾을 수 없습니다</div>}>
        <Suspense fallback={<Loading />}>
          <NoSSRShowDetail />
        </Suspense>
      </ErrorBoundary>
    </ContainerWrapper>
  );
}
