"use client"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import Link from 'next/link'
import ProfileMenu from "@/components/ui/ProfileMenu"
import Image from "next/image"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { NetworkIcon, BookOpen, Users, Trophy, Settings, Menu, X, Layers } from "lucide-react"

interface HeaderProps {
  variant?: 'default' | 'dashboard'
}

export function Header({ variant = 'default' }: HeaderProps) {
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { data: session } = useSession()

  const navigationItems = [
    { href: "/courses", label: "Cours", icon: BookOpen },
    { href: "/modele-osi", label: "Modèle OSI", icon: Layers },
    { href: "/courses/intro-reseaux/lessons/qu-est-ce-qu-un-reseau", label: "Leçon Test", icon: BookOpen },
    { href: "/test-blocks-1", label: "Test Blocs 1", icon: Settings },
    { href: "/test-blocks-2", label: "Test Blocs 2", icon: Settings },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {variant === 'dashboard' ? (
            <Link href="/dashboard" className="flex items-center gap-3 text-xl font-bold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <NetworkIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NetLearn
              </span>
            </Link>
          ) : (
            <Link href="/" className="flex items-center gap-3 text-xl font-bold">
              <div className="p-2 bg-primary/10 rounded-lg">
                <NetworkIcon className="h-6 w-6 text-primary" />
              </div>
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                NetLearn
              </span>
            </Link>
          )}
        </motion.div>
        
        {/* Desktop Navigation */}
        {variant === 'default' && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center space-x-1"
          >
            {navigationItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Link 
                  href={item.href} 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary group"
                >
                  <item.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.nav>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Mobile Menu Button */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:hidden"
          >
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </motion.div>

          {/* Theme Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ModeToggle />
          </motion.div>

          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative"
          >
            {session ? (
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="relative w-9 h-9 rounded-lg overflow-hidden ring-2 ring-border hover:ring-primary/50 transition-all duration-200"
              >
                <Image
                  alt="User"
                  src={session?.user?.image || "/placeholder.svg"}
                  width={36}
                  height={36}
                  className="object-cover"
                />
              </button>
            ) : (
              <div className="flex gap-2">
                <Link href="/register">
                  <Button variant="outline" size="sm" className="hidden sm:flex">
                    S&apos;inscrire
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm">
                    Connexion
                  </Button>
                </Link>
              </div>
            )}
            <AnimatePresence>
              {isProfileOpen && session && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-72"
                >
                  <ProfileMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && variant === 'default' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-lg"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-2">
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Link 
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 hover:bg-primary/10 hover:text-primary"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
} 