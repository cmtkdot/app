'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, MapPin, Umbrella, DollarSign, CheckSquare, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LoginModal } from '@/components/auth/LoginModal'
import { useAuth } from '@/contexts/auth-context'
import { motion, AnimatePresence } from 'framer-motion'

const ResponsiveNav = () => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  const toggleMenu = () => setIsOpen(!isOpen)

  const navItems = [
    { href: '/', label: 'Home', icon: <Home className="h-5 w-5" /> },
    { href: '/trips', label: 'My Trips', icon: <MapPin className="h-5 w-5" /> },
    { href: '/weather', label: 'Weather', icon: <Umbrella className="h-5 w-5" /> },
    { href: '/currency', label: 'Currency', icon: <DollarSign className="h-5 w-5" /> },
    { href: '/todo', label: 'Todo List', icon: <CheckSquare className="h-5 w-5" /> },
  ]

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      {/* ... (rest of the component remains the same) ... */}
    </nav>
  )
}

export default ResponsiveNav