"use client"

import { useSessionContext } from "@supabase/auth-helpers-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"

interface LikeButtonProps {
  songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from("liked_songs")
        .select("*")
        .eq("song_id", songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (isLiked) {
      const { error } = await supabaseClient
        .from("liked_songs")
        .delete()
        .eq("song_id", songId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
        toast.success("Unliked")
      }
    } else {
      const { error } = await supabaseClient.from("liked_songs").insert({
        song_id: songId,
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success("Liked")
      }
    }

    router.refresh()
  }

  return (
    <button onClick={handleLike} className="hover:opacity-75 transition">
      <Icon color={isLiked ? "#ef4444" : "white"} size={25} />
    </button>
  )
}

export default LikeButton
