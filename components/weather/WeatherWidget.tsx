import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Cloud, CloudRain, Wind, Loader } from 'lucide-react'

interface WeatherWidgetProps {
  location: string
}

interface WeatherData {
  date: string
  temperature: number
  description: string
  icon: React.ReactNode
}

const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY

export default function WeatherWidget({ location }: WeatherWidgetProps) {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`)
        if (!response.ok) {
          throw new Error('Failed to fetch weather data')
        }
        const data = await response.json()
        const processedData: WeatherData[] = data.list
          .filter((_: any, index: number) => index % 8 === 0)
          .slice(0, 5)
          .map((item: any) => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            temperature: Math.round(item.main.temp),
            description: item.weather[0].description,
            icon: getWeatherIcon(item.weather[0].main),
          }))
        setWeatherData(processedData)
      } catch (err) {
        setError('Failed to fetch weather data')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchWeatherData()
  }, [location])

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <Sun className="h-8 w-8 text-yellow-500" />
      case 'clouds':
        return <Cloud className="h-8 w-8 text-gray-500" />
      case 'rain':
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <Wind className="h-8 w-8 text-teal-500" />
    }
  }

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex justify-center items-center h-64">
          <Loader className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="text-center text-red-500">{error}</CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>5-Day Forecast for {location}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {weatherData.map((day, index) => (
            <Card key={index}>
              <CardContent className="text-center p-4">
                <p className="font-semibold">{day.date}</p>
                {day.icon}
                <p className="text-2xl font-bold">{day.temperature}°C</p>
                <p>{day.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}