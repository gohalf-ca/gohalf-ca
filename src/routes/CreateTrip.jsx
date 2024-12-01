import {  Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';


export default function CreateTrip(){
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [valid, setValid] = useState(false);
    const {user} = useUser();
    
    let handleChange = (event) => {
        setTitle(event.target.value)

        event.target.value.length >= 5 ? setValid(true) : setValid(false)
    }



    let createTrip = async () => {
        if (!valid){
            return
        }
        
        const clerk_ID = user.id;

        //get userID to do other api calls
        const userID = await fetch(`${import.meta.env.VITE_Backend_URL}/getuserid/${clerk_ID}`)
        .then(response => response.json());


        const response = await fetch(`${import.meta.env.VITE_Backend_URL}/trips`,{
            method: "POST", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json", 
            },
            body: JSON.stringify({
                owner_id: userID.ID, 
                name: title, // Trip name
                trip_desc: ""

            })
        }).then(response => response.json()).then(response => response.trip_id);

          //, {state: {tripID: userID}}

        navigate(`/tripDetails/${response}`)
    }




    return(
        <>
        <div className='flex  flex-col p-10  pt-20 sm:m-10'>

            <h1 className='text-4xl font-bold font-sans self-center'>Create New Trip</h1>
            <p className=' text-sm sm:text-base pt-8 self-center'>Fill in the detials to start a new trip</p>

            <div className='flex flex-col sm:flex-row justify-around pt-10  sm:gap-20 gap-12'>

                <div className='flex flex-col'>
                    <h3 className='sm:text-xl text-lg font-medium pb-5'>Trip Name</h3>
                    <input type="text" value={title} onChange={handleChange} className='text-2xl font-bold pl-4 sm:w-20w w-full  p-1 h-12 h-10 border-2 border-black rounded-2xl '/>

                </div>

                <div className='flex flex-col'>
                    <h3 className='sm:text-xl text-lg font-medium pb-5'>Currency</h3>

                    <div className='flex flex-row sm:gap-10 gap-6 flex-wrap'>
                        <button className='border-2 border-greygrey  p-2 rounded-xl transition hover:bg-black hover:text-white font-medium  hover:-translate-y-0.5 hover:scale-105'>$ CAD</button>
                        <button className='border-2 border-greygrey  p-2 rounded-xl transition hover:bg-black hover:text-white font-medium  hover:-translate-y-0.5 hover:scale-105'>$ USD</button>
                        <button className='border-2 border-greygrey  p-2 rounded-xl transition hover:bg-black hover:text-white font-medium  hover:-translate-y-0.5 hover:scale-105'>€ Euro</button>
                        <button className='border-2 border-greygrey  p-2 rounded-xl transition hover:bg-black hover:text-white font-medium  hover:-translate-y-0.5 hover:scale-105'>£ GBP</button>
                    </div>
                   
                </div>

            </div>

            <div className='self-center pt-20 sm:mt-20'>
                <button onClick={createTrip} className={valid ? 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-white bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105' 
                        : 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-gray-600 bg-zinc-300'}>Start Trip</button>
            </div>

        </div>
        
        
        
        </>
    );
}