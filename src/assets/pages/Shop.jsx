import { useState, useEffect } from "react";

// Database Product
import { IoIosSearch } from "react-icons/io";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { FaCheck, FaXmark } from "react-icons/fa6";
import items from "../../database/items";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    if (filter === "") {
      setSortOrder("");
    }
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const filteredItems = items
    .filter((item) => {
      const matchesSearch = item.nome
        ? item.nome.toLowerCase().includes(searchTerm.toLowerCase())
        : false;
      const matchesFilter = selectedFilter
        ? item.tipo === selectedFilter
        : true;
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.prezzo - b.prezzo;
      } else if (sortOrder === "desc") {
        return b.prezzo - a.prezzo;
      }
      return 0;
    });

  return (
    <div className="mt-[100px] bg-black">
      {/* Hero */}
      <div className="w-full h-[400px] bg-[url('/img/bg/hq720.jpg')] bg-cover bg-center mt-[100px]">
        <div className="flex flex-col gap-2 items-center justify-center h-full w-full backdrop-blur-md text-center">
          <div className="relative">
            <p className="text-7xl relative z-10 font-bold text-center mb-10">
              Shop
            </p>
            <p className="text-7xl font-bold text-center mb-10 absolute top-0 left-0 text-border-20">
              Shop
            </p>
          </div>
        </div>
      </div>

      {/* Cerca, Filtri & Prodotti */}
      <div className="p-8 pb-[180px]">
        {/* Cerca, Filtri*/}
        <div className="w-full flex justify-center items-center mb-9">
          {/* Cerca */}
          <div className="flex items-center bg-white dark:bg-[var(--riko-secondary)] rounded-md rounded-r-none">
            <label htmlFor="search" className="cursor-text pl-2 py-4">
              <IoIosSearch className="text-2xl text-black dark:text-[var(--riko-primary)]" />
            </label>
            <input
              type="text"
              className="max-w-[250px] w-full focus-visible:outline-none focus-visible:border-0 bg-white dark:bg-[var(--riko-secondary)] text-black dark:text-white border-0 py-4"
              placeholder="Cerca..."
              value={searchTerm}
              onChange={handleSearchChange}
              id="search"
            />
          </div>

          {/* Filtri */}
          <div className="flex items-center justify-center">
            <details className="dropdown dropdown-md border-l border-[var(--riko-primary)]">
              <summary
                onClick={toggleDropdown}
                className="cursor-pointer user-select-none px-4 py-4 text-black dark:text-white rounded-md rounded-l-none flex items-center gap-1 bg-white dark:bg-[var(--riko-secondary)] hover:bg-gray-100 border-0"
              >
                Filtri
                {isDropdownOpen ? (
                  <MdKeyboardArrowUp className="text-black dark:text-white text-lg" />
                ) : (
                  <MdKeyboardArrowDown className="text-black dark:text-white text-lg" />
                )}
              </summary>
              {isDropdownOpen && (
                <ul className="dropdown-content border-0 z-[1] menu p-2 mt-2 shadow bg-base-100 rounded-box max-w-[200px] w-[200px] text-black dark:text-white dark:bg-[var(--riko-secondary)]">
                  <li onClick={() => handleFilterChange("T-Shirt")}>
                    <a className="flex outline-none">
                      <div className="flex items-center justify-between w-full">
                        <p>T-Shirt</p>
                        {selectedFilter === "T-Shirt" && (
                          <FaCheck className="ml-2 text-green-500" />
                        )}
                      </div>
                    </a>
                  </li>
                  <li onClick={() => handleFilterChange("Felpa")}>
                    <a className="flex outline-none">
                      <div className="flex items-center justify-between w-full">
                        <p>Felpa</p>
                        {selectedFilter === "Felpa" && (
                          <FaCheck className="ml-2 text-green-500" />
                        )}
                      </div>
                    </a>
                  </li>
                  <li onClick={() => handleFilterChange("Accessori")}>
                    <a className="flex outline-none">
                      <div className="flex items-center justify-between w-full">
                        <p>Accessori</p>
                        {selectedFilter === "Accessori" && (
                          <FaCheck className="ml-2 text-green-500" />
                        )}
                      </div>
                    </a>
                  </li>
                  <li className="divider h-px m-0 my-2 dark:bg-[var(--riko-primary)] dark:opacity-50"></li>
                  <li onClick={() => handleSortChange("asc")}>
                    <a className="flex outline-none">
                      <div className="flex items-center justify-between w-full">
                        <p>Prezzo: Crescente</p>
                        {sortOrder === "asc" && (
                          <FaCheck className="ml-2 text-green-500" />
                        )}
                      </div>
                    </a>
                  </li>
                  <li onClick={() => handleSortChange("desc")}>
                    <a className="flex outline-none">
                      <div className="flex items-center justify-between w-full">
                        <p>Prezzo: Decrescente</p>
                        {sortOrder === "desc" && (
                          <FaCheck className="ml-2 text-green-500" />
                        )}
                      </div>
                    </a>
                  </li>
                  <li className="divider h-px m-0 my-2 dark:bg-[var(--riko-primary)] dark:opacity-50"></li>
                  <li
                    onClick={() => handleFilterChange("")}
                    className="bg-red-500/20 hover:bg-red-500/30 focus:bg-red-500/30 rounded-lg"
                  >
                    <a className="text-red-500 flex hover:bg-transparent outline-none">
                      <div className="flex items-center justify-between w-full">
                        <span className="leading-none">
                          Rimuovi tutti i filtri
                        </span>
                        <span>
                          <FaXmark className="mt-[0.125rem]" />
                        </span>
                      </div>
                    </a>
                  </li>
                </ul>
              )}
            </details>
          </div>
        </div>

        {/* Visualizza i prodotti filtrati */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={index}
              className="max-w-[350px] w-full bg-white dark:bg-[var(--riko-secondary)] rounded-md p-5 mx-auto"
            >
              <a href={`/shop/${item.id}`}>
                <img src={item.img1} alt={item.nome} className="drop-shadow-merch" />
              </a>
              <div className="text-black dark:text-white flex flex-col gap-3 text-center">
                <a href={`/shop/${item.id}`}>
                  <p className="text-lg font-bold">{item.nome}</p>
                </a>
                <p className="text-sm truncate">{item.descrizione}</p>
                <p className="text-lg font-bold">{item.prezzo.toFixed(2)} €</p>
                <a
                  href={`/shop/${item.id}`}
                  className="btn border-0 text-black bg-[var(--riko-primary)] hover:bg-[var(--riko-primary)] w-full"
                >
                  Visualizza il prodotto
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
