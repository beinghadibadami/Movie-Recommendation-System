"use client";

import { motion } from "framer-motion";
import { NavLogo } from "./navigation/nav-logo";
import { NavLink } from "./navigation/nav-link";
import { MobileNav } from "./navigation/mobile-nav";

const links = [
  { href: "/", label: "Home" },
  { href: "/recommendations", label: "Movies" },
  { href: "/favorites", label: "Favorites" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 z-50 w-full border-b border-zinc-800 bg-black/50 backdrop-blur-lg"
    >
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <NavLogo />
        
        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <NavLink key={link.href} {...link} />
          ))}
        </nav>

        <MobileNav />
      </div>
    </motion.header>
  );
}