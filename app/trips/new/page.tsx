'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import TripForm from '@/components/trips/TripForm'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useToast } from "@/components/ui/use-toast"

export default function NewTripPage() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleSubmit = async (tripData: any) => {
    try {
      const { data, error } = await supabase
        .from('trips')
        .insert([tripData])
        .select()

      if (error) throw error

      toast({
        title: "Success",
        description: "Your trip has been created!",
      })

      router.push('/trips')
    } catch (error) {
      console.error('Error creating trip:', error)
      toast({
        title: "Error",
        description: "Failed to create trip. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Plan a New Trip</h1>
      <TripForm onSubmit={handleSubmit} />
    </div>
  )
}