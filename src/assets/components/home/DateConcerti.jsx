import React, { useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import date from '../../../database/ticket';
import { useCart } from "../../provider/CartProvider";
import { useToast } from "@chakra-ui/react"; // Importa useToast

export default function DateConcerti() {
  const { addToCart } = useCart();
  const toast = useToast(); // Crea l'istanza di toast

  const handleAddToCart = (location) => {
    const newTicket = {
      id: `${location.id}-${location.giorno}-${location.mese}-${location.anno}-${location.ora}-${location.luogo}`, // ID più univoco
      giorno: location.giorno,
      mese: location.mese,
      anno: location.anno,
      ora: location.ora,
      luogo: location.luogo,
      citta: location.citta,
      prezzo: location.prezzo,
    };
    const quantita = 1;

    addToCart(newTicket, quantita);

    // Mostra il toast dopo l'aggiunta al carrello
    toast({
      title: (
        <a href="/cart">
          <p>Prodotto aggiunto al carrello</p>
        </a>
      ),
      description: `${newTicket.luogo} è stato aggiunto al carrello.`,
      status: "success",
      duration: 5000,
      position: "bottom-right",
      isClosable: true,
    });
  };

  return (
    <div className="dark:bg-black bg-[var(--riko-primary)] pb-6 pt-10">
      <div>
        <div className="flex items-center justify-center">
          <p className="text-center text-6xl p-2 uppercase impact dark:text-white text-black">
            Tour
          </p>
        </div>
      </div>
      <div>
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
          {date[1].location.map((d, index) => (
            <SwiperSlide key={index}>
              <div className="block mx-auto w-max my-10 shadow-date rounded-lg overflow-hidden">
                <div className="w-[300px] h-[300px]  mx-auto relative">
                  <div className="absolute z-10 top-0 right-0 w-[70px] h-[70px] bg-red-50">
                    <div className="flex flex-col items-center h-full">
                      <p className="w-full text-center py-0.5 uppercase font-bold bg-red-600">
                        {d.mese.slice(0, 3)}
                      </p>
                      <p className="flex items-center justify-center h-full text-3xl mb-1 font-bold text-black">
                        {d.giorno}
                      </p>
                    </div>
                  </div>
                  <div className="relative h-full z-0">
                    <img className="object-cover w-full h-full" src={d.bg} alt={d.luogo} />
                    <div className="absolute bottom-0 p-2 w-full bg-[#131313]/50 backdrop-blur-md">
                      <div className="mb-3">
                        <p className="font-bold">{d.citta}</p>
                        <p className="text-sm overflow-hidden whitespace-nowrap text-ellipsis" title={d.luogo}>{d.luogo}</p>
                        <p className="text-sm font-bold" title={d.ora}>{d.ora}</p>
                      </div>
                      <button
                        className="btn text-black w-full dark:bg-[var(--riko-primary)] dark:hover:bg-[var(--riko-btn-hover)] border-0"
                        onClick={() => handleAddToCart(d)}
                      >
                        Aggiungi al carrello
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="w-full flex items-center justify-center pt-2 my-4">
          <a
            href="/tours"
            className="btn bg-transparent text-white hover:bg-white/10"
          >
            Visualizza tutte le date
          </a>
        </div>
      </div>
    </div>
  );
}
