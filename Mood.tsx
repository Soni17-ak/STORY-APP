"use client";
import Image from "next/image";
import React, { useState, useRef } from "react";
import { OptionField } from "./StoryType";

function Mood({ userSelection, goNext, goPervious }: any) {
  const OptionList = [
    { label: "Happy", imageUrl: "/happy.png", isFree: true },
    { label: "Calm", imageUrl: "/relax.png", isFree: true },
    { label: "Dramatic", imageUrl: "/dramatic.png", isFree: true },
    { label: "Sleepy", imageUrl: "/sleepy.png", isFree: true },
    { label: "Adventure", imageUrl: "/adventure1.png", isFree: true },
    { label: "Gloomy", imageUrl: "/gloomy.png", isFree: true },
    { label: "Hopeful", imageUrl: "/hope.png", isFree: true },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
  };

  const onclickhandler = () => {
    userSelection((prevState: any) => ({
      ...prevState,
      Mood: selectedOption,
    }));
    goNext();
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <label className="font-bold text-4xl text-primary">3. What's Your Mood?</label>
      <div className="relative overflow-hidden mt-6">
        <div className="absolute top-1/2 -left-6 transform -translate-y-1/2">
          <button
            onClick={scrollLeft}
            className="bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 focus:outline-none transition-all duration-300"
          >
            ◀
          </button>
        </div>
        <div className="absolute top-1/2 -right-6 transform -translate-y-1/2">
          <button
            onClick={scrollRight}
            className="bg-gray-300 p-2 rounded-full shadow-lg hover:bg-gray-400 focus:outline-none transition-all duration-300"
          >
            ▶
          </button>
        </div>
        <div
          ref={scrollContainerRef}
          className="flex gap-5 overflow-x-auto scroll-smooth scrollbar-hide w-full"
        >
          {OptionList.map((item, index) => (
            <div
              key={index}
              className={`relative cursor-pointer p-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${
                selectedOption === item.label
                  ? "border-4 rounded-xl border-blue-500"
                  : "border border-gray-300 rounded-xl"
              }`}
              onClick={() => onUserSelect(item)}
            >
              <div className="h-32 bg-gradient-to-r from-green-400 to-green-200 rounded-xl flex items-center justify-center">
                <h2 className="text-white font-semibold text-lg">{item.label}</h2>
              </div>
              <Image
                src={item.imageUrl}
                alt={item.label}
                width={600}
                height={400}
                className="object-cover h-[120px] rounded-xl mt-2"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button
          onClick={goPervious}
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 focus:outline-none transition-all duration-300"
        >
          Previous
        </button>
        <button
          onClick={onclickhandler}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300 "
        >
          Go Next
        </button>
      </div>
    </div>
  );
}

export default Mood;
