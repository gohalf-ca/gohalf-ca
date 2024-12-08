import React, { useState } from 'react';

const getToken = () => localStorage.getItem('token') || null;

const JoinLink = () => {
    const [inviteCode, setInviteCode] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleJoinTrip = async () => {
        const token = getToken();
        if (!token) {
            setError('Authentication required.');
            return;
        }

        try {
            const response = await fetch(`/api/trips/join/${inviteCode}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();

            if (response.ok) {
                setMessage(data.message || 'Successfully joined the trip!');
                setError('');
            } else {
                setError(data.error || 'Failed to join the trip.');
                setMessage('');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            setMessage('');
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Join Trip</h1>
            <input
                type="text"
                maxLength={6}
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Enter 6-Digit Code"
                className="mt-4 p-2 border border-gray-400 rounded"
            />
            <button
                onClick={handleJoinTrip}
                disabled={inviteCode.length !== 6}
                className="ml-2 bg-black text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                Join Trip
            </button>
            {message && <p className="mt-4 text-green-500">{message}</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
    );
};

export default JoinLink;