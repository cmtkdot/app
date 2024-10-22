'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import TripForm from '@/components/trips/TripForm'
import TripTodoList from '@/components/trips/TripTodoList'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TripDetailsPage() {
  const params = useParams()
  const tripId = params.id as string

  const tripData = {
    id: tripId,
    name: 'Vietnam Adventure',
    startDate: '2023-10-15',
    endDate: '2023-10-30',
    destination: 'Vietnam'
  }

  const handleSubmit = (updatedTripData: any) => {
    console.log('Updated trip data:', updatedTripData)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Trip Details: {tripData.name}</h1>
      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Trip Details</TabsTrigger>
          <TabsTrigger value="todo">Todo List</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Edit Trip</CardTitle>
            </CardHeader>
            <CardContent>
              <TripForm initialData={tripData} onSubmit={handleSubmit} />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="todo">
          <Card>
            <CardHeader>
              <CardTitle>Trip Todo List</CardTitle>
            </CardHeader>
            <CardContent>
              <TripTodoList tripId={tripId} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}