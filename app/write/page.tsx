"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function WritePage() {
  const [authorized, setAuthorized] =
    useState(false);

  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  // Protect page
  useEffect(() => {
    const admin =
      localStorage.getItem("isAdmin");

    if (admin === "true") {
      setAuthorized(true);
    } else {
      window.location.href =
        "/hanish-admin-portal";
    }
  }, []);

  // Generate slug
  const slug = title
    .toLowerCase()
    .replaceAll(" ", "-");

  // Publish blog
  async function publishBlog(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("posts")
      .insert([
        {
          title,
          slug,
          content,
          cover_image: image,
        },
      ]);

    setLoading(false);

    if (error) {
  console.log(error);

  alert(
    error.message ||
    JSON.stringify(error)
  );

  return;
}

    alert("Blog published!");

    window.location.href = "/";
  }

  // Loading screen
  if (!authorized) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] text-black flex items-center justify-center">
        Checking access...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-8 py-16 bg-[#FAF9F6] text-black">
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <h1 className="text-5xl font-bold mb-10 border-b border-black/10 pb-4">
          Write a Blog
        </h1>

        {/* Form */}
        <form
          onSubmit={publishBlog}
          className="space-y-6"
        >
          {/* Title */}
          <input
            type="text"
            placeholder="Blog Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full p-4 bg-white border border-black/10 rounded-xl outline-none focus:border-black transition"
            required
          />

          {/* Slug Preview */}
          <div className="text-sm text-gray-500">
            Slug: {slug}
          </div>

          {/* Image URL */}
          <input
            type="text"
            placeholder="Cover Image URL"
            value={image}
            onChange={(e) =>
              setImage(e.target.value)
            }
            className="w-full p-4 bg-white border border-black/10 rounded-xl outline-none focus:border-black transition"
          />

          {/* Content */}
          <textarea
            placeholder="Write your blog..."
            rows={14}
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full p-4 bg-white border border-black/10 rounded-xl outline-none focus:border-black transition"
            required
          />

          {/* Publish Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-gray-800 text-white transition px-8 py-4 rounded-xl font-medium"
          >
            {loading
              ? "Publishing..."
              : "Publish Blog"}
          </button>
        </form>
      </div>
    </main>
  );
}