"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] =
    useState("");

  function login(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (password === "hanish123") {
      localStorage.setItem(
        "isAdmin",
        "true"
      );

      window.location.href = "/write";
    } else {
      alert("Wrong password");
    }
  }

  return (
    <main className="min-h-screen bg-[#0B0B0F] text-white flex items-center justify-center px-8">
      <form
        onSubmit={login}
        className="bg-white/5 border border-white/10 p-10 rounded-3xl w-full max-w-md space-y-6"
      >
        <h1 className="text-4xl font-bold text-center">
          Admin Access
        </h1>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full p-4 rounded-xl bg-black border border-white/10"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-4 rounded-xl font-semibold"
        >
          Enter
        </button>
      </form>
    </main>
  );
}