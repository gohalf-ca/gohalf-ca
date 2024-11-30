import React, { useState } from 'react';

const CreateLink = ({ tripId }) => {
    const [inviteLink, setInviteLink] = useState('');

    const generateLink = async () => {
        try {
            const response = await fetch(`/api/trips/${tripId}/invite`, { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' } 
            });
            const data = await response.json();
            setInviteLink(data.inviteLink);
        } catch (error) {
            console.error('Error generating invite link:', error);
        }
    };

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">Create Invite Link</h1>
            <button 
                onClick={generateLink} 
                className="mt-4 bg-black text-white px-4 py-2 rounded"
            >
                Generate Invite Link
            </button>
            {inviteLink && (
                <p className="mt-4">
                    Invite Link: <a href={inviteLink} className="text-blue-500 underline">{inviteLink}</a>
                </p>
            )}
        </div>
    );
};

export default CreateLink;