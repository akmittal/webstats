/** @type {import('next').NextConfig} */

module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: `http://localhost:8000/api/:slug*`,
      },
    ];
  },
  reactStrictMode: true,
};
