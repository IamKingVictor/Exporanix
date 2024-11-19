"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const reels = [
  {
    image: "/announcement/Banner 1.jpg", 
    text: "Introducing our brand-new playlist featuring handpicked songs that are perfect for every mood. Discover a mix of genres and timeless hits crafted just for you. Tap in and elevate your vibe today!",
  },
  {
    image: "/announcement/Banner 2.jpg",
    text: "Stay ahead of the curve with our trending hits section! Explore the latest chart-toppers, viral sensations, and undiscovered gems all in one place. Your next favorite song is just a click away!",
  },
  {
    image: "/announcement/Banner 3.jpg",
    text: "Enjoy an exclusive offer you don’t want to miss! Get lateset updates on songs from your favorite artists. Stay up to date with the trend and never miss a beat. Enjoy absolutely free—uninterrupted music, offline playlists, no ads, and more. Sign up today and take your listening experience to the next level.",
  },
];


const AnnouncementBanner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reels.length);
    }, 4000); // Change reel every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-48 lg:h-64 overflow-hidden">
      <AnimatePresence>
        {reels.map((reel, i) =>
          i === index ? (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
              className="absolute flex items-center w-full h-full"
            >
              {/* Image */}
              <Image
                src={reel.image}
                alt={reel.text}
                className="w-full lg:w-1/2 h-full object-cover rounded-lg"
              />

              {/* Text */}
              <div className="hidden lg:flex flex-col justify-center items-start p-4 w-1/2 bg-gray-900 text-white">
                <p className="text-lg font-bold">{reel.text}</p>
              </div>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnnouncementBanner;
