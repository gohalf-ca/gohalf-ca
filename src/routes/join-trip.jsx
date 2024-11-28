import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function  Jointrip(){
    const [code, setCode] = useState("");
    const [valid, setValid] = useState(false);

    let handleChange = (event) => {
        setCode(event.target.value)

        event.target.value.length === 6 ? setValid(true) : setValid(false)
    }

    


    return(
        <>

        <div className='sm:px-20 pt-1 sm:m-20'>

        
            <div className='flex flex-col pt-20 justify-center gap-3 sm:px-20 sm:mx-20'>

                
                    <h1 className='text-4xl font-bold font-sans self-center'>Join Existing Trip</h1>
                    <p className=' text-sm sm:text-base pt-6 pb-4 self-center'>Enter code to join trip!</p>
                    <div className='pt-16'/>
                    <input maxLength={6} value={code} placeholder='Enter 6 Digit Code' onChange={handleChange} type="text" className='text-center text-2xl font-bold sm:w-20w w-9/12  self-center p-1 h-12 h-10 border-2 border-black rounded-2xl '/>
                    <div className='pt-5 sm:pt-0'/>

                    <Link className={valid ? 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-white bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105' 
                        : 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-gray-600 bg-zinc-300'}>Join Selected Trip</Link>
               
                
            </div>
        </div>
        
        </>
    )
}