'use client'

import React, { useState, useEffect } from 'react'
import ActivityDashboard from './ActivityDashboard'
import { useTrips } from '../../hooks/useTrips'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'

const ActivityPage: React.FC = () => {
  const [selectedTripId, setSelectedTripId] = useState<string | null>(null)
  const { trips, isLoading, isError } = useTrips()

  useEffect(() => {
    if (trips && trips.length > 0 && !selectedTripId) {
      setSelectedTripId(trips[0].id)
    }
  }, [trips, selectedTripId])

  if (isLoading) return <div>Loading trips...</div>
  if (isError) return <div>Error loading trips. Please try again later.</div>
  if (!trips || trips.length === 0) return <div>No trips found. Please create a trip first.</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activities</CardTitle>
      </CardHeader>
      <CardContent>
        <Select
          value={selectedTripId || ''}
          onValueChange={(value) => setSelectedTripId(value)}
        >
          <SelectTrigger className="w-full mb-4">
            <SelectValue placeholder="Select a trip" />
          </SelectTrigger>
          <SelectContent>
            {trips.map((trip) => (
              <SelectItem key={trip.id} value={trip.id}>
                {trip.destination}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {selectedTripId && (
          <ActivityDashboard
            tripId={selectedTripId}
            viewType="full"
          />
        )}
      </CardContent>
    </Card>
  )
}

export default ActivityPage
