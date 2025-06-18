import Link from 'next/link';
import User from '../user';

const Header = () => {
  return (
    <div className="h-24">
      <div className="flex h-full items-center justify-between">
        <Link className="font-sans text-3xl font-bold text-red-600" href={'/'}>
          MOTI
        </Link>
        {/* 아래 컴포넌트에서 로그인 또는 아바타로 분기 */}
        <User />
      </div>
    </div>
  );
};

export default Header;
