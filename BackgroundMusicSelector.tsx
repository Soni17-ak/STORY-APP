"use client";
import React, { useState, useEffect } from "react";

function BackgroundMusicSelector({ userSelection, goNext, goPervious }: any) {
  const musicTracks = [
    { name: "Relaxing Piano", src: "music/better-kids-day-275686.mp3" },
    { name: "Upbeat Fun", src: "music/children-playing-222018.mp3" },
    { name: "Magical Adventure", src: "music/kids-music-118820.mp3" },
    { name: "Funny Baby", src: "music/cute-baby-funny-happy-children-music-290087.mp3" },
    { name: "Super Duper", src: "music/super-duper-fun-124565.mp3" },
    { name: "Happy Kids", src: "music/funny-music-happy-kids-children-baby-background-intro-theme-277014.mp3" },
  ];

  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (selectedTrack) {
      const newAudio = new Audio(selectedTrack);
      newAudio.volume = volume;
      setAudio(newAudio);

      return () => {
        if (audio) {
          audio.pause();
          audio.src = "";
        }
      };
    }
  }, [selectedTrack]);

  const onclickhandler = () => {
    userSelection((prevState: any) => ({
      ...prevState,
      BackgroundMusic: selectedTrack,
    }));
    goNext();
  };

  const onUserSelect = (track: { name: string; src: string }) => {
    if (audio) {
      audio.pause();
    }
    setSelectedTrack(track.src);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
    if (audio) {
      audio.volume = newVolume;
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <label className="font-bold text-4xl text-primary">7. Choose Background Music</label>
      <div className="grid grid-cols-3 gap-5 mt-6">
        {musicTracks.map((track, index) => (
          <div
            key={index}
            className={`relative cursor-pointer p-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${selectedTrack === track.src ? "border-4 rounded-xl border-blue-500" : "border border-gray-300 rounded-xl"}`}
            onClick={() => onUserSelect(track)}
          >
            <div className="h-24 bg-gradient-to-r from-blue-400 to-blue-200 rounded-xl flex items-center justify-center">
              <h2 className="text-white font-semibold text-lg">{track.name}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center mt-8">
        <button
          onClick={handlePlayPause}
          disabled={!selectedTrack}
          className={`px-6 py-3 rounded-full text-white text-lg transition duration-300 focus:outline-none
            ${isPlaying ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
            ${!selectedTrack ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          {isPlaying ? "Pause" : "Play"} Music
        </button>
        <div className="mt-6 flex items-center gap-3">
          <label htmlFor="volume" className="text-lg font-medium">Volume:</label>
          <input
            type="range"
            id="volume"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={handleVolumeChange}
            className="w-48"
          />
        </div>
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={goPervious}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-300"
        >
          Previous
        </button>
        
      </div>
    </div>
  );
}

export default BackgroundMusicSelector;
