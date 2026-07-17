import type { NextConfig } from "next";

// For GitHub Pages deployment at https://htc85235-jpg.github.io/css-guide/
// basePath + assetPrefix must match the repo name. Images and static assets
// are served from /css-guide/..., not /.
const isGithubPages = process.env.GITHUB_ACTIONS === "true";
const repo = "css-guide";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files — use export output.
  // (Vercel/Netlify ignore this and use their own server runtime.)
  output: "export",
  images: {
    // GitHub Pages static export cannot use the Next.js image optimizer.
    unoptimized: true,
  },
  // Serve all assets under /css-guide/... so they resolve on Pages.
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : undefined,
  // Trailing slash makes GitHub Pages work for all routes including /about etc.
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
