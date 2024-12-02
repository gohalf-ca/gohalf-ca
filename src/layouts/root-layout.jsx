import { Link, Outlet, useNavigate } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { Navbar } from '../components/navbar'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error('Missing Publishable Key')
}

export default function RootLayout() {
    const navigate = useNavigate()

    return (
        <ClerkProvider
            routerPush={(to) => navigate(to)}
            routerReplace={(to) => navigate(to, { replace: true })}
            publishableKey={PUBLISHABLE_KEY}
        >
            <Navbar />
            <main className='min-h-screen'>
                <Outlet />
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 GoHalf. All rights reserved.</p>
                <nav className="sm:ml-auto flex gap-4 sm:gap-6">
                    <Link className="text-xs hover:underline underline-offset-4" to="/trips">
                        Trips
                    </Link>
                    <Link className="text-xs hover:underline underline-offset-4" to="/expenses">
                        Expenses
                    </Link>
                </nav>
            </footer>
        </ClerkProvider>
    )
}
