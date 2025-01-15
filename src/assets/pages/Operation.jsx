import { useState, useEffect } from "react";

export default function Operation() {
  const [loading, setLoading] = useState(true);

  const resetCart = () => {
    // Rimuove tutti i prodotti dal carrello
    localStorage.removeItem('cartItems');
    console.log('Carrello resettato');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      resetCart();
      setTimeout(() => {
        window.location.href = "/";
      }, 5000);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-10">
      {loading ? (
        <span className="loading loading-spinner w-48 h-48 bg-[var(--riko-primary)]"></span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="192"
          height="192"
          color="var(--riko-primary)"
          fill="none"
        >
          <path
            d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <path
            d="M8 12.5L10.5 15L16 9"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
      <div className="text-center flex flex-col gap-2">
        <p className="text-2xl font-bold text-black dark:text-white">
          {loading ? "Attendere un momento..." : "L'ordine è stato preso in carico!"}
        </p>
        <p className="text-2xl font-bold text-black dark:text-white">
          {loading ? "" : "Tra poco verrai reindirizzato alla pagina principale."}
        </p>
      </div>
    </div>
  );
}
