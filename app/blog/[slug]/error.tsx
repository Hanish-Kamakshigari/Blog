"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-[#FAF9F6] flex flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-bold text-black">Failed to load article</h1>
      <p className="text-gray-500">Something went wrong fetching this post.</p>
      <button
        onClick={() => reset()}
        className="bg-black text-white hover:bg-gray-800 transition px-6 py-3 rounded-xl font-semibold"
      >
        Try again
      </button>
    </main>
  );
}
