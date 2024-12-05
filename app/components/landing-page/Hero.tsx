"use client"
import Test2 from '../../../public/landing-page/images/test2.png'
// import ArrowIcon from '/landing-page/icons/arrow-w.svg'
import Test from '../../../public/landing-page/images/test.png'
import Image from 'next/image';
import {motion} from 'framer-motion'
import { AnimatedGradientTextDemo } from './animatedtext';

export const Hero = () => {
  return (
    <div className="bg-white text-white bg-[linear-gradient(to_bottom,#fff,#E4DFEDFF_34%,#817FF4FF_65%,#A4BBFFFF_82%)] py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] llg:h-[800px] rounded-[100%] bg-white left-1/2 -translate-x-1/2 border border-[#9e99cc] bg-[radial-gradient(closest-side,#fff_82%,#9295F4FF)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
    <div className="container relative my-28">
      <div className="flex items-center justify-center -mt-10">
        <AnimatedGradientTextDemo/>
      </div>
      <div className="flex justify-center mt-8 ">
      <div className="inline-flex relative">
      <h1 className='text-7xl sm:text-9xl font-bold tracking-tightner text-center inline-flex text-black'>IDK Chatbot</h1>
      <motion.div className='absolute right-[100%] top-[40%] hidden sm:inline'
      drag
      dragSnapToOrigin

      >
      <Image src={Test2} alt="cursor" height={300} width={300} className='max-w-none' draggable="false"/>
      </motion.div>
      <motion.div className='absolute left-[100%] top-[40%] hidden sm:inline'
      drag
      dragSnapToOrigin
      >
      <Image src={Test} alt="cursor"  height={200} width={200} className='max-w-none' draggable="false"/>
      </motion.div>
      </div>
      </div>
      <div className="flex justify-center">
      <p className='text-xl text-center mt-8 max-w-md text-black'>Votre chatbot IA pour en savoir plus sur votre santé</p>
      </div>
      <div className="flex justify-center mt-8">
      <button
        className="bg-black text-white py-3 px-5 rounded-lg font-medium"
        onClick={() => (window.location.href = '/dashboard')}
      >
        Vous connecter
      </button>

      </div>


    </div>
    

    </div>
  )
};
