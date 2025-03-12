import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import Image from "next/image";

const Carousel = () => {
  const slides = [
    {
      id: 1,
      image: "/banners/banner1_tigernest_image.webp", // Replace with your image path
      alt: "Slide 1",
      title: "Welcome to Travel-Heights",
      description: "Discover the best features of our platform.",
    },
    {
      id: 2,
      image: "/banners/banner1_gurudongmar_lake.png", // Replace with your image path
      alt: "Slide 2",
      title: "Modern Design",
      description: "Experience a sleek and responsive design.",
    },
    {
      id: 3,
      image: "/banners/banner3_darjeeling.png", // Replace with your image path
      alt: "Slide 3",
      title: "Easy to Use",
      description: "Intuitive and user-friendly interface.",
    },
  ];

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        loop={true} // Enable infinite looping
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          reverseDirection: false, // Ensure it only moves forward
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-4">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl max-w-2xl">
                  {slide.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel;
