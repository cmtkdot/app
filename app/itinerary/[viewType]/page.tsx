import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import ItineraryView from '@/components/trips/ItineraryView'
import { Database } from '@/lib/database.types'

export default async function ItineraryViewPage({ params }: { params: { viewType: string } }) {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    // Handle unauthenticated state, e.g. render a login page
    return <div>Please log in to view your itinerary.</div>
  }

  // Fetch the user's trips
  const { data: trips, error: tripsError } = await supabase
    .from('trips')
    .select('*')
    .eq('user_id', session.user.id)
    .order('start_date', { ascending: true })
    .limit(1)

  if (tripsError) {
    console.error('Error fetching trips:', tripsError)
    return <div>Error loading trips. Please try again later.</div>
  }

  if (!trips || trips.length === 0) {
    return <div>No trips found. Create a new trip to get started!</div>
  }

  const trip = trips[0]

  // Ensure viewType is one of the allowed values
  const validViewTypes = ['daily', 'weekly', 'full']
  const viewType = validViewTypes.includes(params.viewType) ? params.viewType : 'daily'

  return (
    <div>
      <ItineraryView tripId={trip.id} viewType={viewType as 'daily' | 'weekly' | 'full'} />
    </div>
  )
}
