import { Outlet } from "react-router-dom"
import Header from "./assets/components/Header"
import Footer from "./assets/components/Footer"

export default function LayoutSite() {
  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}



