import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const roles = [
  'CS Engineer',
  'Building intelligent systems',
  'Designing developer tools',
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.4 },
  },
}

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function useTypingEffect(strings, typingSpeed = 55, deletingSpeed = 30, pauseTime = 2200) {
  const [text, setText] = useState('')
  const [cursor, setCursor] = useState(true)
  const indexRef = useRef(0)
  const charRef = useRef(0)
  const deletingRef = useRef(false)

  useEffect(() => {
    const blink = setInterval(() => setCursor((c) => !c), 530)
    return () => clearInterval(blink)
  }, [])

  useEffect(() => {
    const tick = () => {
      const currentString = strings[indexRef.current]

      if (!deletingRef.current) {
        charRef.current++
        setText(currentString.slice(0, charRef.current))

        if (charRef.current === currentString.length) {
          deletingRef.current = true
          return pauseTime
        }
        return typingSpeed + Math.random() * 40
      } else {
        charRef.current--
        setText(currentString.slice(0, charRef.current))

        if (charRef.current === 0) {
          deletingRef.current = false
          indexRef.current = (indexRef.current + 1) % strings.length
          return 400
        }
        return deletingSpeed
      }
    }

    let timeout
    const schedule = () => {
      const delay = tick()
      timeout = setTimeout(schedule, delay)
    }
    timeout = setTimeout(schedule, 900)
    return () => clearTimeout(timeout)
  }, [strings, typingSpeed, deletingSpeed, pauseTime])

  return { text, cursor }
}

export default function Hero() {
  const { text, cursor } = useTypingEffect(roles)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
    >
      {/* Ambient gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                        w-[28rem] h-[28rem] sm:w-[40rem] sm:h-[40rem]
                        rounded-full bg-accent/5 blur-[120px]" />
      </div>

      {/* Container */}
      <div className="w-full max-w-3xl mx-auto text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 flex flex-col items-center"
        >
          {/* Status pill */}
          <motion.div variants={item} className="mb-10">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-border bg-surface text-[11px] text-secondary font-mono tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Available for work
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1] mb-6"
          >
            <span className="text-primary">Ben</span>
            <span className="text-accent">Hur</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-sm sm:text-base text-secondary/60 font-light tracking-wide mb-6 max-w-md"
          >
            CS Engineer · Systems Thinker · Builder
          </motion.p>

          {/* Typing */}
          <motion.div
            variants={item}
            className="h-8 flex items-center justify-center font-mono text-sm sm:text-base text-secondary mb-10"
          >
            <span className="text-accent/50 mr-2">&gt;</span>
            <span className="text-secondary/90">{text}</span>
            <span
              className={`inline-block w-[2px] h-4 bg-accent ml-1 ${
                cursor ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </motion.div>

          {/* Scroll hint */}
          <motion.div variants={item} className="mt-10">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="text-secondary/30 text-[10px] font-mono tracking-[0.3em] uppercase"
            >
              scroll
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}