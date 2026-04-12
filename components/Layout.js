import { Inder, Sora } from "@next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

import Nav from "../components/Nav";
import Header from "../components/Header";
import TopLeftImg from "../components/TopLeftImg";

const Layout = ({ children }) => {
  return (
    <div
      className={`bg-black text-white ${sora.variable} font-sora relative min-h-screen xl:h-screen xl:overflow-hidden`}
    >
      <TopLeftImg></TopLeftImg>
      <Nav></Nav>
      <Header></Header>

      {children}
    </div>
  );
};

export default Layout;
