import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useUser } from '@clerk/clerk-react';



export default function ViewTripDetails() {
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);
    //const [participants, setParticipants] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '' });


    const { user } = useUser();
    const clerk_ID = user.id;
    let userID;

    let initialSetUp = async () => {
        userID = await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${clerk_ID}`)
        .then(response => response.json());
    }

    initialSetUp();


    const refreshExpenses = async() =>{
        //change with actual api call of getting expenses
                //======================================================
                // const expenses = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}`)
                // .then(response => response.json());
    }

    useEffect(() => {

        const fethDate = async () => {
            try {                     
                
                const tripData = await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}`)
                .then(response => response.json());          
                
                if (tripData) {
                    setTrip(tripData);
                    setExpenses(expenses || []);
                    //setParticipants(tripData.participants || []);
                }
            } catch (err) {
                console.log("Error has occured fetching Data")
            }
        }

        fethDate();


    }, []);

    // Функция для добавления нового расхода
    const addExpense = async () => {

        const response = await fetch(`${import.meta.env.VITE_API_URL}/expense${tripId}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                created_by: userID,
                amount: newExpense.amount, 
                desc: newExpense.desc

            })
        }).then(response => response.json()).then(response => response.trip_id);
        
        refreshExpenses();
        
    };

    // Функция для удаления расхода
    const deleteExpense = async (expense_id) => {


        const response = await fetch(`${import.meta.env.VITE_API_URL}/expense${expense_id}`, {
            method: "DELETE", // Specify the HTTP method
            headers: {
                "Content-Type": "application/json",
            }})


    };

    return (
        <div className="sm:px-20 pt-1 sm:m-20 min-h-screen">
            {trip ? (
                <>
                    <div
                        className="relative bg-cover bg-center h-60 rounded-lg overflow-hidden"
                        style={
                            trip.photo ? 
                            { backgroundImage: `url(${trip.photo})` }
                            :{backgroundColor: '#313131'}
                        
                        }
                    >
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <h1 className="text-4xl font-bold text-white">{trip.name}</h1>
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
                            <input
                                type="number"
                                placeholder="Amount"
                                value={newExpense.amount}
                                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={newExpense.description}
                                onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                                className="border p-2 rounded"
                            />
                            <button
                                onClick={addExpense}
                                className="bg-black text-white py-2 px-6 rounded mt-4 hover:bg-white hover:text-black"
                            >
                                Submit
                            </button>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h2 className="text-2xl font-bold">Expenses</h2>
                        <div className="mt-4">
                            {expenses.length > 0 ? (
                                <div>
                                    {expenses.map((expense, index) => (
                                        <div key={index} className="flex justify-between items-center py-3 border-b">
                                            <div>
                                                <div className="font-medium">{expense.description}</div>
                                                <div className="text-sm">Amount: ${expense.amount}</div>
                                                <div className="text-sm">Member: {expense.member}</div>
                                            </div>
                                            <button
                                                onClick={() => deleteExpense(expense.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                🗑️
                                            </button>
                                        </div>
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




