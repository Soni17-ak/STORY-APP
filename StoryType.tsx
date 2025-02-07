"use client";
import React, { useState } from "react";
import Image from "next/image";

export interface OptionField {
  label: string;
  imageUrl: string;
  isFree: boolean;
}

function StoryType({ userSelection, goNext, goPervious }: any) {
  const OptionList = [
    { label: "ADVENTURE", imageUrl: "/ADVEN.png", isFree: true },
    { label: "FRIENDSHIP", imageUrl: "/friends.png", isFree: true },
    { label: "Fairytales", imageUrl: "/fairy.png", isFree: true },
    { label: "Bed Time", imageUrl: "/bedtime.png", isFree: true },
    { label: "CONSTELLATIONS", imageUrl: "/spaces.png", isFree: true },
    { label: "HORROR", imageUrl: "/horror.png", isFree: true },
    { label: "SUPERHEROS", imageUrl: "/super.png", isFree: true },
    { label: "FANTASY", imageUrl: "/drygons.png", isFree: true },
    { label: "FABLE", imageUrl: "/fable.png", isFree: true },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("");

  const onclickhandler = () => {
    userSelection((prevState: any) => ({
      ...prevState,
      StoryType: selectedOption,
    }));
    goNext();
  };

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <label className="font-bold text-4xl text-primary">2. Story Type</label>
      <div className="mt-6 overflow-x-auto">
        <div className="flex space-x-5 w-max">
          {OptionList.map((item, index) => (
            <div
              key={index}
              className={`relative cursor-pointer flex-shrink-0 w-60 p-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
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
                width={300}
                height={500}
                className="object-cover h-[160px] rounded-xl mt-2"
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

export default StoryType;
