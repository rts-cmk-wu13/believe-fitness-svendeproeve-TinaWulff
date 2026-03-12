import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Belive Fitness App",
  description: "Fitness app where you can see the available classes and search for them",
};

export default function RootLayout({ children }) {

  return (
    
      <html lang="en">
        <body
          className={`${poppins.className} antialiased`}
        >
          <header className="relative z-2000">
            <Header />
          </header>

          <main>
             {children}
          </main>

      </body>
    </html>
  );
}
