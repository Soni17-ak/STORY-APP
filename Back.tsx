"use client";
import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

function Back({ userSelection, goNext, goPervious }: any) {
  const OptionList = [
    { label: "FOREST", imageUrl: "/1forest.png", isFree: true },
    { label: "GARDEN", imageUrl: "/garden.png", isFree: true },
    { label: "RIVER", imageUrl: "/forest.png", isFree: true },
    { label: "PALACE", imageUrl: "/palace.png", isFree: true },
    { label: "OCEAN", imageUrl: "/ship.png", isFree: true },
    { label: "VILLAGE", imageUrl: "/villageice.png", isFree: true },
    { label: "BEACH", imageUrl: "/beach.png", isFree: true },
    { label: "HOMETOWN", imageUrl: "/tree.png", isFree: true },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("");

  const onclickhandler = () => {
    userSelection((prevState: any) => ({
      ...prevState,
      Back: selectedOption,
    }));
    goNext();
  };

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <label className="font-bold text-4xl text-primary">
        6. Choose your Background
      </label>
      <div className="flex overflow-x-scroll space-x-5 mt-6 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200">
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 cursor-pointer p-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg w-48
              ${
                selectedOption === item.label
                  ? "border-4 rounded-xl border-blue-500"
                  : "border border-gray-300 rounded-xl"
              }`}
            onClick={() => onUserSelect(item)}
          >
            <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-200 rounded-xl flex items-center justify-center">
              <h2 className="text-white font-semibold text-lg">{item.label}</h2>
            </div>
            <Image
              src={item.imageUrl}
              alt={item.label}
              width={300}
              height={500}
              className="object-cover h-[160px] rounded-xl mt-2"
            />
          </div>
        ))}
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
          
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none transition-all duration-300"
        >
          Go Next
        </button>
      </div>
    </div>
  );
}

export default Back;
