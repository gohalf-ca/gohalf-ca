'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/card';
import { Button } from '../components/button';
import { Badge } from '../components/badge';
// import { ParticipantModal } from '@/components/participant-modal'
import { PropTypes } from 'prop-types'

export function ExpenseCard({ expense }) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const totalPaid = expense.participants.filter((p) => p.is_paid).length
    const totalParticipants = expense.participants.length

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center">
                    <span>{expense.name}</span>
                    <Badge variant={totalPaid === totalParticipants ? 'success' : 'destructive'}>
                        {totalPaid}/{totalParticipants} Paid
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-2xl font-bold">${expense.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Created by {expense.created_by.name}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>View Details</Button>
                <Button>Mark as Paid</Button>
            </CardFooter>
        </Card>
    )
}
// <ParticipantModal
//     isOpen={isModalOpen}
//     onClose={() => setIsModalOpen(false)}
//     participants={expense.participants}
//     expenseName={expense.name}
// />

// declare props type
ExpenseCard.propTypes = {
    expense: PropTypes.object.isRequired
}


