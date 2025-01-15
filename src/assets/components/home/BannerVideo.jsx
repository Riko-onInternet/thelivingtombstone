/* eslint-disable react/no-unescaped-entities */

export default function BannerVideo() {
  return (
    <div className="h-[800px] sm:h-[900px] overflow-hidden relative bg-black">
      <div className="absolute banner-color-video w-full h-full z-20 pt-[100px]">
        <div className="flex gap-7 justify-end md:justify-center items-center md:items-start pb-20 h-full max-w-full w-full flex-col text-white px-4 md:pl-20 lg:pl-40 mt-[60px]">
          <img
            src="/img/world-zero-one-6-5-2024.png"
            alt="world_zero_one"
            width={700}
          />
          <p className="max-w-[700px] sm:text-xl text-center md:text-start">
            Prendi il tuo biglietto ora e preparati a vivere un'esperienza
            musicale unica in giro per il mondo con&nbsp;
            <span className="font-bold text-[var(--riko-primary)]">
              The Living Tombstone
            </span>
            &nbsp;nel suo imperdibile tour mondiale:&nbsp;
            <span className="font-bold text-[var(--riko-primary)]">
              world_zero_one
            </span>
            .&nbsp;
            <br />
            <span className="font-bold">Posti limitati</span>, non
            perdere l'occasione!
          </p>
          <a
            href="/shop"
            className="btn bg-[var(--riko-primary)] border-0 hover:bg-[var(--riko-btn-hover)] font-bold text-black sm:text-lg"
          >
            Acquista i biglietti
          </a>
        </div>
      </div>

      <video
        className="absolute z-10 top-0 object-cover h-full w-full"
        src="/video/banner-video.webm"
        autoPlay
        muted
        loop
      ></video>
    </div>
  );
}
