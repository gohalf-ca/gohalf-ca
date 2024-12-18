import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser, useAuth } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
import { ExpenseCard } from '../components/expense-card';
import { Input } from '../components/ui/input';
import List_Item from '../components/list-item';
// import { useNavigate } from 'react-router-dom';

export default function ViewTripDetails() {
    // const navigate = useNavigate();
    const { getToken } = useAuth();
    const { tripId } = useParams();
    const [trip, setTrip] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [newExpense, setNewExpense] = useState({ amount: '', description: '' });
    const [userID, setUserID] = useState(null);
    const [tab1, setTab1] = useState(true);
    const [owe, setOwe] = useState(true);
    const [balance, setBalance] = useState({owe: {}, owed: {}, trip_Cost: 0, balance_owe_amt: 0, balance_owed_amt: 0})

    const { user } = useUser();


    useEffect(() => {
        let initialSetUp = async () => {
            // Api call to get userID, so it can be used in other api call where needed

            let user_id_result = await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${user.id}`)
            .then(response => response.json())
            .then(response => response.ID)

            setUserID(user_id_result);

            // Retrieve trip data 
            const tripData = await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripId}/${user_id_result}`)
                .then(response => response.json());

            setTrip(tripData);

        }
        if (user?.id) {
            initialSetUp();
        }
    }, [user, tripId]);



    async function get_expenses() {
        try {
            let res = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}/${userID}`)
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
           if(userID){
             try {
                let res = await fetch(`${import.meta.env.VITE_API_URL}/expenses/${tripId}/${userID}`)
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
        }
        void get_expenses();
    }, [userID]);


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
                body: JSON.stringify({
                    user_id: userID,
                })
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


    const deleteExpense = async (expense_id) => {
        try {
            //  Attemts to delete with expense ID
            await fetch(`${import.meta.env.VITE_API_URL}/expenses/${expense_id}`, {
                method: "DELETE", // Specify the HTTP method
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    trip_id: tripId,
                    user_id: userID,
                }),
            })

            setExpenses(await get_expenses().results)    //  Refreshes expenses list
        } catch (err) {
            console.log("Error occured when deleting expense: " + err)
        }

    };


    function calculateDetailedOwedAmount(userId, data) {
        const owedDetails = {};
        data.forEach(expense => {
            expense.participants.forEach(participant => {
                if (participant.user_id === userId && !participant.is_paid) {   
                    const creatorName = expense.created_by.name;
                    if (!owedDetails[creatorName]) { //creates object if user is not already in array
                        owedDetails[creatorName] = 0; //creates object
                    }
                    owedDetails[creatorName] += participant.amount; 
                }
            });
        });
    
        return owedDetails;
    }


    function calculateAmountOwedToUser(userId, data) {
        const amountOwedToUser = [];
    
        data.forEach(expense => {
            // Check if the user created the expense
            if (expense.created_by.Id === userId) { 
                expense.participants.forEach(participant => {
                    if (participant.user_id !== userId && !participant.is_paid) {
                        const debtorName = participant.name;
    
                        // Check if this person is already in the list
                        const existingEntry = amountOwedToUser.find(entry => entry.name === debtorName);
                        if (existingEntry) {
                            existingEntry.amount += participant.amount;
                        } else {
                            amountOwedToUser.push({ name: debtorName, amount: participant.amount });
                        }
                    }
                });
            }
        });

        return amountOwedToUser;
    }
    
    let balace_total_owe = (userId, data) => {
        let total = 0;

        data.forEach(expense => {
            expense.participants.forEach(participant => {
                if (participant.user_id === userId && !participant.is_paid) {   
                    total += participant.amount;
                }
            });
        });
    
        return total;
    }

    let balace_total_owed = (userId, data) => {
        let total = 0;
    
        data.forEach(expense => {
            // Check if the user created the expense
            if (expense.created_by.Id === userId) { 
                expense.participants.forEach(participant => {
                    if (participant.user_id !== userId && !participant.is_paid) {
                        total += participant.amount;
                    }
                });
            }
        });


        return total;
    }

    let total_trip_cost = (data) => {
        let total = 0;

        data.forEach(expense => {
            total += expense.amount;
        });

        return total;
    }

    
    useEffect(() => {
        
        if (expenses !== undefined){
            setBalance(prevState => ({
                ...prevState,
                owe: calculateDetailedOwedAmount(userID, expenses),
                owed: calculateAmountOwedToUser(userID, expenses),
                balance_owe_amt: balace_total_owe(userID, expenses),
                balance_owed_amt: balace_total_owed(userID, expenses),
                trip_Cost: total_trip_cost(expenses)
            }))


        }        
        
    }, [expenses])


    



    return (
        <div className="lg:px-20 pt-1 sm:m-20 text-foreground min-h-screen p-4">
            {trip ? (
                <>
                    <div
                        className="relative bg-cover bg-center sm:h-60 h-72 rounded-lg overflow-hidden"
                        style={
                            trip.photo ?
                                { backgroundImage: `url(${trip.photo})` }
                                : { backgroundColor: '#313131' }

                        }
                    >
                        {tab1?
                            <div className="absolute inset-0 bg-opacity-50 bg-secondary content-center justify-start">
                                <div className='flex sm:flex-row flex-col justify-around sm:w-4/6 w-full pl-6 sm:pl-0 sm:gap-6'>
                                    <div>
                                        <h1 className="text-5xl font-bold pb-2 w-fit border-b-2 border-black">{trip.name}</h1>
                                        <p className='pl-6'>({trip.code})</p>
                                    </div>

                                    <div>
                                        <h2 className="text-3xl font-semibold mb-2">Trip Cost</h2>
                                        <div className="text-6xl font-bold pl-4">${balance.trip_Cost}</div>
                                    </div>
                                </div>
                            </div>
                        : 
                        <div className="absolute inset-0 bg-opacity-50 bg-secondary content-center justify-start">
                                <div className='flex sm:flex-row flex-col justify-around sm:w-4/6 w-full pl-6 sm:pl-0  sm:gap-6'>
                                <div>
                                    <h2 className="text-2xl font-medium mb-2">Your Balance</h2>
                                    <div className="text-6xl font-bold">${balance.balance_owe_amt}</div>
                                    <div className="text-md text-zinc-400 mt-1">You owe</div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-medium mb-2">Amount owed</h2>
                                    <div className="text-6xl font-bold">${balance.balance_owed_amt}</div>
                                </div>
                            </div>
                        </div>
                    }
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
                        <div className='flex flex-row gap-6 items-baseline transition'>
                            <button className={tab1 ? "transition text-2xl font-bold border-b-2 border-black pb-2" : "text-xl font-bold text-gray-500 transition hover:scale-110 hover:text-black"}
                                onClick={() => setTab1(true)}>
                                Main
                            </button>
                            <button className={tab1 ? "text-xl font-bold text-gray-500 transition hover:scale-110 hover:text-black" : "transition text-2xl font-bold border-b-2 border-black pb-2"}
                                onClick={() => setTab1(false)}>
                                Balance
                            </button>
                        </div>

                        {tab1 ? 
                            <div className="my-4">
                                {expenses !== undefined ? (
                                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">
                                        {expenses.map((expense) => (
                                            <ExpenseCard key={expense.id} expense={expense} />
                                        ))}
                                    </div>
                                ) : (
                                    <p>No expenses found</p>
                                )}
                            </div>
                            :
                            <div className="my-4">
                                
                                <div className="flex justify-between items-center mb-6 pb-2">
                                    <div className="flex gap-4">
                                        <button className={owe ? "text-xl font-bold text-black bg-accent px-3 rounded-sm hover:text-gray-900 scale-105 shadow-md" : "text-xl font-semibold text-gray-500 transition px-3 hover:text-gray-900 hover:font-bold hover:text-black hover:scale-105 hover:rounded-md hover:bg-accent hover:shadow-lg"}
                                        onClick={() => setOwe(true)}>
                                            owe
                                        </button>
                                        <button className={owe ? "text-xl font-semibold text-gray-500 transition px-3 hover:text-gray-900 hover:font-bold hover:text-black hover:scale-105 hover:rounded-md hover:bg-accent hover:shadow-lg" : "text-xl font-bold text-black bg-accent px-3 rounded-sm hover:text-gray-900 scale-105 shadow-md"}
                                        onClick={() => setOwe(false)}>
                                            owed
                                        </button>
                                    </div>

                                    <button className="text-xl font-bold text-black transition hover:scale-105 flex items-center gap-1">
                                        Sort <span className="text-4xl">↓</span>
                                    </button>
                                </div>


                                <div className="space-y-4">
                                {(expenses !== undefined) &&
                                owe 
                                ? (
                                    Object.entries(balance.owe).map(([person, amount], index) => (
                                        <List_Item name={person} amount={amount} negative={true} /> 
                                    ))
                                ) 
                                    : (
                                        balance.owed.map( entry => (
                                            <List_Item name={entry.name} amount={entry.amount} negative={false} />     
                                        ))
                                    )
                                }
                            </div>
                            
                            </div>}
                    </div>
                </>
            ) : (
                <p>Loading trip details...</p>
            )}
        </div>
    );
}




