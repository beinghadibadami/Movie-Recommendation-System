"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";


export function Search() {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();

  // Fetch movie suggestions based on the query
  const fetchSuggestions = async (query: string) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/api/search?q=${query}`);
      const results = await response.json();
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  // Handle input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      fetchSuggestions(value.trim());
    } else {
      setSuggestions([]);
    }
  };

  // Handle movie selection
  const handleSelectMovie = (id: string) => {
    router.push(`/details/${id}`);
    setIsFocused(false);
    setQuery("");
    setSuggestions([]);
  };

  return (
    <motion.div
      className="relative mx-auto w-full max-w-2xl"
      initial={false}
      animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative">
        <SearchIcon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transform text-zinc-400" />
        <Input
          type="search"
          placeholder="Search movies..."
          className="h-14 w-full rounded-2xl border-zinc-800 bg-zinc-900/50 pl-12 pr-4 text-lg text-white backdrop-blur-sm placeholder:text-zinc-400 focus:border-violet-500 focus:bg-zinc-900/80 focus:ring-violet-500/20"
          value={query}
          onChange={handleSearchChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <AnimatePresence>
        {isFocused && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 backdrop-blur-lg"
          >
            <ul>
              {suggestions.map((movie: { id: string; title: string }) => (
                <li
                  key={movie.id}
                  className="cursor-pointer p-2 text-white hover:bg-zinc-800 rounded-lg"
                  onMouseDown={() => handleSelectMovie(movie.id)} // Use onMouseDown to avoid blur issues
                >
                  {movie.title}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
        {isFocused && !suggestions.length && query.trim() && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-zinc-800 bg-zinc-900/90 p-4 backdrop-blur-lg"
          >
            <p className="text-sm text-zinc-400">No movies found.</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
