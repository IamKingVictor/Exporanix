import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import getSongsByUserId from "@/actions/getSongsByUserId";
import Player from "@/components/Player";
import ArtistContent from "./artist/component/ArtistContent";
import Link from "next/link";


const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eporanix",
  description: "Listen to music",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();

  

  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
            <Sidebar songs={userSongs}>
  <div className="main-content bg-gradient-to-b from-neutral-800 to-neutral-900 min-h-screen">
    {children}
    
    <div className="bg-neutral-900 border-t border-neutral-800">
    <div className="p-4 mt-8">
      <h2 className="text-white text-2xl font-semibold">Top Artists This Month</h2>
      <ArtistContent />
      <Link href="/artist" className="text-gray-400 hover:text-white mt-4 inline-block">
        Show All
      </Link>
    </div>
    </div>
  </div>
  
</Sidebar>

            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
