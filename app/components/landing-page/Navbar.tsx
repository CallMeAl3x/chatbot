import Image from 'next/image';
// import LogoImage from '../../../public/landing-page/icons/logo.svg';
import MenuIcon from '../../../public/landing-page/icons/menu.svg';

export const Navbar = () => {
  return (
    <div className="bg-white">
      <div className="px-4">
        <div className="container bg-white">
          <div className="py-4 flex items-center justify-between">
            <div className="relative">
              <div className="absolute w-full top-2 bottom-0 bg-[linear-gradient(to_right,#F7AABE,#B57CEC,#E472D1)] blur-md"></div>
              {/* <Image src={LogoImage} alt="Logo" className="h-12 w-12 relative mt-1" /> */}
            </div>
            <div className="border border-black border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden right-0">
              <Image src={MenuIcon} alt="Menu Icon" className="text-black" />
            </div>
            <nav className="text-black gap-6 items-center hidden sm:flex pr-10">
              <a href="/about" className="text-opacity-60 text-black hover:text-opacity-100 transition">About</a>
              <a href="/dashboard" className="text-opacity-60 text-black hover:text-opacity-100 transition">Dashboard</a>
              <button className="bg-black py-2 px-4 rounded-lg text-white">Se connecter</button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
