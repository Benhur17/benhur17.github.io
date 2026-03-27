import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import CursorGlow from './components/CursorGlow'
import Nav from './components/Nav'

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CursorGlow />
      <Nav />
      <Home />
    </>
  )
}
