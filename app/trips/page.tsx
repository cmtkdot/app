import React from 'react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import TripsList from '@/components/trips/TripsList'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin, Plus } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function TripsPage() {
  const supabase = createServerComponentClient({ cookies })

  const { data: trips, error } = await supabase
    .from('trips')
    .select('*')
    .order('start_date', { ascending: true })

  if (error) {
    console.error('Error fetching trips:', error)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Trips</h1>
        <div className="flex space-x-2">
          <Link href="/trips/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Trip
            </Button>
          </Link>
        </div>
      </div>

      {error ? (
        <div className="text-red-500 text-center">Error loading trips. Please try again later.</div>
      ) : (
        <TripsList initialTrips={trips || []} />
      )}
    </div>
  )
}