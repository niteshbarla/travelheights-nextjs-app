import { useRouter } from "next/router";
import Head from "next/head";
import { getItineraryBySlug } from "../api/itinerary_api";
import { getRelatedBlogs } from "../api/blog_api";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import StaticOfferButton from "../../../components/StaticOfferButton";
import Link from "next/link";

// Fetch data server-side for SEO benefits
export async function getServerSideProps({ params }) {
  // Fetch the itinerary by slug
  const itinerary = await getItineraryBySlug(params.slug);

  // If itinerary is not found, return 404
  if (!itinerary) {
    return {
      notFound: true,
    };
  }

  // Normalize keywords for related blogs
  const itineraryKeywords = Array.isArray(itinerary.keywords)
    ? itinerary.keywords
    : itinerary.keywords
        .split(",")
        .map((keyword) => keyword.trim().toLowerCase());

  let relatedBlogs = [];
  try {
    const data = await getRelatedBlogs(itineraryKeywords);
    relatedBlogs = data.blogs || [];
  } catch (error) {
    console.error("Error fetching related blogs:", error);
  }

  return {
    props: {
      itinerary,
      relatedBlogs,
    },
  };
}

export default function ItineraryPage({ itinerary, relatedBlogs }) {
  const router = useRouter();
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // Ensure itinerary is defined
  if (!itinerary) {
    return <div>Itinerary not found.</div>;
  }

  // Ensure itinerary properties are defined
  const {
    title = "",
    description = "",
    keywords = [],
    images = [],
    days = [],
    cost = "",
    inclusions = [],
    exclusions = [],
    otherInfo = "",
  } = itinerary;

  return (
    <>
      <Head>
        <title>{title} - Triptrova</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords.join(", ")} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={images[0] || "/default.jpg"} />
        <meta
          property="og:url"
          content={`https://triptrova.com/itinerary/${itinerary.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      {/* Hero Section */}
      <div className="bg-blue-800 py-20 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl">{description}</p>
      </div>

      {/* Main Content */}
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Side - Itinerary Details */}
            <div className="w-full lg:w-3/4 bg-white p-8 rounded-lg shadow-lg">
              {/* Image Slider */}
              <div className="mb-10">
                <Swiper
                  modules={[Autoplay]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  loop={true}
                  className="rounded-lg shadow-lg"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className="w-full slider-heights object-cover rounded-lg"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex items-center justify-between p-4 mt-4">
                <h2 className="text-3xl underline font-bold text-blue-900">
                  Itinerary Details
                </h2>
                <StaticOfferButton
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-white font-semibold rounded-full"
                  onClick={() => console.log("Offer Clicked")}
                  label="Book Now"
                />
              </div>

              <div className="space-y-6">
                {days.map((day, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-6 rounded-lg shadow-sm"
                  >
                    <h3 className="text-2xl font-semibold text-blue-700 mb-3">
                      Day {index + 1}: {day.heading}
                    </h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                      {day.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Package Cost */}
              <div className="mt-8">
                <h2 className="text-3xl underline font-bold text-blue-900 mb-6">
                  Package Cost
                </h2>
                <p className="text-3xl underline font-semibold text-blue-900">
                  {cost}
                </p>
              </div>

              {/* Package Inclusions */}
              <div className="mt-8">
                <h2 className="text-3xl underline font-bold text-blue-900 mb-6">
                  Package Inclusions
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {inclusions.map((inclusion, index) => (
                    <li key={index} className="text-gray-700">
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Package Exclusions */}
              <div className="mt-8">
                <h2 className="text-3xl underline font-bold text-blue-900 mb-6">
                  Package Exclusions
                </h2>
                <ul className="list-disc list-inside space-y-2">
                  {exclusions.map((exclusion, index) => (
                    <li key={index} className="text-gray-700">
                      {exclusion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Other Information */}
              <div className="mt-8">
                <h2 className="text-3xl underline font-bold text-blue-900 mb-6">
                  Other Information
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {otherInfo}
                </p>
              </div>
            </div>

            {/* Right Side - Blog Section */}
            <div className="w-full lg:w-1/4">
              <div className="bg-blue-50 p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-6">
                  Related Blogs
                </h2>
                <div className="space-y-6">
                  {relatedBlogs.length > 0 ? (
                    relatedBlogs.map((blog) => (
                      <Link key={blog._id} href={`/blog/${blog.slug}`} passHref>
                        <div className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                          <h3 className="text-xl font-semibold text-blue-700 mb-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600">
                            {blog.excerpt ||
                              blog.description ||
                              "No description available."}
                          </p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-600">No related blogs found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Spacing */}
      <div className="h-20 bg-gray-100"></div>
    </>
  );
}
