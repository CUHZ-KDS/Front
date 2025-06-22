import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useProtect = (replaceRouter?: string) => {
  const [isLoading, setisLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const guest = sessionStorage.getItem('guest-1');
    if (guest) {
      setisLoading(false);
      return;
    }

    router.replace(`${replaceRouter ? replaceRouter : '/'}`);
  }, []);

  return { isLoading };
};
