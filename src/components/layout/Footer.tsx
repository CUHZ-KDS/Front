import Image from 'next/image';

const Footer = () => {
  return (
    <div className="flex h-24 items-center">
      <div className="ml-auto">
        <div className="relative ml-auto h-8 w-8">
          <Image className="absolute" fill src="/images/github-mark-white.png" alt="logo" />
        </div>
        <div className="pt-2 text-sm">Copyright © MOTI ALL RIGHTS DESERVED.</div>
      </div>
    </div>
  );
};

export default Footer;
