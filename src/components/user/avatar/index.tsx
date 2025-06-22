'use client';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GuestDataType } from '..';
import { useRouter } from 'next/navigation';

interface UserAvatarProps {
  guestData: GuestDataType;
  logout: () => void;
}

export default function UserAvatar({ guestData, logout }: UserAvatarProps) {
  const router = useRouter();

  const handleRouter = () => {
    router.push('/my');
  };
  const handleSignOut = () => {
    logout();
    router.replace('/');
  };

  const menu = [
    { title: '마이페이지', method: handleRouter },
    { title: '로그아웃', method: handleSignOut },
  ];

  return (
    <div className="flex flex-row items-center gap-2">
      {guestData.member && <p className="text-sm">{guestData.member.nickname} 님</p>}

      <Popover>
        <PopoverTrigger>
          <Avatar className="cursor-pointer">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </PopoverTrigger>
        <PopoverContent className="w-auto">
          <ul className="flex flex-col gap-4 text-sm">
            {menu.map(item => (
              <li key={item.title}>
                <button
                  className="cursor-pointer rounded-md p-2 hover:text-blue-200"
                  onClick={item.method}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </PopoverContent>
      </Popover>
    </div>
  );
}
