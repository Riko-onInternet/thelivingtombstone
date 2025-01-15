import { useTheme } from "../provider/ThemeProvider";
import { IoMoon, IoSunny } from "react-icons/io5";

export default function DarkModeBTN({ className }) {
  const { darkMode, setDarkMode } = useTheme();
  return (
    <>
      {darkMode ? (
        <IoMoon className={`size-8 ${className}`} />
      ) : (
        <IoSunny className={`size-8  ${className}`} />
      )}
    </>
  );
}
