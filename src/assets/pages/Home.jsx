import BannerVideo from "../components/home/BannerVideo";
import BestMusic from "../components/home/BestMusic";
import DateConcerti from "../components/home/DateConcerti";
import MerchForHome from "../components/home/Merch";
import Video from "../components/home/Video";

export default function Home() {
  return (
    <>
      <BannerVideo />

      <MerchForHome title="Merch" HomeBg={true} />

      <BestMusic />

      <DateConcerti />

      <Video />
    </>
  );
}
