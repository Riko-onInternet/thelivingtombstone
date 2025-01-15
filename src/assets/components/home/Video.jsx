// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../css/mod-swiper.css";

const linkVideo = [
  {
    link: "9Zj0JOHJR-s",
    nome: "My Ordinary Life-The Living Tombstone",
  },
  {
    link: "X6ELpluyZyg",
    nome: "Five Nights At Freddy's SB Song - This Comes From Inside - The Living Tombstone",
  },
  {
    link: "2_ZhBy9tnpE",
    nome: "The Living Tombstone - Hit The Snooze",
  },
  {
    link: "T3hTwgDy_Ww",
    nome: "The Living Tombstone - Drunk",
  },
  {
    link: "DTbfw8_SMmI",
    nome: "The Living Tombstone - Alastor's Game (Hazbin Hotel Song)",
  },
  {
    link: "b-Npx69OOp8",
    nome: "Cuphead Remix- Floral Fury-The Living Tombstone",
  },
];

import React from 'react';

export default function Video() {
  return (
    <div className="bg-black dark:bg-[var(--riko-secondary)] py-4">
      <p className="text-white text-center impact uppercase text-6xl my-5">
        Video
      </p>
      <Swiper
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
        className="mod-white mt-10 mb-3"
      >
        {linkVideo.map((e, index) => (
          <SwiperSlide key={index} className="px-20">
            <div className="w-full max-w-[1200px] mx-auto mb-14 rounded-2xl overflow-hidden">
              <div className="video-wrapper">
                <iframe
                  className="responsive-video"
                  src={"https://www.youtube.com/embed/" + e.link}
                  title={e.nome}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen="1"
                ></iframe>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}