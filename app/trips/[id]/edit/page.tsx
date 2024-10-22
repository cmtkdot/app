'use client'

import React from 'react'
import { useParams } from 'next/navigation'
import { useTrip } from '@/hooks/useTrips'
import TripsForm from '@/components/trips/TripsForm'
import dynamic from 'next/dynamic'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Trip } from '@/lib/database.types'

const WeatherWidget = dynamic(() => import('@/components/weather/WeatherComponent'), { ssr: false })

export default function EditTripPage() {
  const params = useParams()
  const tripId = params.id as string
  const { trip, isLoading, isError } = useTrip(tripId)

  if (isLoading) {
    return <div>Loading trip details...</div>
  }

  if (isError) {
    return <div>Error loading trip details. Please try again later.</div>
  }

  if (!trip) {
    return <div>No trip details found.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Trip</h1>
      <TripsForm initialData={trip} isEditing={true} />
      {trip.destination && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Weather for {trip.destination}</CardTitle>
          </CardHeader>
          <CardContent>
            <WeatherWidget location={trip.destination} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}
