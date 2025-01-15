import { useState } from "react";
import { useParams } from "react-router-dom";
import items from "../../database/items.jsx";
import { FormControl, Select } from "@chakra-ui/react";
import { useCart } from "../provider/CartProvider";
import Merch from "../components/home/Merch.jsx";
import { useToast } from "@chakra-ui/react"; 

const Prodotto = () => {
  const { id } = useParams();
  const prodotto = items.find((item) => item.id === parseInt(id));
  const [quantita, setQuantita] = useState(1);
  // Imposta taglia solo se esistono taglie disponibili
  const [taglia, setTaglia] = useState(
    prodotto.taglie && prodotto.taglie.length > 0 ? prodotto.taglie[0] : null
  );
  const { addToCart } = useCart();
  const toast = useToast(); 

  if (!prodotto) {
    return <div>Prodotto non trovato</div>;
  }

  const handleAggiungiAlCarrello = () => {
    addToCart(
      {
        id: prodotto.id,
        nome: prodotto.nome,
        taglia,
        quantita,
        prezzo: prodotto.prezzo,
        img: prodotto.img1
      },
      quantita
    );

    // Mostra il toast dopo l'aggiunta al carrello
    toast({
      title: (
        <a href="/cart">
          <p>Prodotto aggiunto al carrello</p>
        </a>
      ),
      description: `${prodotto.nome} è stato aggiunto al carrello.`,
      status: "success",
      duration: 3000,
      position: "bottom-right",
      isClosable: true,
    });
  };

  return (
    <>
      <div className="mt-[100px] max-w-[1600px] mx-auto">
        <div className="p-10">
          <div className="flex justify-center items-start flex-col lg:flex-row gap-4 ">
            {/* Immagini */}
            <div className="grid sm:grid-cols-3 grid-rows-3 sm:grid-rows-none gap-4">
              {/* Immagine 1 */}
              <div className="sm:col-span-2 row-span-1">
                <img
                  src={prodotto.img1}
                  alt={prodotto.nome}
                  className="w-full rounded-3xl bg-gray-200 dark:bg-white"
                />
              </div>
  
              {/* Immagine 2 Mobile */}
              <div className="sm:col-span-2 row-span-1 sm:hidden">
                <img
                  src={prodotto.img2}
                  alt={prodotto.nome}
                  className="w-full rounded-3xl bg-gray-200 dark:bg-white"
                />
              </div>
  
              {/* Immagine 3 Mobile */}
              <div className="sm:col-span-2 row-span-1 sm:hidden">
                <img
                  src={prodotto.img3}
                  alt={prodotto.nome}
                  className="w-full rounded-3xl bg-gray-200 dark:bg-white"
                />
              </div>
  
              {/* Immagine 2 & 3 PC */}
              <div className="sm:col-span-1 hidden sm:flex">
                <div className="flex flex-col gap-4">
                  <img
                    src={prodotto.img2}
                    alt={prodotto.nome}
                    className="w-full rounded-3xl bg-gray-200 dark:bg-white"
                  />
                  <img
                    src={prodotto.img3}
                    alt={prodotto.nome}
                    className="w-full rounded-3xl bg-gray-200 dark:bg-white"
                  />
                </div>
              </div>
            </div>
  
            {/* Dati prodotto */}
            <div className="max-w-[700px] w-full dark:bg-[var(--riko-secondary)] p-4 rounded-3xl">
              <div className="h-full flex flex-col gap-4">
                {/* Titolo */}
                <p className="text-2xl font-bold text-black dark:text-white">
                  {prodotto.nome}
                </p>
  
                {/* Descrizione */}
                <p className="text-base text-black dark:text-white">
                  {prodotto.descrizione}
                </p>
  
                {/* Prezzo */}
                <p className="text-xl font-bold text-black dark:text-white">
                  {(prodotto.prezzo * quantita).toFixed(2)} €
                </p>
  
                {/* Quantità */}
                <div>
                  <p className="text-black dark:text-white font-bold">Quantità:</p>
                  <FormControl className="!w-[200px] bg-white rounded-lg text-black">
                    <Select
                      value={quantita}
                      onChange={(e) => setQuantita(parseInt(e.target.value))}
                      className="cursor-pointer !py-0"
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Select>
                  </FormControl>
                </div>
  
                {/* Taglie */}
                {prodotto.taglie && prodotto.taglie.length > 0 && (
                  <div>
                    <p className="text-black font-bold">Taglia</p>
                    <FormControl className="!w-[200px] bg-white rounded-lg text-black">
                      <Select
                        value={taglia}
                        onChange={(e) => setTaglia(e.target.value)}
                      >
                        {prodotto.taglie.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                )}
  
                {/* Bottone Aggiungi al Carrello */}
                <button
                  onClick={handleAggiungiAlCarrello}
                  className="bg-[var(--riko-primary)] max-w-[200px] font-bold text-black px-4 py-2 rounded-md mt-4"
                >
                  Aggiungi al carrello
                </button>
              </div>
            </div>
          </div>
        </div>
  
      </div>
      <Merch title="Altri prodotti" />
    </>
  );
};

export default Prodotto;
