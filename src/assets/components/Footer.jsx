import { FaDiscord, FaFacebook, FaInstagram, FaXTwitter } from "react-icons/fa6";
import FullLogo from "./logos/FullLogo";

export default function Footer() {
  return (
    <>
      <footer className="bg-[var(--riko-primary)] dark:bg-black pt-8">
        <div className="flex items-center justify-center w-full pt-4 pb-10 border-b-1 border-opacity-50 border-b-black dark:border-opacity-50 dark:border-b-white">
          <a href="/" className="w-[350px] py-2 px-4">
            <FullLogo />
          </a>
        </div>
        <div className="max-w-[1200px] mx-auto py-4">
          <div className="flex items-center justify-around gap-4 md:gap-0 flex-col md:flex-row px-4">

            <div className="flex items-center justify-center text-center">
              <p className="text-black dark:text-white font-bold">© 2024 The Living Tombstone LLC. All right riserved</p>
            </div>

            <div className="flex items-center justify-end gap-1 text-black dark:text-white">
              <a className="p-1" href="https://x.com/LivingTombstone" target="_blank">
                <FaXTwitter size={20} />
              </a>
              <a className="p-1" href="https://www.instagram.com/livingtombstone/" target="_blank">
                <FaInstagram size={20} />
              </a>
              <a className="p-1" href="https://www.facebook.com/TheLivingTombstoneOfficial" target="_blank">
                <FaFacebook size={20} />
              </a>
              <a className="p-1" href="https://discord.gg/tlt" target="_blank">
                <FaDiscord size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
