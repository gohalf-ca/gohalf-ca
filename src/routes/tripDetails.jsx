import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
import { ExpenseCard } from '../components/expense-card';
import { Input } from '../components/ui/input';
// import { useNavigate } from 'react-router-dom';

export default function ViewTripDetails() {
    // const navigate = useNavigate();
    const { getToken } = useAuth();
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '' });
    const [userID, setUserID] = useState();

    const { user } = useUser();

    useEffect(() => {
        let initialSetUp = async () => {
            // Api call to get userID, so it can be used in other api call where needed
            setUserID(await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${user.id}`)
                .then(response => response.json())
                .then(response => response.ID));

            // Retrieve trip data 
            const tripData = await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}`)
                .then(response => response.json());

            setTrip(tripData);
        }
        if (user?.id) {
            initialSetUp();
        }
    }, [user, tripId]);



    async function get_expenses() {
        try {
            let res = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}`)
            if (!res.ok) {
                throw new Error("Error occured during pull")
            }
            let data = await res.json();
            if (Array.isArray(data?.results)) {
                setExpenses(data.results)
            }
        } catch (err) {
            console.log(`Error occured during pull of trip: ${err}`)
        }
    }

    useEffect(() => {
        async function get_expenses() {
            try {
                let res = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}`)
                if (!res.ok) {
                    throw new Error("Error occured during pull")
                }
                let data = await res.json();
                if (Array.isArray(data?.results)) {
                    setExpenses(data.results)
                }
            } catch (err) {
                console.log(`Error occured during pull of trip: ${err}`)
            }
        }
        void get_expenses();
    }, [tripId]);


    async function handle_mark_as_paid(expense_id) {
        const token = await getToken();
        const url = `${import.meta.env.VITE_API_URL}/expenses/${expense_id}/mark-as-paid`
        try {
            const res = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            })
            if (res.ok) {
                setExpenses(await get_expenses().results)
            }
        } catch (err) {
            console.log("err:", err);
        }
    };


    const addExpense = async () => {
        const token = await getToken();
        // APi call to pass through values of input fields to create expense
        await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                trip_id: tripId,
                user_id: userID,
                //  TODO: Deal with the name field
                name: newExpense.description,
                description: newExpense.description,
                amount: newExpense.amount
            }), // Send the expense data
        });
        setNewExpense({ amount: '', description: '' })
        setExpenses(await get_expenses().results)  // Refreshes expense list by getting recent one from DB
    };


    // const deleteExpense = async (expense_id) => {
    //     try {
    //         //  Attemts to delete with expense ID
    //         await fetch(`${import.meta.env.VITE_API_URL}/expenses/${expense_id}`, {
    //             method: "DELETE", // Specify the HTTP method
    //             headers: {
    //                 "Content-Type": "application/json",
    //             }
    //         })
    //
    //         setExpenses(await get_expenses().results)    //  Refreshes expenses list
    //     } catch (err) {
    //         console.log("Error occured when deleting expense: " + err)
    //     }
    // };

    return (
        <div className="lg:px-20 pt-1 sm:m-20 text-foreground min-h-screen p-4">
            {trip ? (
                <>
                    <div
                        className="relative bg-cover bg-center h-60 rounded-lg overflow-hidden"
                        style={
                            trip.photo ?
                                { backgroundImage: `url(${trip.photo})` }
                                : { backgroundColor: '#313131' }

                        }
                    >
                        <div className="absolute inset-0 bg-opacity-50 bg-secondary flex justify-center items-center">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold">{trip.name}</h1>
                                <p>({trip.code})</p>
                            </div>
                        </div>
                    </div>

                    {/* <div className="mt-6 flex justify-center">
                        <ResponsiveContainer width="80%" height={300}>
                            <PieChart>
                                <Pie
                                    data={calculateShare(expenses, participants)}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={150}
                                    label
                                >
                                    {calculateShare(expenses, participants).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8884d8' : '#82ca9d'} />
                                    ))}
                                </Pie>
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div> */}

                    <div className="mt-6">
                        <h2 className="text-2xl font-bold">Add a New Expense</h2>
                        <div className="flex flex-col space-y-4 mt-4">
                            <Input
                                type="number"
                                placeholder="Amount"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className="border p-2 rounded text-black-100"
                            />
                            <Input
                                type="text"
                                placeholder="Description"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                className="border p-2 rounded text-black-100"
                            />
                            <Button
                                onClick={addExpense}
                                variant="outline"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Expenses</h2>
                        <div className="my-4">
                            {expenses?.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
                                    {expenses.map((expense) => (
                                        <ExpenseCard key={expense.expense_id} handle_mark_as_paid={handle_mark_as_paid} expense={expense} />
                                    ))}
                                </div>
                            ) : (
                                <p>No expenses found</p>
                            )}
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading trip details...</p>
            )}
        </div>
    );
}




