import { Song } from "@/types"
import MediaItem from "./MediaItem"
import LikeButton from "./LikeButton"
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai"
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2"
import { FaRandom, FaRedoAlt } from "react-icons/fa"
import Slider from "./Slider"
import usePlayer from "@/hooks/usePlayer"
import { useEffect, useState, useRef } from "react"
import useSound from "use-sound"

interface PlayerContentProps {
  song: Song
  songUrl: string
}

const PlayerContent: React.FC<PlayerContentProps> = ({ song, songUrl }) => {
  const player = usePlayer()
  const [volume, setVolume] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [loopState, setLoopState] = useState<"none" | "playlist" | "song">(
    "none"
  )
  const [isShuffled, setIsShuffled] = useState(false)
  const progressInterval = useRef<NodeJS.Timeout>()
  const shuffledIds = useRef<string[]>([])

  const Icon = isPlaying ? BsPauseFill : BsPlayFill
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave

  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    onplay: () => {
      setIsPlaying(true)
      setDuration(sound?.duration() || 0)
      // Start progress tracking immediately
      if (sound) {
        setCurrentTime(sound.seek() || 0)
        progressInterval.current = setInterval(() => {
          const current = sound.seek() || 0
          setCurrentTime(current)
        }, 100)
      }
    },
    onend: () => {
      if (loopState === "song") {
        sound?.seek(0)
        play()
      } else {
        handleEnd()
      }
    },
    onpause: () => {
      setIsPlaying(false)
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
    },
    onseek: () => {
      if (sound) {
        setCurrentTime(sound.seek() || 0)
      }
    },
    format: "mp3",
    preload: true,
  })

  useEffect(() => {
    if (sound) {
      setCurrentTime(sound.seek() || 0)
    }
  }, [sound])

  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current)
      }
      sound?.unload()
    }
  }, [sound])

  useEffect(() => {
    if (isShuffled) {
      shuffledIds.current = [...player.ids].sort(() => Math.random() - 0.5)
    } else {
      shuffledIds.current = []
    }
  }, [isShuffled, player.ids])

  useEffect(() => {
    if (sound) {
      setDuration(sound.duration())
    }
  }, [sound])

  const handleSeek = (value: number) => {
    if (!sound) return

    // Clear existing interval
    if (progressInterval.current) {
      clearInterval(progressInterval.current)
    }
    sound.seek(value)
    setCurrentTime(value)
    // Restart the interval if playing
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (sound) {
          const current = sound.seek() || 0
          setCurrentTime(current)
        }
      }, 100)
    }
  }

  const handlePlay = () => {
    if (!sound) return
    isPlaying ? pause() : play()
  }

  const toggleMute = () => {
    setVolume(volume === 0 ? 1 : 0)
  }

  const toggleLoop = () => {
    setLoopState((prev) =>
      prev === "none" ? "playlist" : prev === "playlist" ? "song" : "none"
    )
  }

  const toggleShuffle = () => {
    setIsShuffled(!isShuffled)
  }

  const getNextSongId = () => {
    if (player.ids.length === 0) return null

    const currentIndex = isShuffled
      ? shuffledIds.current.findIndex((id) => id === player.activeId)
      : player.ids.findIndex((id) => id === player.activeId)

    if (currentIndex === -1) return null

    const ids = isShuffled ? shuffledIds.current : player.ids

    if (currentIndex === ids.length - 1) {
      if (loopState === "playlist") {
        return ids[0]
      }
      return null
    }

    return ids[currentIndex + 1]
  }

  const getPreviousSongId = () => {
    if (player.ids.length === 0) return null

    const currentIndex = isShuffled
      ? shuffledIds.current.findIndex((id) => id === player.activeId)
      : player.ids.findIndex((id) => id === player.activeId)

    if (currentIndex === -1) return null

    const ids = isShuffled ? shuffledIds.current : player.ids

    if (currentIndex === 0) {
      if (loopState === "playlist") {
        return ids[ids.length - 1]
      }
      return null
    }

    return ids[currentIndex - 1]
  }

  const handleEnd = () => {
    const nextId = getNextSongId()
    if (nextId) {
      sound?.stop()
      player.setId(nextId)
    } else {
      setIsPlaying(false)
    }
  }

  const onPlayNext = () => {
    const nextId = getNextSongId()
    if (nextId) {
      sound?.stop()
      player.setId(nextId)
    }
  }

  const onPlayPrevious = () => {
    const previousId = getPreviousSongId()
    if (previousId) {
      sound?.stop()
      player.setId(previousId)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 h-full">
      {/* Left section - Song info */}
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      {/* Center section - Player controls */}
      <div className="flex flex-col items-center justify-center w-full max-w-[722px] gap-y-1">
        {/* Mobile controls */}
        <div className="flex md:hidden justify-center w-full items-center gap-x-3">
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={24} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={22}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
        </div>

        {/* Desktop controls */}
        <div className="hidden md:flex items-center gap-x-4">
          <FaRandom
            onClick={toggleShuffle}
            size={16}
            className={`cursor-pointer transition ${
              isShuffled
                ? "text-red-500"
                : "text-neutral-400 hover:text-red-500"
            }`}
          />
          <AiFillStepBackward
            onClick={onPlayPrevious}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <div
            onClick={handlePlay}
            className="flex items-center justify-center h-8 w-8 rounded-full bg-white p-1 cursor-pointer"
          >
            <Icon size={24} className="text-black" />
          </div>
          <AiFillStepForward
            onClick={onPlayNext}
            size={24}
            className="text-neutral-400 cursor-pointer hover:text-white transition"
          />
          <FaRedoAlt
            onClick={toggleLoop}
            size={16}
            className={`cursor-pointer transition ${
              loopState !== "none"
                ? "text-red-500"
                : "text-neutral-400 hover:text-red-500"
            }`}
          />
        </div>

        {/* Progress bar - show on both mobile and desktop */}
        <div className="w-full flex items-center justify-between px-4 gap-x-2">
          <span className="text-xs text-white">{formatTime(currentTime)}</span>
          <Slider
            value={currentTime}
            onChange={handleSeek}
            max={duration}
            step={0.1}
            ariaLabel="Seek"
            className="w-full h-4 relative flex items-center cursor-pointer"
          />
          <span className="text-xs text-white">{formatTime(duration)}</span>
        </div>
      </div>

      {/* Right section - Volume control (desktop only) */}
      <div className="hidden md:flex w-full justify-end pr-2">
        <div className="flex items-center gap-x-2 w-[120px]">
          <VolumeIcon
            onClick={toggleMute}
            className="cursor-pointer text-neutral-400 hover:text-red-500 transition"
            size={24}
          />
          <Slider
            value={volume}
            onChange={setVolume}
            className="w-full h-[2px] hover:h-[6px] bg-white"
          />
        </div>
      </div>
    </div>
  )
}

export default PlayerContent
