import getSongs from "@/actions/getSongs";
import Header from "@/components/Header";
import ListItem from "@/components/ListItem";
import PageContent from "./components/PageContent";
import TopArtists from "./TopArtists";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import LiveRadio from "@/components/LiveRadio";

export const revalidate = 0;

export default async function Home() {
  const songs = await getSongs();

  return (
    <div 
    className="
    bg-neutral-900
    rounded-lg 
    h-full 
    w-full 
    overflow-hidden 
    overflow-y-auto">
      <Header>
        <div className="mb-2">
          <h1 className="
          text-white 
          text-3xl
          font-semibold
          ">
            Welcome
            </h1>
          <div
           className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          xl:grid-cols-3 
          2xl:grid-cols-4 
          mt-4 
          gap-4">
            
            <ListItem
              image="/images/liked.png"
              name="Liked Songs"
              href="Liked"
            />
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <AnnouncementBanner />
        <LiveRadio />
        <div className="flex justify-between items-center">
          <TopArtists />
        </div>
        <div>
          <h1 className="text-white text-2xl font-semibold">Top Hits</h1>
          <PageContent songs={songs} />
        </div>
      </div>
    </div>
  );
}
