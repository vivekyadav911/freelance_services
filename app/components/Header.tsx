'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getCookie, setCookie } from '@/app/Utils/cookies'
import ThemeToggle from '@/components/ThemeToggle'

const STUDENT_NUMBER = "21973907" // Replace with your actual student number

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    const savedTab = getCookie('activeTab')
    if (savedTab) setActiveTab(savedTab)
  }, [])

  const handleTabClick = (tab: string) => {
    setActiveTab(tab)
    setCookie('activeTab', tab, 30) // Save for 30 days
    setIsMenuOpen(false)
  }

  const menuItems = [
    { name: 'Home', path: '/', key: 'home' },
    { name: 'About', path: '/about', key: 'about' },
    { name: 'Escape Room', path: '/escape-room', key: 'escape-room' },
    { name: 'Coding Races', path: '/coding-races', key: 'coding-races' },
    { name: 'Court Room', path: '/court-room', key: 'court-room' },
  ]

  return (
    <header className="bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Student Number - Top Left */}
          <div className="text-sm font-mono text-gray-600 dark:text-gray-400">
            Student: {STUDENT_NUMBER}
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.path}
                onClick={() => handleTabClick(item.key)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === item.key
                    ? 'bg-blue-500 text-white'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <div className="space-y-1">
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
                <div className="w-6 h-0.5 bg-current"></div>
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="py-2">
              {menuItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  onClick={() => handleTabClick(item.key)}
                  className={`block px-4 py-2 text-sm transition-colors ${
                    activeTab === item.key
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}