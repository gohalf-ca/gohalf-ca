import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

// Import the layouts
import RootLayout from './layouts/root-layout'
import DashboardLayout from './layouts/dashboard-layout'

// Import the components
import IndexPage from './routes'
// import ContactPage from './routes/contact'
import SignInPage from './routes/sign-in'
import SignUpPage from './routes/sign-up'
import DashboardPage from './routes/dashboard'
import CreateTrip from './routes/CreateTrip'
import Jointrip from './routes/join-trip'
import JoinLink from './routes/joinLink'
import CreateLink from './routes/createLink'
import ExpensesPage from './routes/expenses'
import MainTripsPage from './routes/maintrip'
import ViewTripDetails from './routes/tripDetails'


const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: '/', element: <IndexPage /> },
            // { path: '/contact', element: <ContactPage /> },
            { path: '/sign-in/*', element: <SignInPage /> },
            { path: '/sign-up/*', element: <SignUpPage /> },
            {
                element: <DashboardLayout />,
                path: 'dashboard',
                children: [
                    { path: '/dashboard', element: <DashboardPage /> },
                    // { path: '/dashboard/invoices', element: <InvoicesPage /> },
                ],
            },
            { path: '/CreateTrip', element: <CreateTrip /> },
            { path: '/JoinTrip', element: <Jointrip /> },
            { path: '/createLink', element: <CreateLink /> },
            { path: '/joinLink', element: <JoinLink /> },
            { path: '/expenses', element: <ExpensesPage /> },
            { path: '/trips', element: <MainTripsPage /> },
            { path: '/trip-details/:tripId', element: <ViewTripDetails /> },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
