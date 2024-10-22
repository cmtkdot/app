'use client'

import React from 'react'
import { useAuth } from '@/contexts/auth-context'
import ProfileForm from '@/components/profile/ProfileForm'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {user ? (
        <ProfileForm user={user} />
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  )
}