"use client"

import useUploadModal from "@/hooks/useUploadModal"
// import { useUser } from "@/hooks/useUser"; // Leaving commented as per your request
import { AiOutlinePlus } from "react-icons/ai"
import { TbPlaylist } from "react-icons/tb"
import MediaItem from "./MediaItem"
import { Song } from "@/types"

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const uploadModal = useUploadModal()
  // const { user } = useUser(); // Leaving commented as per your request

  const onClick = () => {
    // if (!user) { // Leaving commented as per your request
    //   return authModal.onOpen(); // Leaving commented as per your request
    // }
    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Your Library</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>
      <div className="flex flex-col gap-y-2 mt-4 px-3">
        {songs.map((item) => (
          <MediaItem onClick={() => {}} key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Library
