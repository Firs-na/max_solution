import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import { AuthProvider } from "@/lib/auth";
import "./globals.css";

const display = Playfair_Display({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Poppins({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Max Solution",
  description: "Jelajahi Makassar bersama kurator rencana perjalanan profesional.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${display.variable} ${body.variable} font-sans antialiased`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
