import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts';

// Функция для подсчета доли каждого участника
const calculateShare = (expenses, participants) => {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  const share = total / participants.length;
  return participants.map(participant => ({
    name: participant,
    value: share,
  }));
};

// Компонент ViewTripDetails
export default function ViewTripDetails() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [newExpense, setNewExpense] = useState({ amount: '', description: '', member: '' });

  useEffect(() => {
    // Загрузка данных трипа из localStorage
    const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    const tripData = storedTrips[tripId];
    if (tripData) {
      setTrip(tripData);
      setExpenses(tripData.expenses || []);
      setParticipants(tripData.participants || []);
    }
  }, [tripId]);

  // Функция для добавления нового расхода
  const addExpense = () => {
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    setNewExpense({ amount: '', description: '', member: '' });
    // Сохраняем обновленные данные
    const updatedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    if (updatedTrips[tripId]) {
      updatedTrips[tripId].expenses = updatedExpenses;
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
  };

  // Функция для удаления расхода
  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    const updatedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    if (updatedTrips[tripId]) {
      updatedTrips[tripId].expenses = updatedExpenses;
      localStorage.setItem('trips', JSON.stringify(updatedTrips));
    }
  };

  return (
    <div className="sm:px-20 pt-1 sm:m-20 min-h-screen">
      {trip ? (
        <>
          <div
            className="relative bg-cover bg-center h-60 rounded-lg overflow-hidden"
            style={{ backgroundImage: `url(${trip.photo})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <h1 className="text-4xl font-bold text-white">{trip.name}</h1>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
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
          </div>

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
              <select
                value={newExpense.member}
                onChange={(e) => setNewExpense({ ...newExpense, member: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="">Select Member</option>
                {participants.map((participant, index) => (
                  <option key={index} value={participant}>{participant}</option>
                ))}
              </select>
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
                        onClick={() => deleteExpense(index)}
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





