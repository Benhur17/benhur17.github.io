import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import Home from './pages/Home'
import CursorGlow from './components/CursorGlow'

export default function App() {
  return (
    <>
      <div className="noise-overlay" />
      <CursorGlow />
      <Home />
    </>
  )
}
