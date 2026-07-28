import Link from "next/link";
import { supabase } from "@/lib/supabase";
import type { Metadata } from "next";
import type { Post } from "@/types/blog";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { data: blog } = await supabase
    .from("posts")
    .select("title, content, cover_image")
    .eq("slug", slug)
    .single();

  if (!blog) return { title: "Blog not found" };

  return {
    title: blog.title,
    description: blog.content?.slice(0, 160),
    openGraph: blog.cover_image ? { images: [blog.cover_image] } : undefined,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const { data: blog, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .single();

  const { data: recommendations } = await supabase
    .from("posts")
    .select("*")
    .neq("slug", slug)
    .limit(4);

  const post = blog as Post;
  const related = (recommendations || []) as Post[];

  if (error || !post) {
    return (
      <main className="p-10 min-h-screen bg-[#FAF9F6] text-black">
        <h1 className="text-2xl font-bold">
          Blog not found
        </h1>
      </main>
    );
  }

  const readTime = Math.max(1, Math.ceil((post.content || "").split(/\s+/).length / 200));
  const dateObj = new Date(post.created_at);
  const dateString = dateObj.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <main className="min-h-screen pb-24 bg-[#FAF9F6] text-black">
      <nav className="px-8 py-8 max-w-4xl mx-auto">
        <Link href="/" className="text-gray-500 hover:text-black flex items-center gap-2 transition w-fit font-medium">
          &larr; Back to Home
        </Link>
      </nav>

      <article className="max-w-4xl mx-auto px-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center text-sm text-gray-500 mb-8 pb-8 border-b border-black/10">
          <div className="flex items-center gap-2 mt-0.5 text-xs">
            <span>{dateString}</span>
            <span>&bull;</span>
            <span>{readTime} min read</span>
          </div>
        </div>

        {post.cover_image && (
          <img
            src={post.cover_image}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-sm"
          />
        )}

        <div className="text-lg leading-relaxed whitespace-pre-line text-gray-800">
          {post.content}
        </div>
      </article>

      {related.length > 0 && (
        <section className="max-w-4xl mx-auto px-8 mt-24 pt-12 border-t border-black/10">
          <h3 className="text-2xl font-bold mb-8">More to read</h3>
          <div className="grid sm:grid-cols-2 gap-8">
            {related.map((rec) => {
              const recReadTime = Math.max(1, Math.ceil((rec.content || "").split(/\s+/).length / 200));
              return (
                <a
                  key={rec.id}
                  href={`/blog/${rec.slug}`}
                  className="group flex flex-col bg-white border border-black/10 rounded-xl overflow-hidden hover:shadow-md transition"
                >
                  <div className="h-40 overflow-hidden border-b border-black/10">
                    <img
                      src={rec.cover_image || "https://images.unsplash.com/photo-1498050108023-c5249f4df085"}
                      alt={rec.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <h4 className="font-bold mb-2 group-hover:text-gray-600 transition line-clamp-2 text-black">
                      {rec.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                      {rec.content}
                    </p>
                    <div className="text-xs text-gray-400 mt-auto pt-4 border-t border-black/10">
                      {recReadTime} min read
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
}