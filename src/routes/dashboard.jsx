import { Link } from 'react-router-dom'

// <li>
//     <Link to="/dashboard/invoices">Invoices</Link>
// </li>
export default function DashboardPage() {
    return (
        <>
            <h1>Dashboard page</h1>
            <p>This is a protected page.</p>

            <ul>
                <li>
                    <Link to="/">Return to index</Link>
                </li>
            </ul>
        </>
    )
}
