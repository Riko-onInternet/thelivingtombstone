// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// import required modules
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "../../css/mod-swiper.css";

const music = [
  {
    spotify: "3FdopY118eIYv5COjji7Sa?utm_source=generator",
  },
  {
    spotify: "4IMD2kvs4CWujFtAtpJgGr?utm_source=generator",
  },
  {
    spotify: "5TxYGEYas8324v4pxc86Ts?utm_source=generator",
  },
  {
    spotify: "0r8O0dqCAAUeHNMwuG5cGE?utm_source=generator",
  },
  {
    spotify: "3CaTo1YUgxW3hweuRNr2CJ?utm_source=generator",
  },
  {
    spotify: "3lZAtIKJj3gCBK2VN8zGCb?utm_source=generator",
  },
  {
    spotify: "7MBjLP87GaZy7Ay0k6xrHI?utm_source=generator",
  },
];

export default function BestMusic() {
  return (
    <div className="bg-black dark:bg-[var(--riko-secondary)] pb-6 pt-10">
      <div>
        <div className="flex items-center justify-center">
          <p className="text-center text-6xl p-2 uppercase impact text-white">
            Top music
          </p>
        </div>
      </div>
      <div>
        <Swiper
          navigation={true}
          pagination={{
            clickable: true,
          }}
          modules={[Navigation, Pagination]}
          className="mod-white"
        >
          {music.map((e) => (
            <>
              <SwiperSlide>
                <div className="max-w-[1200px] mx-auto px-4 sm:px-10 lg:px-20 mb-14 mt-10">
                  <iframe
                    className="rounded-xl"
                    src={`https://open.spotify.com/embed/track/${e.spotify}`}
                    width="100%"
                    height="352"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; f7ullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              </SwiperSlide>
            </>
          ))}
        </Swiper>
        <div className="w-full flex items-center justify-center pt-2 mt-4 mb-6">
          <a
            target="_blank"
            href="https://open.spotify.com/intl-it/artist/0I6yADrmeyvw66g7yjkqIF?si=MdbmXy3ETeKk-fLZhuLP-g"
            className="btn bg-transparent text-white hover:bg-white/10"
          >
            Visualizza la sua discografia
          </a>
        </div>
      </div>
    </div>
  );
}
