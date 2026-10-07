import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../context/ThemeContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vijayreddy.dev"),
  title: "Vijay Reddy | Senior Front-End Developer",
  description: "Portfolio of Vijay Reddy, specializing in high-performance web applications and UI architecture.",
  openGraph: {
    title: "Vijay Reddy | Senior Front-End Developer",
    description: "Portfolio of Vijay Reddy, specializing in high-performance web applications and UI architecture.",
    url: "https://vijayreddy.dev",
    siteName: "Vijay Reddy Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Reddy | Senior Front-End Developer",
    description: "Portfolio of Vijay Reddy, specializing in high-performance web applications and UI architecture.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script src="https://unpkg.com/@phosphor-icons/web"></script>
      </head>
      <body className={nunito.className}>
        <ThemeProvider>
          <NavBar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
