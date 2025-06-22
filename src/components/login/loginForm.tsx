'use client';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';

import Loading from '../loading.tsx';

interface LoginFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  mutationError: Error | null;
}
// 현재는 게스트 로그인만 구현
const LoginForm = ({ isPending, mutationError, onSubmit }: LoginFormProps) => {
  return (
    <DialogContent className="h-[588px] w-[640px] bg-white">
      <div className="mx-auto flex w-[374px] flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl font-medium text-black">로그인</DialogTitle>
          <DialogDescription className="sr-only">
            로그인을 위해 아이디와 패스워드를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-2 text-black" onSubmit={onSubmit}>
          <Button
            disabled={isPending}
            className="h-12 w-full cursor-pointer bg-[#4000FF] font-semibold text-white hover:bg-[#4000FF]/90"
          >
            {isPending ? <Loading /> : '게스트 로그인'}
          </Button>

          {mutationError && (
            <div className="flex flex-col gap-1 text-sm text-red-600">
              <p>알 수 없는 오류가 발생했습니다.</p>
              <p>잠시 후 다시 시도해주세요.</p>
            </div>
          )}
        </form>
      </div>
    </DialogContent>
  );
};

export default LoginForm;
