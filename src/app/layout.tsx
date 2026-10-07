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
  description: "Portfolio of Vijay Reddy, a Front-End Engineer specializing in Angular and modern web technologies with over 5 years of experience.",
  openGraph: {
    title: "Vijay Reddy | Senior Front-End Developer",
    description: "Portfolio of Vijay Reddy, a Front-End Engineer specializing in Angular and modern web technologies with over 5 years of experience.",
    url: "https://vijayreddy.dev",
    siteName: "Vijay Reddy Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vijay Reddy Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vijay Reddy | Senior Front-End Developer",
    description: "Portfolio of Vijay Reddy, a Front-End Engineer specializing in Angular and modern web technologies with over 5 years of experience.",
    images: ["/og-image.png"],
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
