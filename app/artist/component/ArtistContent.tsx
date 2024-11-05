// components/ArtistContent.tsx
import Image from 'next/image';

const artists = [
  { name: 'Testimony-Jaga', image: '/artist/Testimony.jpg' },
  { name: 'Sister Wisdom', image: '/artist/SisterWisdom.jpg' },
  { name: 'Ur Flames', image: '/artist/Ur-flames.jpg' },
  { name: 'Rap Nation', image: '/artist/Rap-nation.jpg' },
];

const ArtistContent = () => {
  return (
    <div className="flex flex-wrap gap-6 mt-8">
      {artists.map((artist, index) => (
        <div
          key={index}
          className="flex flex-col items-center group"
        >
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <Image
              src={artist.image}
              alt={artist.name}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 transform group-hover:opacity-80 group-hover:scale-105"
            />
          </div>
          <p className="mt-2 text-white text-lg font-semibold">{artist.name}</p>
          <p className="text-gray-400">Artist</p>
        </div>
      ))}
    </div>
  );
};

export default ArtistContent;
