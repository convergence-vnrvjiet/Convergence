// client/app/register/page.tsx
"use client"

import { useState } from "react"
import { authApi } from "@/apis/auth"
import { SiteHeader } from "@/components/site-header"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "VNR VJIET",
    rollNumber: "",
    year: "1",
    branch: "",
    password: "",
  })
  const [status, setStatus] = useState<{ type: 'idle' | 'loading' | 'success' | 'error', message: string }>({ type: 'idle', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'loading', message: 'Registering...' })

    try {
      await authApi.register(formData)
      setStatus({ type: 'success', message: 'Registration successful! You can now log in.' })
      // Optional: Redirect to login page here using next/navigation router.push('/login')
    } catch (error: any) {
      setStatus({ type: 'error', message: error.message || 'Registration failed.' })
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-xl px-6 py-20">
        <h1 className="mb-8 text-center text-3xl font-bold">Create Account</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4 border border-border p-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <input required type="text" name="name" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input required type="email" name="email" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone Number</label>
              <input required type="tel" name="phone" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">College</label>
            <select name="college" onChange={handleChange} className="w-full border border-border bg-background p-2 text-sm">
              <option value="VNR VJIET">VNR VJIET</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1 space-y-2">
              <label className="text-sm font-medium">Year</label>
              <select name="year" onChange={handleChange} className="w-full border border-border bg-background p-2 text-sm">
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-medium">Branch / Specialization</label>
              <input required type="text" name="branch" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Roll Number</label>
            <input required type="text" name="rollNumber" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <input required type="password" name="password" onChange={handleChange} className="w-full border border-border bg-transparent p-2 text-sm" />
          </div>

          <button 
            type="submit" 
            disabled={status.type === 'loading'}
            className="mt-6 w-full bg-foreground py-2 text-sm font-bold text-background disabled:opacity-50"
          >
            {status.type === 'loading' ? 'Processing...' : 'Register'}
          </button>

          {status.message && (
            <p className={`text-center text-sm ${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
              {status.message}
            </p>
          )}
        </form>
      </main>
    </div>
  )
}