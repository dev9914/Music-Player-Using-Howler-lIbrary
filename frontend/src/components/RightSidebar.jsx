import React, { useEffect, useRef, useState } from "react";
import { Howl } from "howler";
import {
  FaBackwardStep,
  FaForwardStep,
  FaPlay,
  FaPause,
  FaShuffle,
} from "react-icons/fa6";
import { PiRepeatBold } from "react-icons/pi";

const RightSidebar = ({ selectedSong, setSelectedSong, songs = [] }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [songIndex, setSongIndex] = useState(0);
  const [howlInstance, setHowlInstance] = useState(null);
  const intervalRef = useRef(null);

  const loadSong = (index) => {
    if (howlInstance) {
      howlInstance.unload(); // Unload the previous song
    }

    const filePath = `https://music-player-using-howler-library.onrender.com${songs[index]?.filePath}`;

    const newHowl = new Howl({
      src: [filePath],
      html5: true,
      onload: () => {
        setDuration(newHowl.duration());
        console.log("Song loaded successfully:", songs[index]?.title);
      },
      onplay: () => {
        setIsPlaying(true);
        clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => {
          const currentSeek = newHowl.seek(); // Fetch current playback position
          if (typeof currentSeek === "number") {
            setCurrentTime(currentSeek);
          }
        }, 1000);
      },
      onend: () => nextSong(),
    });

    setHowlInstance(newHowl);
    newHowl.play();
    setSelectedSong(songs[index]);
  };

  const playSong = () => {
    if (howlInstance) {
      howlInstance.play();
      setIsPlaying(true);
    } else if (songs.length > 0) {
      loadSong(songIndex); // Load and play the first song if no instance exists
    }
  };

  const pauseSong = () => {
    if (howlInstance) {
      howlInstance.pause();
      setIsPlaying(false);
      clearInterval(intervalRef.current);
    }
  };

  const nextSong = () => {
    const nextIndex = (songIndex + 1) % songs.length;
    setSongIndex(nextIndex);
  };

  const previousSong = () => {
    const prevIndex = (songIndex - 1 + songs.length) % songs.length;
    setSongIndex(prevIndex);
  };

  const seekSong = (value) => {
    if (howlInstance) {
      howlInstance.seek(value);
      setCurrentTime(value);
    }
  };

  // Ensure the first song is loaded on initial render
  useEffect(() => {
    if (songs.length > 0) {
      setSelectedSong(songs[0]); // Optionally, set the first song in UI without autoplay
    }
  }, [songs]);

  useEffect(() => {
    if (songs.length > 0 && songs[songIndex]) {
      loadSong(songIndex);
    }
  }, [songIndex]);

  useEffect(() => {
    if (selectedSong) {
      const selectedIndex = songs.findIndex(
        (song) => song._id === selectedSong._id
      );
      if (selectedIndex !== -1) {
        setSongIndex(selectedIndex);
      }
    }
  }, [selectedSong]);

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
      if (howlInstance) howlInstance.unload();
    };
  }, []);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div className="w-[350px] flex flex-col justify-end h-screen bg-third-primary text-white p-4">
      <div className="mx-5 mb-3 mr-7 rounded-lg bg-fourth-primary">
        <div className="flex flex-col items-center">
          <p className="font-sans opacity-95 p-4 text-sm font-semibold">
            Now Playing
          </p>
          <img
            src={songs[songIndex]?.songImage || "https://via.placeholder.com/150"}
            className="w-56 h-40 object-cover mb-5 rounded-lg"
            alt={songs[songIndex]?.title || "No Image"}
          />
          <p className="font-sans text-lg font-bold mb-1">
            {songs[songIndex]?.title || "Unknown"}
          </p>
          <p className="font-sans opacity-80">
            {songs[songIndex]?.artist || "Unknown"}
          </p>

          {/* Progress Bar */}
          <div className="w-full flex px-4 items-center gap-2 mt-4">
  <span className="text-xs pr-[10px] text-white">{formatTime(currentTime)}</span> {/* Current time text in white */}
  <div className="relative w-full">
    {/* Remaining Track */}
    <div className="h-1 bg-gray-500 rounded-full">
      {/* Played Portion */}
      <div
        className="h-full bg-white rounded-full" // Set played portion to white
        style={{ width: `${(currentTime / duration) * 100}%` }}
      />
    </div>
    {/* Current Time Dot */}
    <div
      className="absolute top-0 left-0 h-4 w-4 bg-red-500 border-4 border-white rounded-full" // Adjusted for the current time dot
      style={{
        left: `${(currentTime / duration) * 100}%`,
        transform: 'translate(-50%, -50%)', // Center the dot
      }}
    />
    {/* Hidden Input for Range */}
    <input
      type="range"
      min={0}
      max={duration}
      value={currentTime}
      className="absolute inset-0 opacity-0 cursor-pointer" // Hide the default input
      onChange={(e) => seekSong(Number(e.target.value))}
    />
  </div>
  <span className="text-xs pl-[10px] text-white">{formatTime(duration)}</span> {/* Duration text in white */}
</div>


        </div>

        {/* Controls */}
        <div className="mx-5 mt-5 mr-7">
          <div className="flex pb-2 justify-between">
            <PiRepeatBold className="mt-1 cursor-pointer hover:opacity-70" size={19} />
            <FaBackwardStep
              className="cursor-pointer hover:opacity-70"
              size={27}
              onClick={previousSong}
            />
            {isPlaying ? (
              <FaPause
                className="cursor-pointer hover:opacity-70"
                size={27}
                onClick={pauseSong}
              />
            ) : (
              <FaPlay
                className="cursor-pointer hover:opacity-70"
                size={27}
                onClick={playSong}
              />
            )}
            <FaForwardStep
              className="cursor-pointer hover:opacity-70"
              size={27}
              onClick={nextSong}
            />
            <FaShuffle className="mt-1 cursor-pointer hover:opacity-70" size={17} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
