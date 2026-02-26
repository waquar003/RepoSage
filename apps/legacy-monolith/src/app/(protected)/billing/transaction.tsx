"use client"

import { useState, useEffect } from "react"
import { format } from 'date-fns'
import { Clock, CreditCard, DollarSign, Search, User } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { api } from "@/trpc/react"

const Transaction = () => {
    const { data: transactions, isLoading } = api.project.getTransactions.useQuery()
  const [filteredTransactions, setFilteredTransactions] = useState(transactions)
//   console.log(transactions)

  useEffect(() => {
            setFilteredTransactions(transactions)
        }, [transactions])

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Previous Transactions</h2>
      <p className="text-sm text-gray-500">A list of your recent credit purchases.</p>
      <div className="bg-white rounded-md border">
        <ScrollArea className="h-[300px]">
          {isLoading ? (
            <div className="space-y-4 p-4">
              {[...Array(3)].map((_, i) => (
                <TransactionSkeleton key={i} />
              ))}
            </div>
          ) : filteredTransactions && filteredTransactions.length > 0 ? (
            <div className="space-y-4 p-4">
              {filteredTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground p-4">No transactions found.</p>
          )}
        </ScrollArea>
      </div>
    </div>
  )
}

const TransactionItem = ({ transaction }: { transaction: any }) => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center space-x-4">
      <div className="rounded-full bg-blue-50 p-2">
        <CreditCard className="h-4 w-4 text-blue-500" />
      </div>
      <div>
        <p className="text-sm font-medium">{transaction.user.firstName}</p>
        <p className="text-xs text-gray-500">
          {format(new Date(transaction.createdAt), 'MMM d, yyyy')}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-1">
        <User className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-medium">+{transaction.credits}</span>
      </div>
      <div className="flex items-center space-x-1">
        <DollarSign className="h-4 w-4 text-gray-400" />
        <span className="text-sm font-medium">{(transaction.credits / 50).toFixed(2)}</span>
      </div>
    </div>
  </div>
)

const TransactionSkeleton = () => (
  <div className="flex items-center justify-between py-2 border-b last:border-b-0">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[100px]" />
        <Skeleton className="h-3 w-[80px]" />
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <Skeleton className="h-4 w-[60px]" />
      <Skeleton className="h-4 w-[60px]" />
    </div>
  </div>
)

export default Transaction

