"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "./nav-link";

const links = [
  { href: "/", label: "Home" },
  { href: "/recommendations", label: "Movies" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden z-50 relative">
      <Button
        variant="ghost"
        size="icon"
        className="text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-14 border-b z-50 border-zinc-800 bg-black/95 backdrop-blur-lg"
          >
            <nav className="flex flex-col p-4">
              {links.map((link) => (
                <NavLink key={link.href} {...link} />
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}