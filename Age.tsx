"use client";
import React, { useState } from "react";
import Image from "next/image";
import { OptionField } from "./StoryType";

function Age({ userSelection, goNext, goPervious }: any) {

   
  const OptionList = [
    {
      label: "0-2 Years",
      imageUrl: "/2years.png",
      isFree: true,
    },

    {
      label: "3-5 Years",
      imageUrl: "/3yeras.png",
      isFree: true,
    },

    {
      label: "5-8 Year",
      imageUrl: "/8yeras.png",
      isFree: true,
    },
  ];

  const [selectedOption, setSelectedOption] = useState<string>("");
  const onclickhandler=()=>{
    userSelection((prevState: any)=>{return {...prevState,Age:selectedOption}});
  goNext()}

  const onUserSelect = (item: OptionField) => {
    setSelectedOption(item.label);
   
      
  }

  return (
    <div className="p-6  rounded-lg shadow-md">
      <label className="font-bold text-4xl text-primary">4. What's your Age?</label>
      <div className="grid grid-cols-3 gap-5 mt-6">
        {OptionList.map((item, index) => (
          <div
            key={index}
            className={`relative cursor-pointer p-2 transform transition-all duration-300 hover:scale-105 hover:shadow-lg
              ${
                selectedOption === item.label
                  ? "border-4 rounded-xl border-blue-500"
                  : "border border-gray-300 rounded-xl"
              }
            `}
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

export default Age;
