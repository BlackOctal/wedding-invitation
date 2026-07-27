import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Poppins } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "500"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Kavini & Shehan | 5 November 2026",
  description: "Together with their families, Kavini and Shehan joyfully invite you to celebrate their wedding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${poppins.variable}`}
    >
      <body className="bg-ivory text-espresso font-sans antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
