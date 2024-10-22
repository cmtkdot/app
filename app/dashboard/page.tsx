'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Calendar, Plus, DollarSign, Plane, Luggage, Map } from 'lucide-react'
import { useAuth } from '@/contexts/auth-context'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/lib/database.types'
import WeatherWidget from '@/components/weather/WeatherWidget'

type Trip = Database['public']['Tables']['trips']['Row']
type Activity = Database['public']['Tables']['activities']['Row']

export default function Dashboard() {
  const [trips, setTrips] = useState<Trip[]>([])
  const [activities, setActivities] = useState<Activity[]>([])
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  useEffect(() => {
    if (!user) {
      router.push('/login')
      return
    }

    const fetchData = async () => {
      const { data: tripsData, error: tripsError } = await supabase
        .from('trips')
        .select('*')
        .order('start_date', { ascending: true })
        .limit(3)

      if (tripsError) {
        console.error('Error fetching trips:', tripsError)
      } else {
        setTrips(tripsData)
      }

      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .order('date', { ascending: true })
        .limit(5)

      if (activitiesError) {
        console.error('Error fetching activities:', activitiesError)
      } else {
        setActivities(activitiesData)
      }
    }

    fetchData()
  }, [user, router, supabase])

  if (!user) {
    return null
  }

  const upcomingTrip = trips.length > 0 ? trips[0] : null

  return (
    <div className="container mx-auto p-6">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/trips/new">
            <Plus className="mr-2 h-4 w-4" /> New Trip
          </Link>
        </Button>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Trips</CardTitle>
            <CardDescription>Your next adventures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {trips.map(trip => (
                <div key={trip.id} className="flex items-center justify-between">
                  <span className="font-medium">{trip.name}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(trip.start_date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest trip planning actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {activities.map(activity => (
                <div key={activity.id} className="flex items-center justify-between">
                  <span>{activity.title}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(activity.date).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your next trip</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-2">
              <Button asChild>
                <Link href="/trips/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Trip
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/trips">
                  <Luggage className="mr-2 h-4 w-4" />
                  View All Trips
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/destinations">
                  <Map className="mr-2 h-4 w-4" />
                  Explore Destinations
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {upcomingTrip && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Next Trip: {upcomingTrip.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Destination: {upcomingTrip.destination}</p>
            <p>Dates: {new Date(upcomingTrip.start_date).toLocaleDateString()} - {new Date(upcomingTrip.end_date).toLocaleDateString()}</p>
            <WeatherWidget location={upcomingTrip.destination} />
          </CardContent>
        </Card>
      )}
    </div>
  )
}