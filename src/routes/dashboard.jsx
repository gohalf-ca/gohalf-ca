import { Link } from 'react-router-dom'

// <li>
//     <Link to="/dashboard/invoices">Invoices</Link>
// </li>
export default function DashboardPage() {
    return (
        <>
        <div className='flex flex-col lg:flex-row  sm:m-10 sm:pt-20 pt-10 justify-around content-center pb-15 '>

            <div className='content-center p-10'>
                <h1 className='text-4xl font-bold font-sans'>Welcome To GoHalf Trip Expense Divider!</h1>
                <p className='pt-4'>Manage your trip expenses effortieslly</p>

                <div className='flex flex-col sm:flex-row pt-8 justify-start sm:space-x-6 sm:space-y-0 space-y-5'>
                    <Link to="/JoinTrip" className='text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-7  transition hover:bg-black hover:text-white hover:-translate-y-1 hover:scale-105'>Join an Existing Trip</Link>
                    <Link to="/CreateTrip" className='text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-7 text-white bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105'>Create a New Trip</Link>
                </div>
            </div>

            <div className='min-size-6/12  sm:py-20  py-0 px-10 sm:px-0  mt-7 sm:mt-0'>
            <img className='rounded-lg pb-10' src="https://www.freshbooks.com/wp-content/uploads/2022/02/expense-tracking.jpg" alt="" />
            </div>
           

        </div>
            


        <hr className='' />
        <p>This is a protected page.</p>
        <ul>
            <li>
                <Link to="/">Return to index</Link>
            </li>
        </ul>


        
            
            
        </>
    )
}
