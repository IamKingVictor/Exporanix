import Header from "@/components/Header"
import ArtistContent from "./component/ArtistContent"
import Player from "@/components/Player"


const Artist = () => {
  return (
    <Header>
       <div
              className="
            flex
            flex-col
            gap-y-2
            mt-4
            md:mt-0
            "
            >
              <h1
                className="
              text-white
              text-4xl
              sm:text-5xl
              lg:text7xl
              font-bold
              "
              >
                Our Top Artists
              </h1>
              <ArtistContent />
            </div>
            <Player />
    </Header>
   
  )
}

export default Artist
