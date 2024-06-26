import Navbar from "@/components/Navbar";
import { dbConnect } from "@/services/mongo";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Evental | Home",
  description: "This is my evental project home page",
};

export default async function RootLayout({ children }) {
  await dbConnect();
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <Navbar />
          <main className='py-8'>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
