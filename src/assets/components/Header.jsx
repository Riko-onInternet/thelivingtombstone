/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";

import DarkModeBTN from "./DarkModeBTN";

import items from "../../database/items"; // Assicurati che questo import sia corretto

// Components
import { useTheme } from "../provider/ThemeProvider";
import { useCart } from "../provider/CartProvider";

// Icons
import { IoMenu } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { MdShoppingCart } from "react-icons/md";
import {
  FaHouse,
  FaBagShopping,
  FaTicket,
  FaTimeline,
  FaPhone,
} from "react-icons/fa6";

// Next UI
import { Navbar } from "@nextui-org/navbar";

// Chakra UI
import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Logo
import Logo from "./logos/Logo";

// Imports Search
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { UsersIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";


// ClassNames Search
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Header2 = () => {
  const { darkMode, setDarkMode } = useTheme();
  const { cartItems } = useCart();
  const [showsearch, setShowSearch] = useState(false);

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const filteredItems =
    query === ""
      ? []
      : items.filter((item) => {
          return (
            item.nome && item.nome.toLowerCase().includes(query.toLowerCase())
          );
        });

  const totalQuantity = cartItems.reduce(
    (total, item) => total + (item.quantita || 0),
    0
  );

  const {
    isOpen: isOpenMenu,
    onOpen: onOpenMenu,
    onClose: onCloseMenu,
  } = useDisclosure();

  const handleSearchClick = () => {
    if (isOpenMenu) {
      onCloseMenu();
    }
    setOpen(true);
  };

  const menu = [
    {
      name: "Home",
      href: "/",
      icon: <FaHouse className="mt-0.5" />,
    },
    {
      name: "Shop",
      href: "/shop",
      icon: <FaBagShopping className="mt-0.5" />,
    },
    {
      name: "Tours",
      href: "/tours",
      icon: <FaTicket className="mt-1" />,
    },
    {
      name: "Storia",
      href: "/story",
      icon: <FaTimeline className="mt-1" />,
    },
    {
      name: "Contatti",
      href: "/contact",
      icon: <FaPhone className="mt-1" />,
    },
  ];

  const renderLeftMenu = () => (
    <div className="flex items-center w-full gap-4">
      {/* Search */}
      <div
        className="
        flex items-center w-full
        bg-[var(--riko-bg-1)] p-4 rounded-lg order-3
        md:bg-transparent md:p-0 md:rounded-none md:order-1
        "
      >
        <button className="w-full" onClick={handleSearchClick}>
          <IoMdSearch className="size-7 dark:md:text-white md:text-black mx-auto" />
        </button>
      </div>

      {/* Cart */}
      <a
        href="/cart"
        className="
        flex items-center w-full
        bg-[var(--riko-bg-1)] p-4 rounded-lg order-2
        md:bg-transparent md:p-0 md:rounded-none md:order-2
        "
      >
        <div className="mx-auto flex">
          <div className="indicator">
            <span className="indicator-item text-xs badge border-0 bg-[var(--riko-primary)] md:bg-white dark:md:bg-[#ff752c] text-black font-bold">
              {totalQuantity}
            </span>
            <MdShoppingCart className="size-7 dark:text-white md:text-black" />
          </div>
        </div>
      </a>

      {/* Theme */}
      <div
        className="
        flex items-center w-full
        bg-[var(--riko-bg-1)] p-3.5 rounded-lg order-1
        md:bg-transparent md:p-0 md:rounded-none md:order-3
        "
      >
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="hover:md:rotate-[30deg] w-full"
        >
          <div className="w-max mx-auto">
            <DarkModeBTN className="text-white md:text-black dark:text-white" />
          </div>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <Navbar shouldHideOnScroll className="fixed top-0" id="header">
        <div className="w-full z-50 h-[100px] xs:h-[100px] bg-[#ff752c] dark:bg-black flex items-center shadow-xl ">
          <div className="max-w-[1400px] w-full flex items-center justify-between px-4 mx-auto relative">
            {/* BTN Burger */}
            <div className="sm:w-[100px] md:w-[120px]">
              <button
                type="button"
                className="px-4 py-2 rounded-lg"
                onClick={onOpenMenu}
              >
                <IoMenu className="xs:size-10 size-8 dark:text-white text-black" />
              </button>
            </div>

            {/* Logo */}
            <a
              href="/"
              className="flex justify-end h-[60px] xs:h-max xs:w-[290px]"
            >
              <Logo />
            </a>

            {/* Left Menu */}
            <div
              id="leftMenu"
              className="w-[120px] md:flex gap-4 justify-end items-center hidden"
            >
              {renderLeftMenu()}
            </div>
          </div>
        </div>
      </Navbar>

      {/* Menu */}
      <Drawer
        isOpen={isOpenMenu}
        placement="left"
        size={"md"}
        onClose={onCloseMenu}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody className="bg-[#000000]">
            {/* Menu */}
            <div className="flex flex-col items-center justify-center gap-6 mt-10">
              {menu.map((item) => (
                <a
                  href={item.href}
                  className="text-white text-2xl font-bold uppercase px-4 py-3 my-menu-hover flex items-center justify-center gap-2 w-full bg-[var(--riko-bg-1)] rounded-lg"
                  key={item.name}
                >
                  {item.icon}
                  <span className="text-xl">{item.name}</span>
                </a>
              ))}
            </div>

            {/* BTN Mobile */}
            <div
              id="menuMobile"
              className="flex md:hidden flex-col items-center justify-center gap-6 mt-10"
            >
              {renderLeftMenu()}
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Search */}
      <Transition show={open} afterLeave={() => setQuery("")} appear>
        <Dialog className="relative z-50" onClose={setOpen}>
          <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
          </TransitionChild>

          <div className="fixed inset-0 z-50 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="dark:!bg-black"
            >
              <DialogPanel className="mx-auto max-w-3xl transform divide-y divide-gray-100 dark:!divide-white/70 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
                <Combobox
                  onChange={(item) => {
                    window.location.href = `/shop/${item.id}`;
                  }}
                >
                  {({ activeOption }) => (
                    <>
                      <div className="relative">
                        <MagnifyingGlassIcon
                          className="pointer-events-none absolute left-4 top-3.5 h-5 w-5 text-gray-400 dark:!text-white"
                          aria-hidden="true"
                        />
                        <ComboboxInput
                          autoFocus
                          className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-900 dark:!text-white placeholder:text-gray-400 dark:placeholder:!text-white focus:ring-0 sm:text-sm"
                          placeholder="Cerca..."
                          onChange={(event) => setQuery(event.target.value)}
                          onBlur={() => setQuery("")}
                        />
                      </div>

                      {(query === "" || filteredItems.length > 0) && (
                        <ComboboxOptions
                          as="div"
                          static
                          hold
                          className="flex transform-gpu divide-x divide-gray-100 dark:!divide-white/70"
                        >
                          <div
                            className={classNames(
                              "min-w-0 flex-auto scroll-py-4 px-6 py-4",
                              activeOption && "sm:h-full"
                            )}
                          >
                            <div className="-mx-2 text-sm text-gray-700 dark:!text-white transition-none">
                              {(query === "" ? items : filteredItems).map(
                                (item, index) =>
                                  item && item.id ? (
                                    <ComboboxOption
                                      as="div"
                                      key={item.id}
                                      value={item}
                                      className={({ focus }) =>
                                        classNames(
                                          "flex cursor-default select-none items-center rounded-md p-2 dark:!bg-[var(--riko-bg-1)] mb-2 w-1/2",
                                          focus && "bg-gray-100 text-gray-900 dark:!bg-[var(--riko-secondary)] dark:!text-white",
                                          activeOption && "w-full"
                                        )
                                      }
                                    >
                                      {({ focus }) => (
                                        <>
                                          <img
                                            src={item.img1}
                                            alt=""
                                            className="h-10 w-10 flex-none rounded-full"
                                          />
                                          <span className="ml-3 flex-auto truncate">
                                            {item.nome}
                                          </span>
                                          {focus && (
                                            <ChevronRightIcon
                                              className="ml-3 h-5 w-5 flex-none text-gray-400"
                                              aria-hidden="true"
                                            />
                                          )}
                                        </>
                                      )}
                                    </ComboboxOption>
                                  ) : (
                                    <div key={index}>
                                      {/* Gestione del caso in cui l'oggetto o la proprietà id non esiste */}
                                      Oggetto non valido
                                    </div>
                                  )
                              )}
                            </div>
                          </div>

                          {activeOption && (
                            <div className="hidden w-1/2 flex-none flex-col justify-between overflow-y-auto sm:flex">
                              <div className="flex-none p-6 text-center">
                                <img
                                  src={activeOption.img1}
                                  alt=""
                                  className="mx-auto h-36 w-36 rounded-full"
                                />
                                <div className="flex flex-col gap-1">
                                  <p className="mt-3 font-semibold text-black text-xl dark:!text-white">
                                    {activeOption.nome}
                                  </p>
                                  <p className="text-lg leading-6 text-black opacity-70 mt-1 dark:!text-white">
                                    {activeOption.prezzo.toFixed(2)} €
                                  </p>
                                  <p className="text-sm leading-6 text-black dark:!text-white">
                                    {activeOption.descrizione}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </ComboboxOptions>
                      )}

                      {query !== "" && filteredItems.length === 0 && (
                        <div className="px-6 py-14 text-center text-sm sm:px-14">
                          <ArchiveBoxIcon
                            className="mx-auto h-6 w-6 text-gray-400"
                            aria-hidden="true"
                          />
                          <p className="my-4 font-semibold text-gray-900">
                            Nessun prodotto trovato
                          </p>
                          <p className="text-gray-500">
                            Non siamo riusciti a trovare nulla con quel nome.
                          </p>
                          <p className="text-gray-500">
                            Per favore riprova.
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </Combobox>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Header2;
