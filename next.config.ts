import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Folder proyek berada beberapa level di dalam home, jadi Turbopack
  // menebak root sebagai home dan menolak membaca package-lock.json.
  // Pin root ke folder proyek ini.
  turbopack: {
    // Folder proyek berada beberapa level di dalam home, jadi Turbopack
    // menebak root sebagai home dan menolak membaca package-lock.json.
    // Pin root ke folder proyek ini.
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;