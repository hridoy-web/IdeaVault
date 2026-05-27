"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { FaArrowRightLong } from "react-icons/fa6";

const HeroBanner = () => {
  const slides = [
    {
      image:
        "https://i.ibb.co.com/4ZgxBhHy/gpt-image-2-A-close-up-highly-detailed-photograph-of-three-creators-working-in-a-specialized-0.jpg",
      title: "Bring Your Startup Ideas To Life",
      description:
        "Share your innovative business concepts with a global community of creators, thinkers, and investors. Turn your vision into reality.",
    },
    {
      image:
        "https://i.ibb.co.com/9HYpPYST/Gemini-Generated-Image-vfmb0tvfmb0tvfmb-1.png",
      title: "Connect With Tech Innovators",
      description:
        "Discover next-generation technology and disruptive business models. Validate your startup path through real community feedback.",
    },
    {
      image:
        "https://i.ibb.co.com/GfBxfH8x/gpt-image-2-A-photorealistic-close-up-shot-of-a-modern-hardware-engineering-laboratory-A-gr-0.jpg",
      title: "Fuel The Future Of Innovation",
      description:
        "Collaborate on groundbreaking projects and find co-founders who share your passion. The next big thing starts right here.",
    },
  ];

  return (
    <main className="w-full bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300">

      <section className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">

        <Swiper
          modules={[Autoplay, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={true}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-[550px] md:h-[600px] relative"
        >
          {slides.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-full bg-slate-900 text-white"
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${slide.image}')` }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent dark:from-black/95 dark:via-black/70" />

              {/* Content */}
              <div className="relative z-10 w-11/12 mx-auto h-full flex items-center">
                <div className="max-w-2xl space-y-6 px-2 md:px-6">

                  {/* Badge */}
                  <div className="inline-flex items-center space-x-2 bg-blue-600/10 dark:bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-lg text-blue-400 text-xs font-semibold tracking-wide uppercase">
                    <span>Startup Idea Sharing Platform</span>
                  </div>

                  {/* Title + Description */}
                  <div className="space-y-3">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                      {slide.title}
                    </h1>

                    <p className="text-sm sm:text-base text-slate-300 dark:text-slate-300/90 leading-relaxed max-w-xl">
                      {slide.description}
                    </p>
                  </div>

                  {/* btn */}
                  <div className="pt-2">
                    <Link
                      href="/ideas"
                      className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-sm uppercase tracking-wide text-white bg-gradient-to-r from-[#006eff] to-indigo-600 hover:scale-105 transition-all shadow-lg shadow-blue-600/20"
                    >
                      Explore Ideas <FaArrowRightLong size={15} />
                    </Link>
                  </div>

                </div>
              </div>

            </SwiperSlide>
          ))}
        </Swiper>

      </section>
    </main>
  );
};

export default HeroBanner;