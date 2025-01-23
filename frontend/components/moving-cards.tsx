"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface MovingCardsProps {
  items: {
    id:number;
    title: string;
    image: string;
    
  }[];
}

export function MovingCards({ items }: MovingCardsProps) {
  return (
    <div className="relative flex h-[450px] w-full items-center justify-center overflow-hidden">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="flex gap-8 overflow-x-scroll scrollbar-hide"
      >
        {items.map((item, idx) => (
          <motion.div
            key={item.id}
            className="relative h-[350px] w-[250px] shrink-0 overflow-hidden rounded-2xl"
            whileHover={{ y: -20 }}
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              times: [0, 0.5, 1],
              repeat: Infinity,
              delay: idx * 0.2,
            }}
          >
            <Link href={`/details/${item.id}`}>
              <div className="cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                {/* <div className="absolute bottom-6 left-4 right-4">
                  <h3 className="text-xl font-bold text-black">{item.title}</h3>
                </div> */}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}