"use client";

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const translateY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <div className="bg-white text-black py-[72px] sm:py-24 ml-[35%]" ref={containerRef}>
      <div className="container max-w-xl relative">
        <motion.div style={{ translateY }}>
          <Image
            src="/landing-page/images/helix2.png"
            alt="Helix"
            className="absolute top-6 left-[calc(100%+36px)]"
            width={200} // Provide appropriate width
            height={200} // Provide appropriate height
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src="/landing-page/images/emojistar.png"
            alt="Emoji"
            className="absolute -top-[120px] right-[calc(100%+30px)]"
            width={200} // Provide appropriate width
            height={200} // Provide appropriate height
          />
        </motion.div>

        <h2 className="font-bold text-5xl sm:text-6xl tracking-tighter">Get Instant Access</h2>
        <p className="text-xl text-black/70 mt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo, veritatis? Omnis minima quisquam error
          accusamus?
        </p>
        <form className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
          <input
            type="email"
            placeholder="karthikmudunuri999@gmail.com"
            className="h-12 bg-black/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1"
          />
          <button className="bg-black text-white h-12 rounded-lg px-5">Get access</button>
        </form>
      </div>
    </div>
  );
};
