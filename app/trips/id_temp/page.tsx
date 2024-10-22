import ItineraryView from '@/components/trips/ItineraryView'
import { supabase } from '@/lib/supabase'

interface TripPageProps {
  params: {
    id: string
  }
}

export default async function TripPage({ params }: TripPageProps) {
  // Fetch trip data if needed
  // const { data: trip } = await supabase.from('trips').select('*').eq('id', params.id).single()

  return (
    <div className="container mx-auto px-4 py-8">
      <ItineraryView tripId={params.id} viewType="full" />
    </div>
  )
}
