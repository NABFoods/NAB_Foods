/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html', // If this is the one in the root at build time
    './src/**/*.{js,jsx,ts,tsx}', // Present in dev, necessary for local dev builds
    './dist/src/**/*.{js,jsx,ts,tsx}', // This is what's used in Docker production builds
    './client/dist/index.html', // Also exists in the final container
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
