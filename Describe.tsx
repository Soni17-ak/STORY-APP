"use client"
import { Button } from '@nextui-org/button';
import { Textarea } from '@nextui-org/input';
import Link from 'next/link';
import React, { useState } from 'react';

function Describe({userSelection,goNext,data}:any) {
  const [text,setText]=useState(data);
  const onclickhandler=()=>{
    userSelection((prevState: any)=>{return {...prevState,Describe:text}});
  goNext()}

  return (
    <div>

      <label className='font-bold text-4xl text-primary'>1. Title of the Story</label>
      <Textarea
      placeholder='Write the Title of story which you want to generate'
      value={text}
      size='lg'
      classNames={{
        input:'resize-y min-h-[70px] text-2xl p-5'}}
        
      onChange={(e)=>setText(
        e.target.value
      )}/>
      <div className="flex justify-between p-4">
      <button
        onClick={onclickhandler}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
      >
        GO Next
      </button>
      
    </div>
    </div>
    
  )
}



export default Describe
