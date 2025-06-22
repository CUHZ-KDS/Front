'use client';
import UserAvatar from './avatar';
import Login from '../login';
import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';

export interface GuestDataType {
  accessToken: string;
  refreshToken: string;
  member: {
    nickname: string;
    memberType: string;
  };
}
export default function User() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const user = useAuthStore(state => state.user);
  const initializeAuth = useAuthStore(state => state.initializeAuth);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    try {
      initializeAuth();
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [initializeAuth]);

  if (isLoading) return null;
  if (!user) return <Login />;
  return <UserAvatar guestData={user} logout={logout} />;
}
