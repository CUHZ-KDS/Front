import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import LoginForm from './loginForm';

const Login = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          로그인
        </Button>
      </DialogTrigger>
      <LoginForm />
    </Dialog>
  );
};

export default Login;
