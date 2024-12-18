import { useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react';
import { Button } from '../components/ui/button'
import { useNavigate } from 'react-router-dom';

export default function JoinTrip() {
    const [code, setCode] = useState("");
    const [valid, setValid] = useState(false);
    const { getToken } = useAuth();
    const { user } = useUser();
    const clerk_ID = user.id;
    const navigate = useNavigate();

    let handleChange = (event) => {
        setCode(event.target.value.trim())
        event.target.value.length === 6 ? setValid(true) : setValid(false)
    }

    async function join_trip(trip_code) {
        const token = await getToken();
        const url = `${import.meta.env.VITE_API_URL}/trips/${trip_code}/join`


        try {

            const userID = await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${clerk_ID}`)
                .then(response => response.json());

            const res = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({user_id: userID})
            }).then(response => response.json())
            .then(response => response.result.trip_id)
            const trip_id = await res
            navigate(`/trip-details/${trip_id}`)
        } catch (err) {
            console.log("err:", err);
        }

        
    };

    return (
        <>
            <div className='sm:px-20 text-black-100 dark:text-foreground/80 pt-1 sm:m-20'>
                <div className='flex flex-col pt-20 justify-center gap-3 sm:px-20 sm:mx-20'>
                    <h1 className='text-4xl font-bold font-sans self-center'>Join Trip</h1>
                    <p className=' text-sm sm:text-base pb-4 self-center'>Enter code to join trip!</p>
                    <form className='flex gap-4 items-center'>
                        <input maxLength={6} value={code} placeholder='Enter Code' onChange={handleChange} type="text" className='text-center h-10 text-xl font-bold sm:w-20w w-9/12  self-center dark:border-foreground border dark:bg-background border-black rounded-md ' />
                        <Button variant="outline" className="h-full" disabled={!valid}
                            onClick={(ev) => {
                                ev.preventDefault();
                                join_trip(code)
                            }}>Join</Button>
                    </form>
                    {/*
                    <Link className={valid ? 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105'
                        : 'sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-gray-600 bg-zinc-300'}>Join Selected Trip</Link>
                    */}
                </div>
            </div>

        </>
    )
}
