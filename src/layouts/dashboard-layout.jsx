import * as React from 'react'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardLayout() {
    const { userId, isLoaded } = useAuth()
    const navigate = useNavigate()

    console.log('test', userId)

    React.useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded])

    if (!isLoaded) return 'Loading...'

    return <Outlet />
}
