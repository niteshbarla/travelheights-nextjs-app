import { useEffect } from "react";

import Head from "next/head";
import Image from "next/image";

import Carousel from "../../components/Carousel";
import Breadcrumbs from "../../components/Breadcrumbs";
import TourSlider from "../../components/TourSlider";
import FirstContextIndex from "../../components/FirstContextIndex";
import CallToAction from "../../components/CallToAction";
import ClientFeedback from "../../components/ClientFeedback";

import { Geist, Geist_Mono } from "next/font/google";
// import "@/styles/home.module.style.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <>
      <Head>
        <title>Travel-Heights (Home Page)</title>
        <meta
          name="description"
          content="A Next.js application with optimized SEO and performance."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Carousel />
      <div className="p-3 w-full max-w-3xl mx-auto bg-gray-200 rounded-lg">
        <Breadcrumbs />
      </div>
      <div className="bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 margin-top mt-20">
        <div className="mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
            Explore Our Tour Packages
          </h1>
          <TourSlider />
        </div>
      </div>
      <FirstContextIndex />
      <CallToAction />
      <ClientFeedback />
    </>
  );
}
