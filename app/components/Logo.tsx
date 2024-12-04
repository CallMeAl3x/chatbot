import Link from "next/link";

interface LogoProps {
  href?: string;
}

const Logo = ({ href = "/landing-page" }: LogoProps) => {
  return (
    <Link href={href} className='fixed left-10 top-3'>
      <img src='/img/logo_IDK_IA.png' alt='logo' className='h-[70px] w-auto' />
    </Link>
  );
};

export default Logo;
