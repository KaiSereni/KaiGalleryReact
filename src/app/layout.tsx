import type { Metadata } from "next";
import { Prompt } from "next/font/google";
import "./globals.css";
import favicon from "../../public/image/favicon.ico";

const prompt = Prompt({weight: "400", subsets : ["latin"]});

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
      <body className={prompt.className}>
        {children}
        <p className="fixed text-white bottom-5 left-5 text-lg" style={{textShadow: "0px 0px 5px black"}}>© Kai Sereni 2022</p>
      </body>
    </html>
  );
}
