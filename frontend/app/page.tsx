"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { ArrowRight, Film, Sparkles } from "lucide-react";
import Link from "next/link";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { SparklesCore } from "@/components/ui/sparkles";
import { MovingCards } from "@/components/moving-cards";


export default function Home() {

  const [popular, popularmovies] = useState([]); 
  const [top, toprated] = useState([]); 
  const [upcmg, upcomingmovie] = useState([]); 
  const [now, nowplaying] = useState([]); 
  const API_KEY = "0308501f946b2c57e450c228b4e5693f";

  useEffect(() => {
    
    const popular_movies = async () => {
      try {
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();

        
        const movies = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/default-poster.png", // Fallback image
        }));

        popularmovies(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const top_rated = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();

        const movies = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/default-poster.png", // Fallback image
        }));

        toprated(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const now_playing = async () => {
      try {
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();

        
        const movies = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/default-poster.png", // Fallback image
        }));

        nowplaying(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    const upcoming = async () => {
      try {
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();

        
        const movies = data.results.map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          image: movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : "/default-poster.png", // Fallback image
        }));

        upcomingmovie(movies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    
    upcoming()
    now_playing()
    popular_movies();
    top_rated();

  }, []);


  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black">
      <div className="h-14 w-full"></div>
        <div className="relative z-10 w-full">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 h-full w-full">
              <SparklesCore
              id="tsparticlesfullpage"
              background="transparent"
              minSize={0.6}
              maxSize={1.4}
              particleDensity={100}
              className="h-full w-full"
              particleColor="#FFFFFF"
            />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mx-auto max-w-5xl px-4 text-center"
        >
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500"
          >
            <Film className="h-10 w-10 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative mb-4 text-center text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Discover
            <span className="relative mx-2 whitespace-nowrap">
              <span className="relative bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                Your Next
              </span>
              <motion.span
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500"
              />
            </span>
            Story
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mx-auto mb-8 max-w-2xl text-base text-zinc-400 sm:text-lg md:text-xl"
          >
            Experience cinema like never before with our AI-powered recommendations,
            crafted uniquely for you.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <Search />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link href="/details/${movieId}">
              <Button size="lg" className="h-11 w-full bg-violet-600 px-6 text-base hover:bg-violet-700 sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="h-11 w-full border-zinc-700 px-6 text-base text-white hover:bg-zinc-900 sm:w-auto">
                Learn More
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16"
        >
       <h1 className="text-3xl font-bold text-white mb-6">
        Popular Movies
       </h1>
        <MovingCards items={popular} />
        <h1 className="text-3xl font-bold text-white mb-6">
        Now Playing
       </h1>
        <MovingCards items={now} />
        <h1 className="text-3xl font-bold text-white mb-6">
        Top Rated 
       </h1>
        <MovingCards items={top} />
        <h1 className="text-3xl font-bold text-white mb-6">
        Upcoming Movies
       </h1>  
        <MovingCards items={upcmg} />
        </motion.div>
      </div>
      <BackgroundBeams />
    </div>
  );
}


