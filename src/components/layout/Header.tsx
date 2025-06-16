import Link from 'next/link';
import Login from '../login';

const Header = () => {
  return (
    <div className="h-24">
      <div className="flex h-full items-center justify-between">
        <Link className="font-sans text-3xl font-bold text-red-600" href={'/'}>
          MOTI
        </Link>
        <Login />
      </div>
    </div>
  );
};

export default Header;
