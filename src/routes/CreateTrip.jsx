import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { cn } from '../lib/utils';
import { Input, Textarea } from '../components/ui/input';
import { Button } from '../components/ui/button';


export default function CreateTrip() {
    const navigate = useNavigate();
    const { user } = useUser();
    const [errors, setErrors] = useState({});
    const [tripDetails, setTripDetails] = useState({
        name: '',
        description: '',
        date: '',
    });




    //Prevent user from submiting unless values filled
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetails({ ...tripDetails, [name]: value });
        setErrors({ ...errors, [name]: value.trim() === '' });
    };


    const handleSubmit = async () => {
        const newErrors = {};
        Object.keys(tripDetails).forEach((key) => {
            if (!tripDetails[key].trim()) {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            const clerk_ID = user.id;

            //get userID to do other api calls
            const userID = await fetch(`${import.meta.env.VITE_API_URL}/getuserid/${clerk_ID}`)
                .then(response => response.json());


            const response = await fetch(`${import.meta.env.VITE_API_URL}/trips`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    owner_id: userID.ID,
                    name: tripDetails.name,
                    trip_desc: tripDetails.description

                })
            }).then(response => response.json()).then(response => response.trip_id);

            navigate(`/trip-details/${response}`)
        }
    };

    return (
        <div className="sm:px-20 pt-1 sm:m-20 min-h-screen text-foreground">
            <h1 className="text-4xl font-bold text-center">Create a New Trip</h1>

            <form className="mt-8 space-y-6">
                <div>
                    <label className="block text-lg font-medium">Upload a Trip Photo</label>
                    <Input
                        type="file"
                        accept="image/*"
                        name="photo"
                        className={cn(
                            errors.photo ? 'border-red-500' : 'border-gray-300'
                        )}

                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Trip Name</label>
                    <Input
                        type="text"
                        name="name"
                        value={tripDetails.name}
                        onChange={(e) => handleChange(e)}
                        className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                </div>
                <div>
                    <label className="block text-lg font-medium">Description</label>
                    <Textarea
                        name="description"
                        value={tripDetails.description}
                        onChange={(e) => handleChange(e)}
                        rows={4}
                        className={`w-full mt-2 px-4 py-2 border rounded-lg ${errors.description ? 'border-red-500' : 'border-gray-300'}`}
                    ></Textarea>
                </div>
                <div>
                    <label className="block text-lg font-medium">Trip Date</label>
                    <Input
                        type="date"
                        name="date"
                        value={tripDetails.date}
                        onChange={(e) => handleChange(e)}
                        className={cn(
                            "!block dark:[color-scheme:dark]",
                            errors.photo ? 'border-red-500' : 'border-gray-300'
                        )}
                    />
                </div>
                <Button
                    type="button"
                    onClick={handleSubmit}
                    className="w-full text-lg font-medium shadow-lg border rounded-lg py-2 px-20 transition"
                >
                    Create
                </Button>
            </form>

        </div>
    );
}
