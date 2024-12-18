import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export default function MainTripsPage() {
    const [trips, setTrips] = useState([]);
    const { user } = useUser();
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        async function get_trips() {
            try {

                let user_id_result = await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${user.id}`)
                .then(response => response.json())
                .then(response => response.ID);

                setUserID(user_id_result);


                let response = await fetch(`${import.meta.env.VITE_API_URL}/alltrips/${user.id}`)
                if (!response.ok) {
                    throw new Error("Error occured during pull")
                }
                let { data } = await response.json();
                if (Array.isArray(data)) {
                    setTrips(data)
                }
            } catch (err) {
                console.log(`Error occured during pull of trip: ${err}`)
            }
        }
        
        void get_trips();
    }, [user?.id]);

    // Функция для удаления trip
    const deleteTrip = async (tripID) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/trips/${tripID}/${userID}`, {
                method: "DELETE"
            })
            if (!res.ok) {
                throw new Error("Error occured during delete")
            }
            window.alert("Trip has been deleted!")
        } catch (err) {
            console.log(`Error occured during delete: ${err}`)
        }
        setTrips(trips.filter(trip => trip.trip_id !== tripID));
    };

    // Функция для редактирования trip
    const editTrip = (index) => {
        const tripToEdit = trips[index];
        // Пример: открытие формы редактирования, которую вы хотите реализовать
        alert(`Редактирование трипа: ${tripToEdit.name}`);
        // Допустим, вы редактируете trip с помощью модального окна или переходит на другую страницу
    };

    return (
        <div className="lg:px-20 pt-1 sm:m-20 min-h-screen text-foreground p-4">
            {/* Проверяем, есть ли trip, если нет - показываем сообщение */}
            {trips?.length > 0 ? (
                <div>
                    {trips.map((trip, index) => (
                        <div
                            key={index}
                            className="relative bg-cover bg-center h-60 rounded-lg overflow-hidden mb-8"
                            style={{ backgroundImage: `url(${trip.photo})` }}
                        >
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                                <h1 className="text-4xl font-bold">{trip.name}</h1>

                                <div className="absolute top-2 right-2 flex gap-4">
                                    {/* Кнопка для удаления трипа */}
                                    <button
                                        onClick={() => deleteTrip(trip.trip_id)}
                                        className="text-xl hover:text-red-600"
                                    >
                                        🗑️
                                    </button>

                                    {/* Кнопка для редактирования трипа */}
                                    <button
                                        onClick={() => editTrip(index)}
                                        className="text-xl hover:text-yellow-600"
                                    >
                                        ✏️
                                    </button>
                                </div>

                                <Link
                                    to={ `/trip-details/${trip.trip_id}`} // Переход к детальной странице трипа
                                    className="mt-4 text-lg font-medium shadow-lg border rounded-lg border-white py-2 px-8 text-white bg-black transition hover:bg-white hover:text-black"
                                >
                                    View Trip Details
                                </Link>
                            </div>
                        </div>
                    ))}

                    <div className="mt-6">
                        <Link
                            to="/create-trip" // Переход на страницу создания нового трипа
                            className="w-full text-center text-lg font-medium shadow-lg border rounded-lg py-2 px-20 transition"
                        >
                            Create a New Trip
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center">
                    <h2 className="text-2xl font-bold">You haven&apos;t created any trips yet.</h2>
                    <Link
                        to="/create-trip" // Переход на страницу создания нового трипа
                        className="w-full text-center text-lg font-medium shadow-lg border rounded-lg py-2 px-20 transition"
                    >
                        Create a New Trip
                    </Link>
                </div>
            )}
        </div>
    );
}

