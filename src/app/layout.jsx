import { Inter, Archivo_Black, Caveat } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor.jsx";
// import SmoothScroll from "@/components/SmoothScroll.jsx";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const archivo = Archivo_Black({ weight: "400", subsets: ["latin"], variable: "--font-archivo" });
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" });

export const metadata = {
  title: "Ankit | Portfolio",
  description: "Product Designer & Visual Developer Portfolio",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${archivo.variable} ${caveat.variable} antialiased bg-[#fdfdfd] text-[#111111] overflow-x-clip font-sans`}>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
