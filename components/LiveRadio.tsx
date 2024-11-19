"use client";

import { useState, useRef } from "react";

const LiveRadio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Updated togglePlay function with error handling
  const togglePlay = () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
      alert("Unable to play the live stream. Please try again later.");
    }
  };

  return (
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-md max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Live Radio</h2>
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-lg font-semibold">Now Streaming:</p>
          <p className="text-red-400 text-xl font-bold">LMAM STUDIOS</p>
        </div>
        <button
          onClick={togglePlay}
          className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-400 transition"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
      <audio
        ref={audioRef}
        src="https://26363.live.streamtheworld.com/TCMIR_SC?dist=ChristianRadio"
        preload="auto"
        className="hidden"
      ></audio>
    </div>
  );
};

export default LiveRadio;
