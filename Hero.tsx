"use client"
import { Button } from '@nextui-org/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion } from 'framer-motion';

function Hero() {
  return (
    <div className='px-10 md:px-28 lg:px-44 mt-10  h-screen z-10 absolute '>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div>
          <h2 className='text-[40px] text-white font-extrabold py-10'>Welcome to your magical storybook</h2>
          <h3 className='text-[20px] text-white  font-bold py-9'>Let's create something amazing</h3>
          <Link href={"/Create"}>
          <Button size='lg' color='primary' className='mt-5 font-bold text-2xl p-8'>Create Story</Button>
          </Link>
        </div>
        <div>
        <motion.div
            animate={{
              y: [0, -20, 0], // Move up and down
            }}
            transition={{
              duration: 2, // Duration for one complete cycle
              repeat: Infinity, // Repeat forever
              ease: "easeInOut", // Smooth transition
            }}
          >
            <Image
              src={"/book-removebg-preview.png"}
              alt="hero"
              width={700}
              height={400}
            />
          </motion.div>

        </div>

      </div>
    </div>
  )
}

export default Hero
