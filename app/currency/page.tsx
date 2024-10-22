'use client'

import React from 'react'
import CurrencyConverter from '@/components/currency/CurrencyConverter'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CurrencyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Currency Converter</h1>
      <Card>
        <CardHeader>
          <CardTitle>Convert Currencies</CardTitle>
        </CardHeader>
        <CardContent>
          <CurrencyConverter />
        </CardContent>
      </Card>
    </div>
  )
}