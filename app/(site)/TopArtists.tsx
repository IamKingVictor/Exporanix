import Link from "next/link";
import ArtistContent from "@/app/artist/component/ArtistContent";

const TopArtists: React.FC = () => {
  return (
    <div className="border-t border-neutral-800">
      <div className="p-4 mt-8">
        <h2 className="text-white text-2xl font-semibold">Top Artists This Month</h2>
        <ArtistContent />
        <Link
          href="/artist"
          className="text-gray-400 hover:text-white mt-4 inline-block"
        >
          Show All
        </Link>
      </div>
    </div>
  );
};

export default TopArtists;
