import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import favicon from "../../public/image/favicon.ico";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kai Sereni",
  description: "Kai Sereni's Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href={favicon.src} />
      <body className={inter.className}>
        {children}
        <p className="absolute text-white bottom-5 left-5 text-lg">© Kai Sereni 2022</p>
      </body>
    </html>
  );
}
