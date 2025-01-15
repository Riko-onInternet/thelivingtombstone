import React, { useState } from "react";
import ticket from "../../database/ticket";
import { useCart } from "../provider/CartProvider";
import { useToast } from "@chakra-ui/react"; 

import { IoIosSearch } from "react-icons/io";

export default function Tours() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const toast = useToast(); 

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
          <p>Biglietto aggiunto al carrello</p>
        </a>
      ),
      description: `${location.luogo} è stato aggiunto al carrello.`,
      status: "success",
      duration: 3000,
      position: "bottom-right",
      isClosable: true,
    });
  };

  const filteredTickets = ticket
    .map((tour) => ({
      ...tour,
      location: tour.location.filter(
        (loc) =>
          loc.citta.toLowerCase().includes(searchTerm.toLowerCase()) ||
          loc.luogo.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((tour) => tour.location.length > 0);

  const totalLocations = filteredTickets.reduce(
    (acc, curr) => acc + curr.location.length,
    0
  );

  return (
    <div className="mt-[100px]">
      {/* Hero */}
      <div className="w-full h-[400px] bg-[url('/img/bg/TLTChosen4.jpg')] bg-cover bg-center mt-[100px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full backdrop-blur-md text-center">
          <div className="relative">
            <p className="text-7xl relative z-10 font-bold text-center mb-10">
              Tours
            </p>
            <p className="text-7xl font-bold text-center mb-10 absolute top-0 left-0 text-border-20">
              Tours
            </p>
          </div>
        </div>
      </div>

      <div className="w-full bg-gray-50 dark:bg-black pt-10">
        <div className="w-full flex justify-center items-center px-4">
          {/* Cerca */}
          <div className="flex items-center w-[300px] bg-white dark:bg-[var(--riko-secondary)] rounded-md overflow-hidden border border-[var(--riko-primary)] dark:border-transparent">
            <label htmlFor="search" className="cursor-text py-4 pl-4">
              <IoIosSearch className="text-2xl text-black dark:text-[var(--riko-primary)]" />
            </label>
            <input
              type="text"
              className="w-full focus-visible:outline-none focus-visible:border-0 text-black dark:text-white dark:bg-[var(--riko-secondary)] border-0 py-4"
              placeholder="Cerca..."
              value={searchTerm}
              id="search"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-black py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="bg-white dark:bg-[var(--riko-secondary)] myBS mx-4">
            <div className="flex flex-col gap-4">
              <div className="bg-gray-200 dark:bg-[var(--riko-bg-2)] p-4 px-6">
                <p className="font-semibold text-black dark:text-white">
                  <span id="tours-count">{totalLocations}</span> Eventi futuri
                </p>
              </div>

              <div className="flex justify-center flex-col px-6 pb-6">
                {filteredTickets.map((tour) => (
                  <div key={tour.id} className="flex flex-col gap-4 mb-10">
                    <div>
                      <p className="font-bold text-xl text-black dark:text-white">
                        {tour.regione}
                      </p>
                      <p className="text-black dark:text-white">
                        {tour.location.length} Eventi
                      </p>
                    </div>
                    {tour.location.map((location) => (
                      <div
                        key={location.id}
                        className="md:grid flex flex-col md:grid-cols-12 py-4 gap-2 lg:gap-4 md:px-4 rounded-xl text-black dark:text-white border dark:border-[var(--riko-primary)]"
                      >
                        <div className="md:col-span-2 h-full text-center">
                          <div className="flex flex-col items-center">
                            <p className="font-bold text-3xl text-[var(--riko-primary)]">
                              {location.giorno}
                            </p>
                            <p className="font-bold text-lg">
                              {location.mese + " " + location.anno}
                            </p>
                            <p>{location.gSett + " " + location.ora}</p>
                          </div>
                        </div>

                        <div className="md:col-span-8 md:border-l h-full px-9 text-center md:text-start">
                          <div className="flex flex-col h-full justify-center">
                            <p className="font-bold text-xl md:text-3xl">
                              {location.citta}
                            </p>
                            <p className="text-base">{location.luogo}</p>
                          </div>
                        </div>

                        <div className="md:col-span-2">
                          <div className="flex flex-col h-full justify-center gap-2 items-center">
                            <p className="text-lg font-bold">
                              {"Da € " + location.prezzo.toFixed(2)}
                            </p>
                            <button
                              className="bg-[var(--riko-primary)] text-black font-bold px-4 py-2 text-sm rounded-md"
                              onClick={() => handleAddToCart(location)}
                            >
                              Aggiungi al carrello
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
