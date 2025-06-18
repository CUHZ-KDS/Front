'use client';
import { usePathname } from 'next/navigation';
import UserAvatar from './avatar';
import Login from '../login';

{
  /* 임시 컴포넌트 리팩토링 필요
  로그인 유무에 따라 로그인 또는 아바타가 나타나야함 */
}
export default function User() {
  const pathanme = usePathname();

  if (pathanme.includes('my')) return <UserAvatar />;
  return <Login />;
}
