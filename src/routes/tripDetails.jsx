import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';
import { useUser, useAuth  } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';




export default function ViewTripDetails() {
    const navigate = useNavigate();
    const { getToken } = useAuth();
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);
    //const [participants, setParticipants] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '' });
    const [userID, setUserID] = useState();
    const [token, setToken] = useState();

    const { user } = useUser();
    const clerk_ID = user.id;






useEffect(() => {
    try{
        let initialSetUp = async () => {    

            // Api call to get userID, so it can be used in other api call where needed
            setUserID ( await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${clerk_ID}`)
            .then(response => response.json())
            .then(response => response.ID));
    
             // Clerk's method to get a token
            setToken (await getToken()); // Retrieve the user's token

            // Retrieve trip data 
            const tripData = await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}`)
            .then(response => response.json());  

           setTrip(tripData);
        }
    
        initialSetUp();
    }catch(err){
        window.alert("Error has occured, please try again later");
        console.log("Error occured: " + err);
        navigate('/dashboard')
    }
}, [])



const refreshExpenses = async () => {

    //calls backend to get all expenses of a trip

    try{
        let response =  await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}`)
        .then(res => res.json())
        .then(res => res.data)

        return await response;
    }catch (err){
        window.alert("An issue has occured when geting expenses!");
        console.log("An issue has occured when geting expenses! " + err)
        return [];
    }
}


    useEffect(() => {

        const fethDate = async () => {
            try {                     
                
                if (trip) {
                    const upToDateExpenses = await refreshExpenses();
                    setExpenses(upToDateExpenses || []);
                    //setParticipants(tripData.participants || []);
                }
            } catch (err) {
                console.log("Error has occured fetching Data")
            }
        }

        fethDate();

    }, [trip]);

    // 
    const addExpense = async () => {

        // APi call to pass through values of input fields to create expense
        await fetch(`${import.meta.env.VITE_API_URL}/expenses`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Add authentication token
            },
            body: JSON.stringify({
                trip_id: tripId,
                user_id: userID,
                name: newExpense.description,
                description: " ",
                amount: newExpense.amount
            }), // Send the expense data
          });

          setNewExpense({ amount: '', description: '' })
        
          setExpenses(await refreshExpenses())  // Refreshes expense list by getting recent one from DB
    };


    const deleteExpense = async (expense_id) => {


        try{
            //  Attemts to delete with expense ID
            await fetch(`${import.meta.env.VITE_API_URL}/expenses/${expense_id}`, { 
                method: "DELETE", // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",
                }})

                
                setExpenses(await refreshExpenses())    //  Refreshes expenses list
        }catch (err){
            console.log("Error occured when deleting expense: " + err)
        }


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
                                                <div className="text-xl font-medium">{expense.name}</div>
                                                <div className="text-sm">Amount: ${expense.amount}</div>
                                                <div className="text-sm">Member: {expense.member}</div>
                                            </div>
                                            <button
                                                onClick={() => deleteExpense(expense.expense_id)}
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




