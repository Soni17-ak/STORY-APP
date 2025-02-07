"use client";
import React, { useState } from 'react';
import Describe from './_Components/Describe';
import StoryType from './_Components/StoryType';
import Age from './_Components/Age';
import Mood from './_Components/Mood';
import Character from './_Components/Character';
import Back from './_Components/Back';
import Image from 'next/image';
import BackgroundMusicSelector from './_Components/BackgroundMusicSelector';
import { chatSession } from '@/config/GeminiAi';
import { db } from '@/config/db';
import { StoryData } from '@/config/schema';
//@ts-ignore
import uuid4 from 'uuid4';
import CustomLoader from './_Components/CustomLoader';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Button } from '@nextui-org/button';
import { useRouter } from "next/navigation";





const CREATE_STORY_PROMPT=process.env.NEXT_PUBLIC_CREATE_STORY_PROMPT
export interface fieldData {
  fieldName: string;
  fieldValue: string;
}

export interface formDataType{
  Describe:string,
  StoryType:string,
  Age:string,
  Back:string,
  Mood:string,
  Character:string,
  BackgroundMusicSelector:string
}

function  CreateStory() {
  const [formData, setFormData] = useState<formDataType>();
  const notify = (msg:string) => toast(msg);
  const notifyError = (msg:string) => toast.error(msg);
  const[loading, setLoading, ]=useState(false);
  const {user}=useUser();
  const [step, setStep] = useState(0) ;
  const router=useRouter();
 

  const onHandleUserSelection = (data: fieldData) => {
   
    

    console.log(data);
  };

  const goNext = () => {
    notify('Choice Is Selected');
    setStep((prevStep) => prevStep + 1);
  };
  const goPervious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  

  const GenerateStory =async()=>{
    setLoading(true)

    const FINAL_PROMPT=CREATE_STORY_PROMPT
    ?.replace('{age}',formData?.Age??'')
    .replace('{storyType}',formData?.StoryType??'')
    .replace('{title}',formData?.Describe??'')
    .replace('{Mood}',formData?.Mood??'')
    .replace('{Character}',formData?.Character??'')
    .replace('{background scenes}',formData?.Back??'')
    .replace('{background music}',formData?.BackgroundMusicSelector??'')
    //for story generation
    try{
      const result=await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response.text());
      notify('Story Generated Sucessfully')
      const resp=await SaveInDB(result?.response.text());
      console.log(resp);
      
      setLoading(false);
      {/*@ts-ignore*/}
     router.push(`/view-story/${resp[0]?.storyId}`)

    }catch(e){
      console.log(e)
      notifyError('Server Error, Try Again')
      setLoading(false);
    }
  }
         //save in db
 const SaveInDB=async(output:string)=>{
  const recordId=uuid4();
  setLoading(true)
  try{
    console.log(formData);
   const result=await db.insert(StoryData).values({
     storyId:0,
     Describe:formData?.Describe,
     StoryType:formData?.StoryType,
     Mood:formData?.Mood,
     Age:formData?.Age,
     Character:formData?.Character,
     Back:formData?.Back,
     BackgroundMusicSelector:formData?.BackgroundMusicSelector,
     output:JSON.parse(output),
     userEmail:user?.primaryEmailAddress?.emailAddress,
     userName:user?.fullName
   })
   .returning({storyId:StoryData?.id})
   setLoading(false);
   return result;

  }
   catch(e)
   {
    setLoading(false);

   }
   
  }

  return (
    
    <div>
      <div style={{
              zIndex:-1,
              position:"fixed",
              width:"100vw",
              height:"100vh",
             }}>
              <Image
              src="/123.png"
              alt="bg"
              layout="fill"
              objectFit="cover"/>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col items-center justify-center p-4 sm:p-8 md:px-16 lg:px-32 xl:px-40 text-center z-10 absolute
      ">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-white">
          CREATE YOUR STORY
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white">
          Unlock your creativity with WonderVerse. Craft your stories like never
          before! Let our app bring your imagination to life, one story at a
          time.
        </p>

        {/* Step Content */}
        <div className="w-full max-w-4xl">
          {step === 0 && (
            <Describe userSelection={setFormData} goNext={goNext} data={formData?.Describe} />
          )}
          {step === 1 && (
            <StoryType
              userSelection={setFormData}
              goNext={goNext}
              goPervious={goPervious}
            />
          )}
          {step === 2 && (
            <Mood
              userSelection={setFormData}
              goNext={goNext}
              goPervious={goPervious}
            />
          )}
          {step === 3 && (
            <Age
              userSelection={setFormData}
              goNext={goNext}
              goPervious={goPervious}
            />
          )}
          {step === 4 && (
            <Character
              userSelection={setFormData}
              goNext={goNext}
              goPervious={goPervious}
            />
          )}
          {step === 5 && (
            <Back
              userSelection={setFormData}
              goNext={goNext}
              goPervious={goPervious}
            />
          )}
           {step === 6 && (
            <BackgroundMusicSelector
            userSelection={setFormData}
            goPervious={goPervious} 
            />
          )}
        </div>
        
        <div className='flex justify-end my-10'>
        {/* <Link href={"/view-story/203"} > */}
        <button
          disabled={loading}
          className={`px-6 py-3 text-2xl font-semibold text-white transition-all duration-300 rounded-lg shadow-lg ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-purple-500 hover:to-indigo-500 transform hover:scale-105'
          }`}
          onClick={GenerateStory}
        >
          {loading ? 'Loading...' : 'Generate Story'}
        </button>
        {/* </Link> */}
        </div>
        <CustomLoader isLoading={loading}/>
       

      </div>
      
    </div>
  );
}

export default CreateStory;