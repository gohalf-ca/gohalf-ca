import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ExpensesPage() {
  // Состояние для расходов и формы
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ date: '', amount: '', category: '' });
  const [showForm, setShowForm] = useState(false);
  const [editExpense, setEditExpense] = useState(null); // Для редактирования записи
  
  const userName = 'John Doe';  // Имя пользователя, можно заменить на динамическое

  // Симуляция загрузки данных (например, из API или локального хранилища)
  useEffect(() => {
    const fetchData = () => {
      const mockExpenses = [
        { id: 1, description: 'Food', amount: 50, category: 'Food', date: '2024-11-01' },
        { id: 2, description: 'Hotel', amount: 200, category: 'Accommodation', date: '2024-11-02' },
        { id: 3, description: 'Transport', amount: 30, category: 'Transport', date: '2024-11-03' }
      ];
      setExpenses(mockExpenses);
    };

    fetchData();
  }, []);

  // Функция для добавления или обновления расхода
  const handleSubmitExpense = () => {
    if (editExpense) {
      // Обновляем расход
      setExpenses(expenses.map(exp => (exp.id === editExpense.id ? { ...editExpense, ...newExpense } : exp)));
      setEditExpense(null); // Сбрасываем редактирование
    } else {
      // Добавляем новый расход
      const newExpenseData = { ...newExpense, id: Date.now() };
      setExpenses([...expenses, newExpenseData]);
    }
    setNewExpense({ date: '', amount: '', category: '' });
    setShowForm(false);
  };

  // Функция для начала редактирования расхода
  const handleEdit = (expense) => {
    setNewExpense({ date: expense.date, amount: expense.amount, category: expense.category });
    setEditExpense(expense); // Устанавливаем расход для редактирования
    setShowForm(true);
  };

  // Удаление расхода
  const handleDelete = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Формирование данных для круговой диаграммы
  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(categoryData),
    datasets: [
      {
        data: Object.values(categoryData),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4caf50'],
        hoverOffset: 4
      }
    ]
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 pb-20"> {/* Добавлено пространство внизу */}
      {/* Заголовок */}
      <div className='flex justify-center pt-10'>
        <h1 className='text-4xl font-bold font-sans'>{userName}'s Expenses</h1>
      </div>

      <div className='flex flex-col pt-10 justify-center gap-3 sm:px-5 lg:px-20 sm:mx-5 lg:mx-20 max-w-screen-lg mx-auto'>
        <p className='text-sm sm:text-base pt-6 pb-4 self-center'>
          Here is the list of expenses for your trip!
        </p>
        
        {/* Круговая диаграмма */}
        <div className='flex justify-center pt-10'>
          <div className='w-full sm:w-80 md:w-96 lg:w-120'>
            <Doughnut data={chartData} />
          </div>
        </div>

        {/* Категории справа от диаграммы */}
        <div className='flex justify-center pt-6'>
          <div className='text-black'>
            {Object.entries(categoryData).map(([category, amount]) => (
              <div key={category} className='mb-2'>
                <strong>{category}:</strong> ${amount}
              </div>
            ))}
          </div>
        </div>

        {/* Кнопка для добавления нового расхода */}
        <div className='pt-5 sm:pt-10 text-center'>
          <button
            onClick={() => setShowForm(!showForm)}
            className='sm:w-20w self-center text-center text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-white bg-black transition hover:bg-white hover:text-black hover:-translate-y-1 hover:scale-105'
          >
            Add Expense
          </button>
        </div>

        {/* Форма для добавления или редактирования расхода */}
        {showForm && (
          <div className='pt-10'>
            <div className='flex flex-col gap-3'>
              <input
                type='date'
                className='p-2 border border-gray-400 rounded-lg'
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
              />
              <input
                type='number'
                className='p-2 border border-gray-400 rounded-lg'
                placeholder='Amount'
                value={newExpense.amount}
                onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
              />
              <select
                className='p-2 border border-gray-400 rounded-lg'
                value={newExpense.category}
                onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
              >
                <option value=''>Select Category</option>
                <option value='Food'>Food</option>
                <option value='Accommodation'>Accommodation</option>
                <option value='Transport'>Transport</option>
              </select>
              <button
                onClick={handleSubmitExpense}
                className='p-2 bg-green-500 text-white rounded-lg mt-3'
              >
                Submit
              </button>
            </div>
          </div>
        )}

        {/* Список расходов */}
        <div className='pt-10'>
          <h2 className='text-2xl font-semibold mb-5'>Expenses from the Last 2 Weeks</h2>
          {expenses.length > 0 ? (
            <ul className='space-y-4'>
              {expenses.map((expense) => (
                <li key={expense.id} className='flex justify-between items-center'>
                  <div>
                    <span className='text-gray-600'>{expense.date}</span><br />
                    <span>{expense.description} - ${expense.amount}</span>
                  </div>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleEdit(expense)}
                      className='bg-yellow-400 text-white py-1 px-4 rounded-lg'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(expense.id)}
                      className='bg-red-500 text-white py-1 px-4 rounded-lg'
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent expenses found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
