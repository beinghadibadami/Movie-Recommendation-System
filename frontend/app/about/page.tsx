"use client";

import { motion } from "framer-motion";
import { Brain, Film, Sparkles, Zap } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Recommendations",
    description:
      "Our advanced machine learning model analyzes your preferences to suggest movies you'll love.",
  },
  {
    icon: Sparkles,
    title: "Personalized Experience",
    description:
      "Get recommendations tailored to your unique taste and viewing history.",
  },
  {
    icon: Film,
    title: "Extensive Movie Database",
    description:
      "Access a vast collection of movies across different genres and eras.",
  },
  {
    icon: Zap,
    title: "Real-time Updates",
    description:
      "Discover new movies as soon as they're available with our real-time recommendation system.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto min-h-screen px-4 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mb-4 text-4xl font-bold">About MovieMind</h1>
          <p className="mb-12 text-lg text-muted-foreground">
            Discover the perfect movie every time with our AI-powered recommendation
            system.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center rounded-lg border p-6 text-center"
            >
              <div className="mb-4 rounded-full bg-primary/10 p-3">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 rounded-lg border bg-card p-6"
        >
          <h2 className="mb-4 text-2xl font-bold">Tech Stack</h2>
          <ul className="list-inside list-disc space-y-2 text-muted-foreground">
            <li>Next.js for the frontend framework</li>
            <li>Tailwind CSS for styling</li>
            <li>Framer Motion for smooth animations</li>
            <li>Machine Learning model for recommendations</li>
            <li>RESTful API for data fetching</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}