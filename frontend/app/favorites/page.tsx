"use client";

import { motion } from "framer-motion";
import { MovieCard } from "@/components/movie-card";

// Mock data - replace with actual favorites from local storage or API
const mockFavorites = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  title: `Favorite Movie ${i + 1}`,
  description: "One of your favorite movies.",
  genre: "Various",
  rating: 5,
  poster: `https://source.unsplash.com/random/300x450?movie&sig=${i + 100}`,
}));

export default function FavoritesPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-3xl font-bold">Your Favorites</h1>

        {mockFavorites.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockFavorites.map((movie, index) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-muted-foreground">
              You haven't added any favorites yet.
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}