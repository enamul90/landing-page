/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "example.com",
      "anotherhost.com",
      "res.cloudinary.com",
    ], // ✅ Add the domain you're using
  },
};

export default nextConfig;
