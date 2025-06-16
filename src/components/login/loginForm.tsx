import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const LoginForm = () => {
  return (
    <DialogContent className="h-[588px] w-[640px] bg-white">
      <div className="mx-auto flex w-[374px] flex-col justify-center">
        <DialogHeader>
          <DialogTitle className="mb-4 text-2xl font-medium text-black">로그인</DialogTitle>
          <DialogDescription className="sr-only">
            로그인을 위해 아이디와 패스워드를 입력해주세요.
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-2">
          <Input className="border-gray-300" placeholder="ID" />
          <Input className="border-gray-300" placeholder="PW" />
          <Button className="h-12 w-full cursor-pointer bg-[#4000FF] font-semibold text-white hover:bg-[#4000FF]/90">
            로그인
          </Button>
          <Button className="h-12 w-full cursor-pointer bg-[#889BE5] font-semibold text-white hover:bg-[#889BE5]/90">
            회원가입
          </Button>
        </form>
      </div>
    </DialogContent>
  );
};

export default LoginForm;
