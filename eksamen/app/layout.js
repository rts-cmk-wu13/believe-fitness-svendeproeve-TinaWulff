import { Poppins } from "next/font/google";
import "./globals.css";
// menu?

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Landrup Dans App",
  description: "Landrup danseskole app, her kan du se hvilke hold der udbydes og tilmelde dig.",
};

export default function RootLayout({ children }) {

  return (
    
      <html lang="da">
        <body
          className={`${poppins.variable} antialiased`}
        >
          <main>
             {children}
          </main>
      </body>
    </html>
  );
}
