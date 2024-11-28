import { Link } from 'react-router-dom'


export default function CreateTrip(){



    return(
        <>
        <div className='flex  flex-col p-10  pt-20 sm:m-10'>

            <h1 className='text-4xl font-bold font-sans self-center'>Create New Trip</h1>
            <p className=' text-sm sm:text-base pt-8 self-center'>Fill in the detials to start a new trip</p>

            <div className='flex flex-col sm:flex-row justify-around pt-10  sm:gap-20 gap-12'>

                <div className='flex flex-col'>
                    <h3 className='sm:text-xl text-lg font-medium pb-5'>Trip Name</h3>
                    <input type="text" className='text-2xl font-bold pl-4 sm:w-20w w-full  p-1 h-12 h-10 border-2 border-black rounded-2xl '/>

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
                <Link className='text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-white bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105'>Start Trip</Link>
            </div>

        </div>
        
        
        
        </>
    );
}