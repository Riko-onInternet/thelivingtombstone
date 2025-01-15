import { useCart } from "../provider/CartProvider";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

import { FaRegTrashCan } from "react-icons/fa6";

export default function Cart() {
  const { cartItems, setCartItems } = useCart();

  // Funzione per calcolare il totale
  const calculateTotal = () => {
    return cartItems
      .reduce((acc, item) => acc + item.prezzo * item.quantita, 0)
      .toFixed(2);
  };

  // Funzione di aggiornamento della quantità per gestire id e taglia
  const updateItemQuantity = (id, size, quantity) => {
    const newCartItems = cartItems.map((item) => {
      if (item.id === id && item.taglia === size) {
        return { ...item, quantita: quantity };
      }
      return item;
    });
    setCartItems(newCartItems);
  };

  // Funzione per rimuovere un oggetto dal carrello
  const removeFromCart = (id, size) => {
    const newCartItems = cartItems.filter(
      (item) => !(item.id === id && item.taglia === size)
    );
    setCartItems(newCartItems);
  };

  return (
    <div className="py-[100px] min-h-[calc(100vh-100px)] bg-black">
      <div className="pt-10">
        <div className="flex flex-col gap-10">
          {/* Titolo */}
          <div className="border-b-2 border-white px-8 2xl:px-0">
            <p className="p-4 max-w-[1600px] w-full mx-auto text-3xl font-bold">
              Carrello
            </p>
          </div>

          {/* Content */}
          <div className="max-w-[1200px] w-full mx-auto px-8 2xl:px-0">
            <div className="grid lg:grid-cols-3 grid-cols-2 lg:gap-10 gap-4 pb-10">
              {/* Oggetti inseriti nel carrello */}
              <div className="col-span-2">
                <div id="prodCarted" className="flex flex-col gap-4">
                  {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center ">
                      <div className="w-full text-center py-5 bg-[var(--riko-bg-1)] dark:bg-black text-white dark:text-white rounded-xl">
                        <p className="text-3xl font-bold mb-4">
                          Il carrello è vuoto
                        </p>
                        <p className="text-sm opacity-50">
                          Aggiungi dei prodotti per iniziare a comprare
                        </p>
                      </div>
                    </div>
                  ) : (
                    cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center sm:p-4 sm:pr-8 p-2 border rounded-xl border-gray-200 bg-white"
                      >
                        {/* Img & Titolo */}
                        <div className="flex flex-col sm:flex-row items-center">
                          <img
                            className="size-28 p-4"
                            src={
                              item.img
                                ? item.img
                                : "https://cdn.hugeicons.com/icons/ticket-star-stroke-rounded.svg"
                            }
                            alt={item.nome}
                          />
                          <div className="flex flex-col text-black">
                            {item.nome ? (
                              <>
                                <a
                                  className="text-xl font-bold"
                                  href={`/shop/${item.id}`}
                                >
                                  {item.nome}
                                </a>
                                {item.taglia && <p>Taglia: {item.taglia}</p>}
                              </>
                            ) : (
                              <>
                                <p className="text-xl font-bold">
                                  {item.citta &&
                                    item.citta + " (" + item.ora + ")"}
                                </p>
                                {item.luogo && <p>{item.luogo}</p>}
                              </>
                            )}
                          </div>
                        </div>

                        {/* Quantità */}
                        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto px-2 sm:px-0 gap-4">
                          <NumberInput
                            key={`${item.id}-${item.taglia}-${item.mese}-${item.giorno}-${item.ora}`}
                            className="max-w-[100px] rounded-md"
                            min={1}
                            defaultValue={item.quantita}
                            onChange={(valueString) =>
                              updateItemQuantity(
                                item.id,
                                item.taglia,
                                parseInt(valueString)
                              )
                            }
                          >
                            <NumberInputField className="text-black" />
                            <NumberInputStepper>
                              <NumberIncrementStepper className="!text-black" />
                              <NumberDecrementStepper className="!text-black" />
                            </NumberInputStepper>
                          </NumberInput>

                          {/* Remove BTN */}
                          <button
                            onClick={() => removeFromCart(item.id, item.taglia)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <FaRegTrashCan className="size-6" />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Totale Carrello */}
              <div className="col-span-2 lg:col-span-1">
                <div className="bg-[var(--riko-primary)] dark:bg-[var(--riko-secondary)] p-4 rounded-xl">
                  <p className="text-xl font-bold mb-6 text-black dark:text-white">
                    Resoconto
                  </p>

                  <div id="prodTotal">
                    {cartItems.map((item, index) => (
                      <div
                        key={index}
                        className="pb-2 mb-2 border-b-2 border-black dark:border-white"
                      >
                        <p className="text-lg text-black dark:text-white">
                          {item.nome}
                          {item.citta && item.citta + " (" + item.luogo + ")"}
                        </p>
                        {item.taglia && (
                          <p className="text-black dark:text-white">
                            Taglia: {item.taglia}
                          </p>
                        )}
                        <p className="text-black dark:text-white">
                          Prezzo Totale:{" "}
                          {(item.prezzo * item.quantita).toFixed(2)}€
                        </p>
                      </div>
                    ))}
                    <div className="flex flex-col gap-4">
                      <p
                        className="text-lg font-bold mt-4 text-black dark:text-white"
                        id="allTotal"
                      >
                        Totale carrello: {calculateTotal()}€
                      </p>
                      <a
                        href={cartItems.length > 0 ? "/checkout" : "#"}
                        className={`font-bold text-center p-4 rounded-xl ${
                          cartItems.length > 0
                            ? "bg-black dark:bg-[var(--riko-primary)] text-white dark:text-black"
                            : "bg-black dark:bg-[var(--riko-primary)] text-white dark:text-black opacity-50 cursor-not-allowed"
                        }`}
                      >
                        Procedi al checkout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
