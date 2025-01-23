"use client";

import { Film } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        whileHover={{ rotate: 180 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        <Film className="h-6 w-6 text-white" />
      </motion.div>
      <span className="text-lg font-bold text-white">MovieMind</span>
    </Link>
  );
}