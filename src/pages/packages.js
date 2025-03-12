import Head from "next/head";
import ClientFeedback from "../../components/ClientFeedback";
import TourPackagesTable from "../../components/TourPackagesTable";
import TourPackageFilter from "../../components/TourPackageFilter";
import TourPackageExpandableContent from "../../components/TourPackageExpandableContent";
import PackagePageBanner from "../../components/PackagePageBanner";
import BlogCarousel from "../../components/BlogCarousel";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Sample text for the expandable content
const sampleText = `Travel-Heights opens the door to unforgettable adventures and meaningful travel experiences. As a trusted travel agency, we specialize in creating lasting connections with explorers, leading them to carefully selected destinations for journeys filled with excitement and discovery. Every trip we design is thoughtfully tailored, ensuring each traveler finds a destination that resonates with their sense of adventure.
At Travel-Heights, we pride ourselves on delivering customized travel solutions that fit a variety of tastes and budgets. We provide travel packages that go beyond the typical experience, offering moments of awe and exploration. Our experienced team, with deep knowledge of tourism and hospitality, is dedicated to curating unique trips that leave lasting memories.
At the heart of Travel-Heights's ethos lies a commitment to warmth and hospitality, ensuring that every traveler feels embraced and cherished throughout their sojourn. From the rugged landscapes of Sikkim to the mist-shrouded vistas of Darjeeling, from the mythical realms of Bhutan to the verdant expanses of the Elephant Corridor, we offer a gateway to a world of unparalleled beauty and intrigue.
What sets Travel-Heights apart is our commitment to personal attention and warm hospitality. From the scenic beauty of Sikkim’s hills to the lush valleys of Darjeeling, from Bhutan’s cultural richness to the green expanses of the Elephant Corridor, we bring travelers closer to some of the most breathtaking spots on the map.
Our thoughtfully planned itineraries allow travelers to immerse themselves in nature, explore its wonders, and appreciate its grandeur. Whether it's towering mountains or peaceful valleys, vibrant cities or quiet countryside, each place tells a story that’s waiting to be explored.
Embark on a journey of discovery with Travel-Heights, where every trip brings new experiences and lifelong memories. Let us be the ones to guide you on an unforgettable adventure that starts just beyond your doorstep.
`;

// Fetch data from MongoDB using getServerSideProps
export async function getServerSideProps() {
  try {
    // Fetch data from your API routes or directly from MongoDB
    const [
      tourPackagesRes,
      bestsellingTourPackagesRes,
      clientFeedbacksRes,
      blogsRes,
    ] = await Promise.all([
      fetch("http://localhost:3000/api/tour-packages"),
      fetch("http://localhost:3000/api/bestselling-tour-packages"),
      fetch("http://localhost:3000/api/client-feedbacks"),
      fetch("http://localhost:3000/api/blogs"),
    ]);

    const tourPackages = await tourPackagesRes.json();
    const bestsellingTourPackages = await bestsellingTourPackagesRes.json();
    const clientFeedbacks = await clientFeedbacksRes.json();
    const blogs = await blogsRes.json();

    return {
      props: {
        tourPackages,
        bestsellingTourPackages,
        clientFeedbacks,
        blogs,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        tourPackages: [],
        bestsellingTourPackages: [],
        clientFeedbacks: [],
        blogs: [],
      },
    };
  }
}

export default function Packages({
  tourPackages,
  bestsellingTourPackages,
  clientFeedbacks,
  blogs,
}) {
  return (
    <>
      <Head>
        <title>Tour Packages</title>
        <meta
          name="description"
          content="Explore our exclusive tour packages and plan your next adventure with Travel-Heights."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PackagePageBanner />
      <div className="p-3 w-full max-w-3xl mx-auto bg-gray-200 rounded-lg">
        <Breadcrumbs />
      </div>
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-4 w-full max-w-3xl mx-auto p-4 bg-white rounded-lg">
          An Adventure At Your Doorstep
        </h1>
        <TourPackageExpandableContent content={sampleText} previewLines={3} />
      </div>
      <TourPackagesTable bestsellingTourPackages={bestsellingTourPackages} />
      <TourPackageFilter tourPackages={tourPackages} />
      <main className="max-h-screen flex flex-col items-center justify-center bg-gray-100">
        <BlogCarousel blogs={blogs} />
      </main>
      <ClientFeedback clientFeedbacks={clientFeedbacks} />
    </>
  );
}
