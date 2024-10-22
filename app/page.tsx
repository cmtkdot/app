import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Calendar, DollarSign, Umbrella, Plane, Camera, ArrowRight } from 'lucide-react'
import { LoginModal } from "@/components/auth/LoginModal"

export default function Home() {
  const features = [
    { icon: <MapPin className="h-8 w-8" />, title: 'Trip Planning', description: 'Plan and organize your trips together' },
    { icon: <Calendar className="h-8 w-8" />, title: 'Itinerary Management', description: 'Create detailed day-by-day itineraries for your adventures' },
    { icon: <DollarSign className="h-8 w-8" />, title: 'Budget Tracking', description: 'Keep track of your shared expenses and stay on budget' },
    { icon: <Umbrella className="h-8 w-8" />, title: 'Weather Forecasts', description: 'Get real-time weather updates for your destinations' },
    { icon: <Plane className="h-8 w-8" />, title: 'Travel Documents', description: 'Store and organize all your travel documents in one place' },
    { icon: <Camera className="h-8 w-8" />, title: 'Photo Albums', description: 'Create beautiful memories with shared trip photo albums' },
  ]

  const upcomingTrips = [
    { id: 1, name: 'Vietnam Adventure', date: '2023-10-15', image: 'https://images.unsplash.com/photo-1557750255-c76072a7aad1' },
    { id: 2, name: 'Thailand Getaway', date: '2023-11-20', image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
            Your Next Adventure Awaits
          </h1>
          <p className="text-xl mb-8 text-gray-600">
            Join J&S on their exciting journey through Vietnam and Thailand. Plan, explore, and create unforgettable memories together.
          </p>
          <LoginModal>
            <Button size="lg">
              Start Your Journey <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </LoginModal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <div className="mb-2 text-blue-500">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">Upcoming Adventures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            {upcomingTrips.map((trip) => (
              <Card key={trip.id} className="overflow-hidden">
                <Image 
                  src={trip.image}
                  alt={trip.name}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{trip.name}</CardTitle>
                  <CardDescription>Starting: {new Date(trip.date).toLocaleDateString()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/trips/${trip.id}`}>
                    <Button>View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <footer className="bg-gray-100 py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2023 J&S Travels. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}