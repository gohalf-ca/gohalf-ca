import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


export default function MainTripsPage() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
    setTrips(storedTrips);
  }, []);

  const deleteTrip = (index) => {
    const updatedTrips = trips.filter((_, i) => i !== index);
    setTrips(updatedTrips);
    localStorage.setItem('trips', JSON.stringify(updatedTrips));
  };

  const editTrip = (index) => {
    const tripToEdit = trips[index];
    alert(`Редактирование трипа: ${tripToEdit.name}`);
  };

  return (
    <div className="sm:px-20 pt-1 sm:m-20 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Trips</h1>
        <div className="flex gap-4">
          {/* Кнопка "Создать новый трип" */}
          <Link
            to="/createtrip"
            className="text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-6 text-white bg-black transition hover:bg-white hover:text-black"
          >
            Create a New Trip
          </Link>
          {/* Кнопка "Присоединиться к существующему трипу" */}
          <Link 
            to="/JoinTrip" 
            className="text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-6 text-white bg-black transition hover:bg-white hover:text-black"
          >
            Join an Existing Trip
          </Link>
        </div>
      </div>

      {trips.length > 0 ? (
        <div>
          {trips.map((trip, index) => (
            <div
              key={index}
              className="relative bg-cover bg-center h-60 rounded-lg overflow-hidden mb-8"
              style={{ backgroundImage: `url(${trip.photo})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white">{trip.name}</h1>

                <div className="absolute top-2 right-2 flex gap-4">
                  <button
                    onClick={() => editTrip(index)}
                    className="text-white text-xl hover:text-yellow-600"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => deleteTrip(index)}
                    className="text-white text-xl hover:text-red-600"
                  >
                    🗑️
                  </button>
                </div>

                <Link
                  to='./ViewTripDetails'
                  className="mt-4 text-lg font-medium shadow-lg border rounded-lg border-white py-2 px-8 text-white bg-black transition hover:bg-white hover:text-black"
                >
                  View Trip Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-2xl font-bold">You haven't created any trips yet.</h2>
        </div>
      )}
    </div>
  );
}



