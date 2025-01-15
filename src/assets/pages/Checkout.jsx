/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react";
import Logo from "../components/logos/Logo";

import { useNavigate } from "react-router-dom";

import ProvinceITA from "../../database/ProvinceITA";

import { useTheme } from "../provider/ThemeProvider";
import DarkModeBTN from "../components/DarkModeBTN";
import TiketIcon from "../../../public/img/TiketIcon";

// icone carte di credito
import AmericanExpress from "../components/creditCard/AmericanExpress";
import Maestro from "../components/creditCard/Maestro";
import MasterCard from "../components/creditCard/MasterCard";
import Visa from "../components/creditCard/Visa";
import DefaultCard from "../components/creditCard/DefaultCard";

// Chakra UI
import { Checkbox, useToast } from "@chakra-ui/react";

// Per ogni componente della carta di credito, aggiungi una proprietà `displayName`.
AmericanExpress.displayName = 'AmericanExpress';
Visa.displayName = 'Visa';
MasterCard.displayName = 'MasterCard';
Maestro.displayName = 'Maestro';
DefaultCard.displayName = 'DefaultCard';

// Mappa dei componenti delle carte di credito aggiornata per usare `displayName`
const componentMap = {
  AmericanExpress: AmericanExpress,
  Visa: Visa,
  MasterCard: MasterCard,
  Maestro: Maestro,
  DefaultCard: DefaultCard,
};

export default function Checkout() {
  const { darkMode, setDarkMode } = useTheme(); // Effetto per gestire il tema scuro
  const [saveForFuture, setSaveForFuture] = useState(false); // Effetto per gestire l'opzione "Salva per i futuri acquisti"
  const [selectedCheckbox, setSelectedCheckbox] = useState(null); // Effetto per gestire la selezione del checkbox per la carta di credito salvata
  const [cardNumber, setCardNumber] = useState(""); // Aggiunta dello stato per il numero della carta
  const [expiryDate, setExpiryDate] = useState(""); // Aggiunta dello stato per la data di scadenza
  const [cartItems, setCartItems] = useState([]); // Stato per gli oggetti del carrello
  const [totalPrice, setTotalPrice] = useState(0); // Stato per il prezzo totale
  const toast = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false); // Stato per tracciare se l'invio è in corso

  // Effetto per cancellare i dati della carta di credito e dell'indirizzo di spedizione dal localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("savedCardData");
    if (savedData) {
      const cardData = JSON.parse(savedData);
      setCardNumber(""); // Resetta il numero della carta
      setExpiryDate(""); // Resetta la data di scadenza o imposta un valore predefinito
    }

    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []); // L'array vuoto indica che l'effetto verrà eseguito solo al montaggio del componente

  // Effetto per calcolare il prezzo totale ogni volta che cartItems cambia
  useEffect(() => {
    const total = cartItems.reduce(
      (acc, item) => acc + item.prezzo * item.quantita,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  // Effetto per formattare il numero della carta di credito
  const handleCardNumberChange = (event) => {
    let value = event.target.value;
    // Rimuove tutti i caratteri non numerici
    value = value.replace(/\D/g, "");

    // Aggiunge uno spazio ogni 4 cifre
    value = value.replace(/(\d{4})(?=\d)/g, "$1 ");

    setCardNumber(value);
  };

  // Effetto per formattare la data di scadenza della carta di credito
  const handleExpiryChange = (event) => {
    let value = event.target.value;
    // Rimuove tutti i caratteri non numerici e lo slash se l'utente lo inserisce manualmente
    value = value.replace(/[^0-9]/g, "");

    // Aggiunge lo slash dopo due cifre, se non è già presente
    if (value.length >= 2) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }

    // Imposta il valore massimo di caratteri a 5 (MM/AA)
    if (value.length > 5) {
      value = value.substring(0, 5);
    }

    // Aggiorna lo stato con il nuovo valore
    setExpiryDate(value);
  };

  // Effetto per gestire l'opzione "Salva per i futuri acquisti"
  const handleSaveForFutureChange = (event) => {
    setSaveForFuture(event.target.checked);
  };

  // Effetto per gestire la selezione del checkbox per la carta di credito salvata
  const handleCheckboxChange = (cardData) => {
    if (selectedCheckbox === cardData.lastFourDigits) {
      setSelectedCheckbox(null); // Deseleziona il checkbox se è già selezionato
    } else {
      setSelectedCheckbox(cardData.lastFourDigits); // Altrimenti, seleziona il nuovo checkbox
    }
  };

  // Effetto per ottenere l'icona della carta di credito
  const getCardIcon = () => {
    const firstDigit = cardNumber[0];
    switch (firstDigit) {
      case "3":
        return {
          icon: <AmericanExpress className="w-full" />,
          component: AmericanExpress,
        };
      case "4":
        return { icon: <Visa className="w-full" />, component: Visa };
      case "5":
        return {
          icon: <MasterCard className="h-full" />,
          component: MasterCard,
        };
      case "6":
        return { icon: <Maestro className="w-full" />, component: Maestro };
      default:
        return {
          icon: <DefaultCard className="w-full" />,
          component: DefaultCard,
        };
    }
  };

  // Effetto per salvare i dati della carta di credito
  const saveCardData = () => {
    if (saveForFuture) {
      const { icon, component } = getCardIcon();
      const lastFourDigits = cardNumber.slice(-4);

      const newCardData = {
        iconName: component.displayName,  // Usa `displayName` qui
        lastFourDigits: lastFourDigits,
      };

      // Recupera l'array di carte esistente o inizializza un nuovo array se non presente
      const existingCards =
        JSON.parse(localStorage.getItem("savedCardData")) || [];
      existingCards.push(newCardData);

      // Salva l'array aggiornato in localStorage
      localStorage.setItem("savedCardData", JSON.stringify(existingCards));
      console.log("Dati della carta aggiunti:", newCardData);
    } else {
      console.log(
        "Salvataggio non effettuato: l'opzione 'Salva per i futuri acquisti' non è selezionata."
      );
    }
  };

  // Effetto per caricare i dati della carta di credito salvata
  const loadSavedCard = () => {
    const savedData = localStorage.getItem("savedCardData");
    if (savedData) {
      let cardsData = JSON.parse(savedData);
      // Se cardsData non è un array, convertilo in array
      if (!Array.isArray(cardsData)) {
        cardsData = [cardsData]; // Converti in array se non lo è
      }
      return cardsData.map((cardData) => {
        const CardComponent = componentMap[cardData.iconName];
        return (
          <div
            key={cardData.lastFourDigits}
            className="p-4 bg-gray-200 dark:bg-[var(--riko-bg-2)] rounded-lg"
          >
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center justify-center relative overflow-hidden w-[66px] h-10 bg-gray-300 dark:bg-[var(--riko-bg-3)] rounded-md">
                {CardComponent ? <CardComponent className="h-full" /> : null}
              </div>
              <div className="flex items-center justify-between w-full">
                <p className="text-black dark:text-white">
                  <span className="uppercase">{cardData.iconName}</span>{" "}
                  {cardData.lastFourDigits}
                </p>
                <Checkbox
                  className="border-black dark:border-white"
                  size="lg"
                  onChange={() => handleCheckboxChange(cardData)}
                  isChecked={selectedCheckbox === cardData.lastFourDigits} // Controlla se il checkbox corrente è quello selezionato
                  id={`checkSaveCard-${cardData.lastFourDigits}`}
                />
              </div>
            </div>
          </div>
        );
      });
    }
    return (
      <p className="text-black dark:text-white bg-gray-200 text-opacity-50 dark:bg-[var(--riko-bg-2)] p-4 rounded-lg">
        Nessuna carta di credito o di debito salvata
      </p>
    );
  };

  const savedCardData = localStorage.getItem("savedCardData");

  // Effetto per controllare i dati inseriti nel form
  const checkInput = () => {
    let nomeCart = document.querySelector("#cardName");
    let numCart = document.querySelector("#cardNumber");
    let dataScadenza = document.querySelector("#expiryDate");
    let cvv = document.querySelector("#cvv");
    let nome = document.querySelector("#name");
    let cognome = document.querySelector("#lastName");
    let indirizzo = document.querySelector("#address");
    let cap = document.querySelector("#cap");
    let citta = document.querySelector("#city");
    let provincia = document.querySelector("#provincia");
    let telefono = document.querySelector("#phone");

    // Flags
    let nomeCartFlag = false;
    let numCartFlag = false;
    let dataScadenzaFlag = false;
    let cvvFlag = false;
    let nomeFlag = false;
    let cognomeFlag = false;
    let indirizzoFlag = false;
    let capFlag = false;
    let cittaFlag = false;
    let provinciaFlag = false;
    let telefonoFlag = false;

    // Patters
    let nomeCartPattern = /^[A-Za-z\s]+$/;
    let numCartPattern = /^(\d{4} ){3}\d{4}$/;
    let dataScadenzaPattern = /^\d{2}\/\d{2}$/;
    let cvvPattern = /^[0-9]{3}$/;
    let nomePattern = /^[A-Za-z\s]+$/;
    let cognomePattern = /^[A-Za-z\s]+$/;
    let indirizzoPattern = /^[A-Za-z0-9\s,.'-]{3,}$/;
    let capPattern = /^[0-9]{5}$/;
    let cittaPattern = /^[A-Za-z\s]+$/;
    let telefonoPattern = /^[0-9]{10}$/;

    // Controllo nome del titolare
    if (nomeCart && !selectedCheckbox) {
      if (nomeCart.value.match(nomeCartPattern)) {
        nomeCartFlag = true;
        nomeCart.classList.remove("!border-red-500");
      } else {
        nomeCart.classList.add("!border-red-500");
      }
    } else {
      nomeCartFlag = true; // Skip validation if a saved card is selected
    }

    // Controllo numero carta
    if (numCart && !selectedCheckbox) {
      if (numCart.value.match(numCartPattern)) {
        numCartFlag = true;
        numCart.classList.remove("!border-red-500");
      } else {
        numCart.classList.add("!border-red-500");
      }
    } else {
      numCartFlag = true; // Skip validation if a saved card is selected
    }

    // Controllo data di scadenza
    if (dataScadenza && !selectedCheckbox) {
      if (dataScadenza.value.match(dataScadenzaPattern)) {
        dataScadenzaFlag = true;
        dataScadenza.classList.remove("!border-red-500");
      } else {
        dataScadenza.classList.add("!border-red-500");
      }
    } else {
      dataScadenzaFlag = true; // Skip validation if a saved card is selected
    }

    // Controllo CVV
    if (cvv && !selectedCheckbox) {
      if (cvv.value.match(cvvPattern)) {
        cvvFlag = true;
        cvv.classList.remove("!border-red-500");
      } else {
        cvv.classList.add("!border-red-500");
      }
    } else {
      cvvFlag = true; // Skip validation if a saved card is selected
    }

    // Controllo nome
    if (nome) {
      if (nome.value.match(nomePattern)) {
        nomeFlag = true;
        nome.classList.remove("!border-red-500");
      } else {
        nome.classList.add("!border-red-500");
      }
    }

    // Controllo cognome
    if (cognome) {
      if (cognome.value.match(cognomePattern)) {
        cognomeFlag = true;
        cognome.classList.remove("!border-red-500");
      } else {
        cognome.classList.add("!border-red-500");
      }
    }

    // Controllo indirizzo
    if (indirizzo) {
      if (indirizzo.value.match(indirizzoPattern)) {
        indirizzoFlag = true;
        indirizzo.classList.remove("!border-red-500");
      } else {
        indirizzo.classList.add("!border-red-500");
      }
    }

    // Controllo CAP
    if (cap) {
      if (cap.value.match(capPattern)) {
        capFlag = true;
        cap.classList.remove("!border-red-500");
      } else {
        cap.classList.add("!border-red-500");
      }
    }

    // Controllo città
    if (citta) {
      if (citta.value.match(cittaPattern)) {
        cittaFlag = true;
        citta.classList.remove("!border-red-500");
      } else {
        citta.classList.add("!border-red-500");
      }
    }

    // Controllo provincia
    if (provincia) {
      if (provincia.value !== "0") {
        provinciaFlag = true;
        provincia.classList.remove("!border-red-500");
      } else {
        provincia.classList.add("!border-red-500");
      }
    }

    // Controllo telefono
    if (telefono) {
      if (telefono.value.match(telefonoPattern)) {
        telefonoFlag = true;
        telefono.classList.remove("!border-red-500");
      } else {
        telefono.classList.add("!border-red-500");
      }
    }

    // controllo flags
    if (
      nomeCartFlag &&
      numCartFlag &&
      dataScadenzaFlag &&
      cvvFlag &&
      nomeFlag &&
      cognomeFlag &&
      indirizzoFlag &&
      capFlag &&
      cittaFlag &&
      provinciaFlag &&
      telefonoFlag
    ) {
      setIsSubmitting(true); // Imposta lo stato di invio a true
      saveCardData(); // Chiama la funzione per salvare i dati della carta di credito

      // Naviga a un'altra pagina dopo 3 secondi
      setTimeout(() => {
        navigate("/checkout/operation");
      }, 3000);
    } else {
      toast({
        title: "Attenzione",
        position: "top-left",
        description: "Per continuare, devi correggere o inserire i dati",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  /* ---------------------------------------------------
  Se stai leggendo questo commento... ciao!
  Il motivo per cui non ho utilizzato 
  React Hook Form è che, anche con l'aiuto di 
  ChatGPT, non sono riuscito a far funzionare gli 
  input del cavolo. Quindi ho deciso di farlo 
  copletamente a mano e funziona anche meglio di
  quel plug-in...

  Buone vacanze!
  
  - Andrea
  --------------------------------------------------- */

  return (
    <div className="sm:p-8 max-w-[1500px] mx-auto bg-white dark:bg-black">
      <div className="bg-gray-100 dark:bg-[var(--riko-bg-1)] rounded-2xl p-4 sm:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between">
          <div className="flex flex-col gap-5">
            <a href="/" className="h-10 xs:h-auto mx-auto sm:mx-0">
              <Logo />
            </a>
            <div className="text-sm breadcrumbs p-0 m-0">
              <ul className="text-black dark:text-white">
                <li>
                  <a href="/" className="font-bold">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/cart">Carrello</a>
                </li>
                <li className="font-thin">Checkout</li>
              </ul>
            </div>
          </div>
          <div>
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              className="hover:md:rotate-[30deg] w-full"
            >
              <div className="w-max mx-auto">
                <DarkModeBTN className="text-black dark:text-white" />
              </div>
            </button>
          </div>
        </div>

        <div className="mt-5 sm:mt-10 md:mt-12">
          <div className="grid grid-cols-2 gap-10">
            {/* Input dati pagamento */}
            <div className="col-span-2 xl:col-span-1">
              <div className="grid grid-cols-2 gap-10">
                {/* Input dati metodo di pagamento */}
                <div className="col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col gap-5 mb:mb-10">
                  <div className="flex flex-col gap-2 md:gap-0">
                    <p className="text-2xl text-black dark:text-white font-bold text-center sm:text-left">
                      Metodo di pagamento
                    </p>
                    <p className="text-sm text-black dark:text-white font-thin text-center sm:text-left">
                      Seleziona il metodo di pagamento
                    </p>
                  </div>

                  {/* carte salvate */}
                  <div id="savedCard" className="flex flex-col gap-2">
                    <p className="text-black dark:text-white font-bold">
                      Carte salvate
                    </p>
                    <div className="flex flex-col gap-4">{loadSavedCard()}</div>
                  </div>

                  {/* Condizione per mostrare o nascondere il componente della carta di credito */}
                  {selectedCheckbox === null && (
                    <div>
                      <p className="text-black dark:text-white mb-4">Oppure</p>
                      <p className="text-black dark:text-white mb-2 font-bold">
                        Inserisci i dati della carta di credito
                      </p>
                      <div id="creditCard" className="flex flex-col gap-10">
                        <div className="flex flex-col justify-around bg-gray-200 dark:bg-[var(--riko-bg-2)] p-4 border border-white border-opacity-10 rounded-lg shadow-md max-w-xs">
                          <div className="flex flex-row items-center justify-between gap-3 mb-3">
                            <input
                              className="h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 flex-grow rounded-md"
                              type="text"
                              name="cardName"
                              id="cardName"
                              placeholder="Nome del titolare*"
                            />
                            <div className="flex items-center justify-center relative overflow-hidden w-14 h-10 bg-gray-300 dark:bg-[var(--riko-bg-3)] rounded-md">
                              {getCardIcon().icon}
                            </div>
                          </div>
                          <div className="flex flex-col space-y-3">
                            <input
                              className="h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                              type="text"
                              name="cardNumber"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456*"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                            />
                            <div className="flex flex-row gap-3 justify-between">
                              <input
                                className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                                type="text"
                                name="expiryDate"
                                id="expiryDate"
                                placeholder="MM/AA*"
                                maxLength={5}
                                value={expiryDate}
                                onChange={handleExpiryChange}
                              />
                              <input
                                className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                                type="text"
                                name="cvv"
                                id="cvv"
                                placeholder="CVV*"
                                maxLength={3}
                              />
                            </div>
                          </div>
                        </div>
                        <Checkbox
                          className="border-black dark:border-white text-black dark:text-white"
                          onChange={handleSaveForFutureChange}
                        >
                          Salva per i futuri acquisti
                        </Checkbox>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input dati indirizzo di spedizione */}
                <div className="col-span-2 md:col-span-1 lg:col-span-1 xl:col-span-2 flex flex-col gap-5">
                  <div className="flex flex-col gap-5">
                    <div className="text-black dark:text-white">
                      <p className="text-2xl font-bold">
                        Indirizzo di spedizione
                      </p>
                      <p className="text-sm font-thin">
                        Inserire l&apos;indirizzo di spedizione
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {/* Nome */}
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Nome*"
                      />
                    </div>

                    {/* Cognome */}
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Cognome*"
                      />
                    </div>

                    {/* Indirizzo */}
                    <div className="col-span-2">
                      <input
                        className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                        type="text"
                        name="address"
                        id="address"
                        placeholder="Indirizzo* (Via Marco-Aurelio, 97)"
                      />
                    </div>

                    {/* Indirizzo extra */}
                    <div className="col-span-2">
                      <input
                        className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                        type="text"
                        name="addressExtra"
                        id="addressExtra"
                        placeholder="Appartamento, piano, etc."
                      />
                    </div>

                    {/* CAP, provincia, città */}
                    <div className="col-span-2">
                      <div className="flex flex-col sm:flex-row items-center gap-2">
                        {/* CAP */}
                        <input
                          className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                          type="text"
                          name="cap"
                          id="cap"
                          placeholder="CAP*"
                          maxLength={5}
                        />

                        {/* Città */}
                        <input
                          className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                          type="text"
                          name="city"
                          id="city"
                          placeholder="Città*"
                        />

                        {/* Provincia */}
                        <select
                          id="provincia"
                          className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] px-2 rounded-md"
                        >
                          <option disabled selected value="0">
                            Seleziona la provincia*
                          </option>
                          {ProvinceITA.map((provincia) => (
                            <option
                              key={provincia.provi}
                              value={provincia.provi}
                            >
                              {provincia.provi}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Telefono */}
                    <div className="col-span-2">
                      <input
                        className="w-full h-10 border border-transparent outline-none text-sm bg-gray-300 dark:bg-[var(--riko-bg-3)] text-black dark:text-white font-semibold caret-[var(--riko-primary)] pl-2 rounded-md"
                        type="text"
                        name="phone"
                        id="phone"
                        placeholder="Telefono*"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <p className="text-black dark:text-white">
                    *Campi obbligatori
                  </p>
                </div>
              </div>
            </div>

            {/* Lista dei prodotti */}
            <div
              id="listItem"
              className="col-span-2 xl:col-span-1 h-full bg-gray-200 dark:bg-[var(--riko-bg-2)] rounded-xl overflow-hidden min-h-[200px]"
            >
              <div className="relative h-full">
                {/* Layout & Content */}
                <div className="p-4 mb-[164px]">
                  {/* Layout */}
                  <div className="hidden sm:flex flex-row justify-between mb-4 px-4">
                    <p className="text-black dark:text-white w-[80px] text-center">#</p>
                    <p className="text-black dark:text-white w-[175px] pl-3">Nome</p>
                    <p className="text-black dark:text-white">Quantità</p>
                    <p className="text-black dark:text-white">Prezzo</p>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex flex-col gap-4">
                        <div className="p-2 px-4 bg-white dark:bg-[var(--riko-bg-3)] rounded-lg mb-2 flex flex-col sm:flex-row justify-between items-center gap-1 sm:gap-0">
                          {item.img ? (
                            <img
                              src={item.img}
                              alt={item.nome}
                              className="w-20 h-20 object-cover"
                            />
                          ) : (
                            <TiketIcon className="w-20 h-20 text-black dark:text-white" />
                          )}
                          <div className="flex flex-col gap-2 sm:gap-0">
                            <p className="text-black max-w-[175px] w-[175px] dark:text-white text-center sm:text-left truncate" title={item.nome || item.luogo + " (" + item.citta + ")"}>
                              {item.nome || item.luogo + " (" + item.citta + ")"}
                            </p>
                            {item.taglia && (
                              <p className="text-black dark:text-white text-center sm:text-left">
                                Taglia: {item.taglia}
                              </p>
                            )}
                          </div>
                          <p className="text-black dark:text-white">
                            x{item.quantita}
                          </p>
                          <p className="text-black dark:text-white">
                            {item.prezzo.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prezzo, spedizione & BTN */}
                <div className="flex flex-col absolute bottom-0 gap-4 w-full p-4 bg-gray-300 dark:bg-[var(--riko-bg-2)] z-10">
                  <div className="flex flex-row justify-between sm:px-4">
                    <p className="text-black dark:text-white text-xl font-bold">
                      Totale:
                    </p>
                    <p className="text-black dark:text-white text-xl font-bold">
                      {totalPrice.toFixed(2)} €
                    </p>
                  </div>
                  <div className="flex flex-row justify-between sm:px-4">
                    <p className="text-black dark:text-white">Spedizione:</p>
                    <p className="text-black dark:text-white uppercase">
                      gratis
                    </p>
                  </div>
                  <div>
                    {/* Bottone per inviare i dati */}
                    <button
                      onClick={checkInput}
                      type="button"
                      className={`btn w-full border-none bg-[var(--riko-primary)] hover:bg-[var(--riko-btn-hover)] font-bold text-black dark:text-white ${
                        isSubmitting ? "opacity-60 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="loading loading-spinner loading-md"></span>
                      ) : (
                        "Invia"
                      )}
                    </button>
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
