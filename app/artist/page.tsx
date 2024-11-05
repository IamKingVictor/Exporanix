import Header from "@/components/Header"


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
              lg:text-7xl
              font-bold
              "
              >
                Artist
              </h1>
            </div>
    </Header>
  )
}

export default Artist
