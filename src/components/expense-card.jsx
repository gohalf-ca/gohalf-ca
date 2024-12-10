'use client'

import { useCallback, useMemo, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { PropTypes } from 'prop-types'
import { useUser } from '@clerk/clerk-react';

export function ExpenseCard({ expense, handle_mark_as_paid }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { user } = useUser();

    const memoed_handle_mark_as_paid = useCallback(handle_mark_as_paid,
        [handle_mark_as_paid]);
    const did_user_pay = useMemo(() => expense.participants?.some(p => p.clerk_id === user.id && p.is_paid), [expense, user.id]);

    const totalPaid = expense.participants?.filter((p) => p.is_paid)?.length || 0
    const totalParticipants = expense.participants?.length || 0

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
                {!did_user_pay && <Button onClick={() => {
                    if (expense?.expense_id) {
                        void memoed_handle_mark_as_paid(expense.expense_id);
                    }
                }}>Mark as Paid</Button>}
            </CardFooter>
            <ParticipantModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                participants={expense.participants}
                expenseName={expense.name}
            />
        </Card >
    )
}
ExpenseCard.propTypes = {
    expense: PropTypes.object.isRequired,
    handle_mark_as_paid: PropTypes.func.isRequired
}

export function ParticipantModal({ isOpen, onClose, participants, expenseName }) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{expenseName} - Participants</DialogTitle>
                </DialogHeader>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Amount Owed</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {participants.map((participant, idx) => (
                            <TableRow key={idx}>
                                <TableCell>{participant.name}</TableCell>
                                <TableCell>${participant.amount.toFixed(2)}</TableCell>
                                <TableCell>
                                    <Badge variant={participant.is_paid ? 'success' : 'destructive'}>
                                        {participant.is_paid ? 'Paid' : 'Unpaid'}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    )
}
ParticipantModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    participants: PropTypes.array.isRequired,
    expenseName: PropTypes.string.isRequired
}


