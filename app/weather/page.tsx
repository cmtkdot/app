'use client'

import React, { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import WeatherWidget from "@/components/weather/WeatherWidget"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'

export default function WeatherPage() {
  const [location, setLocation] = useState('')
  const [searchedLocation, setSearchedLocation] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearchedLocation(location)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Location</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex space-x-2">
            <Input
              type="text"
              placeholder="Enter a location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </form>
        </CardContent>
      </Card>
      {searchedLocation && <WeatherWidget location={searchedLocation} />}
    </div>
  )
}