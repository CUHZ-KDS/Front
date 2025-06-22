'use client';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '../ui/button';
import LoginForm from './loginForm';
import { useAuthStore } from '@/store/authStore';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '@/service/authService';
import { AuthType } from '@/types/auth';
import { useState } from 'react';

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const login = useAuthStore(state => state.login);
  const {
    mutate,
    error: mutationError,
    reset,
    isPending,
  } = useMutation<AuthType, Error>({
    mutationFn: loginUser,
    onSuccess: data => {
      login(data);
    },
    onError: (error: Error) => {
      console.error('login-err', error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  const onOpenChange = () => {
    setIsOpen(pre => !pre);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="cursor-pointer">
          로그인
        </Button>
      </DialogTrigger>
      <LoginForm onSubmit={handleSubmit} isPending={isPending} mutationError={mutationError} />
    </Dialog>
  );
};

export default Login;
