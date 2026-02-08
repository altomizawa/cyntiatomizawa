import type { Metadata } from "next";
import { Comfortaa, Montserrat} from "next/font/google";
import "./globals.css";
import LocoScroll from "./components/LocoScroll";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Cyntia Tomizawa",
  description: "Jewelry Designer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} antialiased`}
      >
        <LocoScroll>{children}</LocoScroll>
      </body>
    </html>
  );
}
