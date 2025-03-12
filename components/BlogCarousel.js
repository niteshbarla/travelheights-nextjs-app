"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BlogCard from "./BlogCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogCarousel() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8">
      {/* Section Title */}
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900">
        Latest Blogs
      </h2>

      {/* Swiper with Navigation */}
      <div className="relative">
        {/* Left Navigation Button */}
        <button className="swiper-button-prev group absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10 hover:scale-105 transition duration-300">
          <ChevronLeft
            size={24}
            className="group-hover:-translate-x-1 transition duration-300"
          />
        </button>

        {/* Swiper Component */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={15}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="px-4"
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog._id} className="pb-8">
              <BlogCard blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Right Navigation Button */}
        <button className="swiper-button-next group absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full z-10 hover:scale-105 transition duration-300">
          <ChevronRight
            size={24}
            className="group-hover:translate-x-1 transition duration-300"
          />
        </button>
      </div>
    </div>
  );
}
