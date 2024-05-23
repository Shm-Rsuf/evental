import LogoImage from "@/public/logo.svg";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav>
      <div className='container flex justify-between items-center py-4'>
        <div className='nav-brand'>
          <a href='index.html'>
            <Image src={LogoImage} alt='Eventry' className='h-[45px]' />
          </a>
        </div>

        <ul className='flex gap-4 text-[#9C9C9C]'>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
