import { FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import { FaXTwitter, FaFacebookF, FaInstagram } from "react-icons/fa6";

const contactInfo = [
  {
    icon: FaEnvelope,
    title: "Email",
    value: "inquiries@thelivingtombstone.com",
    link: "mailto:inquiries@thelivingtombstone.com",
  },
  {
    icon: FaPhoneAlt,
    title: "Telefono",
    value: "+39 060203040",
    link: "tel:+39060203040",
  },
  {
    icon: FaXTwitter,
    title: "Twitter",
    value: "@LivingTombstone",
    link: "https://x.com/LivingTombstone",
  },
  {
    icon: FaFacebookF,
    title: "Facebook",
    value: "The Living Tombstone",
    link: "https://www.facebook.com/TheLivingTombstoneOfficial",
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "The Living Tombstone",
    link: "https://www.instagram.com/livingtombstone/",
  },
];

export default function Contact() {
  return (
    <div className="mt-[100px] bg-black">
      <div className="md:p-8 md:py-16">
        <div className="flex items-center justify-center flex-col md:flex-row">
          <div className="bg-[url('/img/contact/pic.webp')] bg-cover bg-no-repeat bg-center max-w-[500px] w-full h-[500px] md:rounded-xl md:rounded-bl-xl rounded-b-none md:rounded-r-none"></div>
          <div className="flex flex-col justify-start p-5 pb-10 md:p-10 max-w-[500px] w-full min-h-[500px] h-full bg-[var(--riko-bg-1)] gap-6 md:rounded-xl md:rounded-l-none">
            <p className="text-2xl font-bold text-center">Contatti</p>

            {contactInfo.map((info) => (
              <div
                key={info.title}
                className="flex flex-col md:flex-row text-center md:text-left items-center gap-4"
              >
                <info.icon className="text-[var(--riko-primary)] w-10 h-10" />
                <div className="flex flex-col">
                  <p>{info.title}:</p>
                  <a
                    href={info.link}
                    target="_blank"
                    className="text-xl font-bold hover:underline"
                  >
                    {info.value}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}