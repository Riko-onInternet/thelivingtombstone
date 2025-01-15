// Import Swiper React components
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../../css/mod-swiper.css";

import { Link } from "react-router-dom";

import items from "../../../database/items.jsx";

const MerchForHome = ({ title, HomeBg }) => {
  return (
    <div
      className={`
        ${HomeBg === true ? "bg-[var(--riko-primary)] dark:bg-black" : ""} 
        py-4`}
    >
      <div className="flex items-center justify-center mt-4">
        <p
          className="
          text-center text-6xl p-2 uppercase impact flex items-center justify-center gap-4 
          text-black dark:text-white
          "
        >
          {title}
        </p>
      </div>

      <Swiper
        spaceBetween={0}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        className="mod-black"
        modules={[Pagination, Navigation]}
        breakpoints={{
          150: {
            slidesPerView: 1,
          },
          992: {
            slidesPerView: 2,
          },
          1500: {
            slidesPerView: 4,
          },
        }}
      >
        {items.slice(0, 6).map((item) => (
          <SwiperSlide key={item.id}>
            <div className="card w-[250px] sm:w-[300px] md:w-[350px] bg-white text-black dark:bg-[var(--riko-secondary)] shadow-xl mt-10 mb-14 mx-auto">
              <a href={`/shop/${item.id}`}>
                <figure className="px-4">
                  <img
                    src={item.img1}
                    alt={item.nome}
                    className="drop-shadow-merch"
                  />
                </figure>
              </a>
              <div className="card-body p-4 sm:p-8">
                <a
                  href={`/shop/${item.id}`}
                  className="card-title dark:text-white"
                >
                  {item.nome}
                </a>
                <p className="overflow-hidden whitespace-nowrap text-ellipsis dark:text-white">
                  {item.descrizione}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <a
                    href={`/shop/${item.id}`}
                    className="btn bg-black hover:bg-black w-full border-0 text-white dark:bg-[var(--riko-primary)] dark:text-black"
                  >
                    Visualizza prodotto
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="w-full flex items-center justify-center pt-2 mt-4 mb-6">
        <a
          href="/shop"
          className={`btn bg-transparent text-white hover:bg-white/10 ${
            HomeBg !== true
              ? "border-[var(--riko-primary)] hover:border-[var(--riko-btn-hover)] hover:text-[var(--riko-btn-hover)] !text-[var(--riko-primary)]"
              : ""
          }`}
        >
          Visualizza tutti i prodotti
        </a>
      </div>
    </div>
  );
};

export default MerchForHome;
