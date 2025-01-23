"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export const BackgroundBeams = () => {
  const beamsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!beamsRef.current) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!beamsRef.current) return;
      
      const rect = beamsRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      beamsRef.current.style.setProperty("--mouse-x", `${mouseX}px`);
      beamsRef.current.style.setProperty("--mouse-y", `${mouseY}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.4 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0"
      ref={beamsRef}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_800px_at_var(--mouse-x)_var(--mouse-y),rgba(109,40,217,0.12),transparent_45%)]"
        style={{
          ["--mouse-x" as string]: "50%",
          ["--mouse-y" as string]: "50%",
        }}
      />
    </motion.div>
  );
};