import Link from "next/link";

const BannerSection = () => {
  return (
    <section
      className="relative h-[400px] md:h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/banners/package_page.jpg')", // Replace with your banner image path
      }}
    >
      {/* Overlay to darken the background image */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Explore the World with Us
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Discover amazing destinations and create unforgettable memories.
        </p>
        <Link
          href="/packages"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          Check Out the Packages Below
        </Link>
      </div>
    </section>
  );
};

export default BannerSection;
