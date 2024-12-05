import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CreateTripPage() {
  const [tripDetails, setTripDetails] = useState({
    photo: '',
    name: '',
    participants: '',
    description: '',
    date: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTripDetails({ ...tripDetails, [name]: value });
    setErrors({ ...errors, [name]: value.trim() === '' });
  };

  const handleSubmit = () => {
    const newErrors = {};
    Object.keys(tripDetails).forEach((key) => {
      if (!tripDetails[key].trim()) {
        newErrors[key] = true;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Сохраняем trip в localStorage
      const storedTrips = JSON.parse(localStorage.getItem('trips') || '[]');
      storedTrips.push(tripDetails);
      localStorage.setItem('trips', JSON.stringify(storedTrips));

      // Отмечаем форму как успешно отправленную
      setIsSubmitted(true);
    }
  };

  return (
    <div className="sm:px-20 pt-1 sm:m-20 min-h-screen">
      <h1 className="text-4xl font-bold text-center">Create a New Trip</h1>
      {isSubmitted ? (
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-green-600">Trip successfully created!</h2>
          <Link
            to="/Trips"
            className="mt-4 inline-block text-lg font-medium border rounded-lg py-2 px-6 text-white bg-black hover:bg-white hover:text-black border-black transition"
          >
            Go to Trips
          </Link>
        </div>
      ) : (
        <form className="mt-8 space-y-6">
          <div>
            <label className="block text-lg font-medium">Upload a Trip Photo</label>
            <input
              type="file"
              accept="image/*"
              name="photo"
              onChange={(e) => handleChange(e)}
              className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.photo ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Trip Name</label>
            <input
              type="text"
              name="name"
              value={tripDetails.name}
              onChange={(e) => handleChange(e)}
              className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Participants</label>
            <input
              type="text"
              name="participants"
              value={tripDetails.participants}
              onChange={(e) => handleChange(e)}
              placeholder="Enter participants separated by commas"
              className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.participants ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div>
            <label className="block text-lg font-medium">Description</label>
            <textarea
              name="description"
              value={tripDetails.description}
              onChange={(e) => handleChange(e)}
              rows={4}
              className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium">Trip Date</label>
            <input
              type="date"
              name="date"
              value={tripDetails.date}
              onChange={(e) => handleChange(e)}
              className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.date ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full text-lg font-medium shadow-lg border rounded-lg border-black py-2 px-20 text-white bg-black transition hover:bg-white hover:text-black"
          >
            Create
          </button>
        </form>
      )}
    </div>
  );
}
