"use client"

import { useEffect, useState } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import toast from "react-hot-toast"

interface LikeButtonProps {
  songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const [isLiked, setIsLiked] = useState(false)

  // Check if the song is already liked (localStorage-based)
  useEffect(() => {
    const likedSongs = JSON.parse(localStorage.getItem("liked_songs") || "[]")
    if (likedSongs.includes(songId)) {
      setIsLiked(true)
    }
  }, [songId])

  const handleLike = () => {
    const likedSongs = JSON.parse(localStorage.getItem("liked_songs") || "[]")

    if (isLiked) {
      // Remove the song from liked songs
      const updatedLikes = likedSongs.filter((id: string) => id !== songId)
      localStorage.setItem("liked_songs", JSON.stringify(updatedLikes))
      setIsLiked(false)
      toast.success("Unliked")
    } else {
      // Add the song to liked songs
      likedSongs.push(songId)
      localStorage.setItem("liked_songs", JSON.stringify(likedSongs))
      setIsLiked(true)
      toast.success("Liked")
    }
  }

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#ef4444" : "white"} size={25} />
    </button>
  )
}

export default LikeButton
