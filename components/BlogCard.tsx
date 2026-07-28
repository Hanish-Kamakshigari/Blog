"use client";

import { motion } from "framer-motion";
import type { Post } from "@/types/blog";

export default function BlogCard({ blog }: { blog: Post }) {
  const readTime = Math.max(1, Math.ceil((blog.content || "").split(/\s+/).length / 200));
  const date = new Date(blog.created_at).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.a
      href={`/blog/${blog.slug}`}
      initial={{
        opacity: 0,
        y: 40,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{ once: true }}
      className="group bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 hover:-translate-y-2 transition duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={
            blog.cover_image ||
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
          }
          alt={blog.title}
          className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>

      <div className="p-7">
        <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime} min read</span>
        </div>

        <h2 className="text-3xl font-bold leading-tight mb-5 group-hover:text-blue-400 transition">
          {blog.title}
        </h2>

        <p className="text-gray-400 leading-8 line-clamp-3 text-lg">
          {blog.content}
        </p>

        <div className="mt-8 flex items-center justify-between">
          <span className="text-blue-400 font-medium">Read Article</span>

          <span className="text-2xl group-hover:translate-x-1 transition">
            →
          </span>
        </div>
      </div>
    </motion.a>
  );
}
