import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Add your environment variables here
    // Example: API_URL: process.env.API_URL,
    // Variables prefixed with NEXT_PUBLIC_ are automatically exposed to the browser
    // You can access these in your client code via process.env.NEXT_PUBLIC_VARIABLE_NAME
  },
  // Add other config options here if needed
};

export default nextConfig;
