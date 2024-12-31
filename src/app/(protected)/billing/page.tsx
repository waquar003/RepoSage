"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { createCheckoutSession } from "@/lib/stripe"
import { api } from "@/trpc/react"
import { Info } from 'lucide-react'
import React, { useState } from "react"
import Transaction from "./transaction"

const BillingPage = () => {
    const { data: user } = api.project.getMyCredits.useQuery()
    const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100])
    const creditsToBuyAmount = creditsToBuy[0]!
    const price = (creditsToBuyAmount / 50).toFixed(2)

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-semibold">Billing</h1>
                <p className="text-sm text-gray-500 mt-1">
                    Manage your credits and view transaction history
                </p>
            </div>

            <div className="bg-white rounded-md border p-6 space-y-6">
                <div>
                    <h2 className="text-xl font-semibold mb-2">Current Credits</h2>
                    <p className="text-sm text-gray-500">
                        You currently have <span className="font-medium text-black">{user?.credits}</span> credits.
                    </p>
                </div>

                <div className="bg-blue-50 px-4 py-3 rounded-md border border-blue-200 text-blue-700">
                    <div className="flex items-center gap-2">
                        <Info className="size-4 flex-shrink-0" />
                        <p className="text-sm">Each credit allows you to index 1 file in a repository.</p>
                    </div>
                    <p className="text-sm mt-1">E.g. If your project has 10 files, you will need 10 credits to index it.</p>
                </div>

                <div>
                    <h2 className="text-xl font-semibold mb-4">Purchase Credits</h2>
                    <Slider
                        defaultValue={[100]}
                        min={10}
                        max={1000}
                        step={10}
                        value={creditsToBuy}
                        onValueChange={value => setCreditsToBuy(value)}
                        className="mb-6"
                    />
                    <Button onClick={() => createCheckoutSession(creditsToBuyAmount)}>
                        Buy {creditsToBuyAmount} credits for ${price}
                    </Button>
                </div>
            </div>

            <Transaction />
        </div>
    )
}

export default BillingPage

