export const dynamic = "force-dynamic";

import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { data: blogs } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-black">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-[#FAF9F6] border-b border-black/10">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <img
            src="/icon.png"
            alt="Logo"
            className="w-11 h-11 rounded-full object-cover border border-black/10"
          />

          <h1 className="text-3xl font-extrabold tracking-tight text-black">
            Just A Blog
          </h1>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <a
            href="mailto:hanishkamakshigari@gmail.com"
            className="text-gray-500 hover:text-black transition"
          >
            Contact
          </a>

          <a
            href="https://hanish-folio.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition"
          >
            <img
              src="/pp.jpeg"
              alt="Portfolio"
              className="w-10 h-10 rounded-full object-cover border border-black/10"
            />
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden px-8 py-28">
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <p className="text-gray-500 uppercase tracking-[0.3em] text-sm mb-6">
            Personal Tech Journal
          </p>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-8 text-black">
            Building, Learning
            <br />
            & Sharing
          </h1>

          <div className="text-gray-600 text-xl max-w-3xl mx-auto leading-9">
            <p className="text-2xl font-semibold text-black mb-4">
              Hi, I’m Hanish 👋
            </p>

            <p>
              I write about web development,
              AI, backend systems,
              projects, and ideas I discover
              while learning and building.
              This blog is my personal space
              to document experiments,
              tutorials, and thoughts.
            </p>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#latest"
              className="bg-black text-white hover:bg-gray-800 transition px-8 py-4 rounded-2xl font-semibold"
            >
              Explore Blogs
            </a>
          </div>
        </div>
      </section>

      {/* Latest Blogs */}
      <section
        id="latest"
        className="max-w-7xl mx-auto px-8 pb-24"
      >
        <div className="flex items-center justify-between mb-14">
          <div>
            <h2 className="text-5xl font-extrabold mb-3 text-black">
              Latest Blogs
            </h2>

            <p className="text-gray-500 text-lg">
              Recent thoughts and tutorials.
            </p>
          </div>

          <div className="text-gray-500 text-lg">
            {blogs?.length || 0} Articles
          </div>
        </div>

        {!blogs || blogs.length === 0 ? (
          <div className="border border-black/10 rounded-3xl p-16 text-center bg-white">
            <h2 className="text-4xl font-bold mb-4 text-black">
              No blogs yet
            </h2>

            <p className="text-gray-500 text-lg">
              Articles you publish will appear here.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogs.map((blog) => (
              <a
                key={blog.id}
                href={`/blog/${blog.slug}`}
                className="group bg-white border border-black/10 rounded-3xl overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition duration-300"
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={
                      blog.cover_image ||
                      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
                    }
                    alt={blog.title}
                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-7">
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-5">
                    <span>
                      {new Date(
                        blog.created_at
                      ).toLocaleDateString()}
                    </span>

                    <span>•</span>

                    <span>
                      1 min read
                    </span>
                  </div>

                  <h2 className="text-3xl font-bold leading-tight mb-5 text-black">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 leading-8 line-clamp-3 text-lg">
                    {blog.content}
                  </p>

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-black font-medium">
                      Read Article
                    </span>

                    <span className="text-2xl group-hover:translate-x-1 transition">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}