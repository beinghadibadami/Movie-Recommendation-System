"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MovingCards } from "@/components/moving-cards";

interface CastMember {
  id: number;
  original_name: string;
  character: string;
  profile_path: string | null;
}

interface Recommendation {
  id: number;
  title: string;
  poster_path: string | null;
}

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  release_date: string;
  genre: string;
  runtime: number;
  poster: string ;
  cast: CastMember[];
  recommendations: Recommendation[];
}

export default function DetailsPage() {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const params = useParams();
  const id = params?.id;

  useEffect(() => {
    if (!id) return;

    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`/api/details/${id}`, {
          headers: { Connection: "keep-alive" },
        });
        
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data: MovieDetails = await response.json();
        setMovieDetails(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!movieDetails) return <p>Loading...</p>;

  const {
    title,
    overview,
    release_date,
    genre,
    runtime,
    poster,
    cast,
    recommendations,
  } = movieDetails;

  const recommendedMovies = recommendations.map((movie: any) => ({
    id: movie.id,
    title: movie.title,
    image: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/default-poster.png",
  }));

  return (
    <div className="p-6 bg-black text-white">
      <div className="h-14 w-full"></div>
      <div className="flex gap-4">
        {/* Updated poster image with proper conditional rendering */}
        <div className="w-64 h-auto object-contain flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={poster}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{title}</h1>
          <p className="mt-2 text-gray-400">
            {release_date || "Unknown release date"} | {genre} | {runtime}
          </p>
          <h2 className="mt-8 text-2xl font-bold ">Overview</h2>
          <p className="mt-4">{overview}</p>
        </div>
      </div>

      {/* Added margin-top for spacing */}
      <div className="mt-4">
        <h2 className="text-2xl font-semibold mb-4">Top Billed Cast</h2>
        <div className="flex gap-4 overflow-x-auto pb-4">
          {cast.map((actor) => (
            <div key={actor.id} className="flex-shrink-0">
              {/* Updated cast member card with new dimensions */}
              <div className="w-[180px]">
                <div className="w-full h-[270px] rounded-lg overflow-hidden">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                        : "/default-profile.png"
                    }
                    alt={actor.original_name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-2">
                  <p className="font-semibold text-sm">{actor.original_name}</p>
                  <p className="text-gray-400 text-sm">{actor.character}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold">Recommendations for {title}</h2>
        <div className="flex gap-4 mt-4">
          <MovingCards items={recommendedMovies} />
        </div>
      </div>
    </div>
  );
}