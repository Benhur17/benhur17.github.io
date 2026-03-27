import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const COMMANDS = {
  help: {
    output: [
      'Available commands:',
      '',
      '  about       — Who I am',
      '  projects    — What I\'ve built',
      '  skills      — Tech stack',
      '  resume      — Download resume',
      '  contact     — Get in touch',
      '  whoami      — ???',
      '  sudo hire   — ???',
      '  clear       — Clear terminal',
    ],
  },
  about: {
    output: [
      '',
      '  I build systems, not just interfaces.',
      '',
      '  CS Engineer focused on creating tools',
      '  that developers actually want to use.',
      '',
      '  I care about performance, clarity,',
      '  and craft.',
      '',
    ],
    scrollTo: 'about',
  },
  projects: {
    output: [
      '',
      '  Loading projects...',
      '  → Scrolling to projects section',
      '',
    ],
    scrollTo: 'projects',
  },
  skills: {
    output: [
      '',
      '  Languages   JavaScript · TypeScript · Python · C++',
      '  Frontend    React · Next.js · Tailwind · Framer Motion',
      '  Backend     Node.js · Express · PostgreSQL · Redis',
      '  Tools       Git · Docker · Figma · Linux',
      '',
    ],
    scrollTo: 'skills',
  },
  resume: {
    output: [
      '',
      '  ✓ Resume download started.',
      '',
    ],
    action: 'download-resume',
  },
  contact: {
    output: [
      '',
      '  Email     hello@example.com',
      '  GitHub    github.com/yourusername',
      '  LinkedIn  linkedin.com/in/yourusername',
      '',
    ],
    scrollTo: 'contact',
  },
  whoami: {
    output: [
      '',
      '  A developer who ships.',
      '  A designer who codes.',
      '  A builder who obsesses over details.',
      '',
    ],
  },
  'sudo hire': {
    output: [
      '',
      '  ✓ Permission granted.',
      '  ✓ Initiating hire sequence...',
      '',
      '  Just kidding. But let\'s talk →',
      '  hello@example.com',
      '',
    ],
  },
  clear: { output: [], clear: true },
}

// Sound utility
let audioCtx = null
function playKeySound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()
    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.frequency.value = 440 + Math.random() * 200
    osc.type = 'sine'
    gain.gain.value = 0.012
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04)
    osc.start()
    osc.stop(audioCtx.currentTime + 0.04)
  } catch {
    // silently fail
  }
}

function downloadResume() {
  const a = document.createElement('a')
  a.href = '/resume.pdf'
  a.download = 'resume.pdf'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export default function Terminal() {
  const [history, setHistory] = useState([
    { type: 'system', lines: ['Welcome. Type "help" for commands.'] },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [animatingLines, setAnimatingLines] = useState([])
  const [isAnimating, setIsAnimating] = useState(false)
  const inputRef = useRef(null)
  const scrollRef = useRef(null)

  const scrollToBottom = useCallback(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [history, animatingLines, scrollToBottom])

  const animateOutput = useCallback((lines, scrollTarget, action) => {
    setIsAnimating(true)
    setAnimatingLines([])
    let i = 0
    const interval = setInterval(() => {
      if (i < lines.length) {
        setAnimatingLines((prev) => [...prev, lines[i]])
        i++
      } else {
        clearInterval(interval)
        setHistory((prev) => [...prev, { type: 'output', lines }])
        setAnimatingLines([])
        setIsAnimating(false)

        if (action === 'download-resume') {
          downloadResume()
        }

        if (scrollTarget) {
          setTimeout(() => {
            const el = document.getElementById(scrollTarget)
            if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 500)
        }
      }
    }, 35)
  }, [])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      if (isAnimating) return

      const cmd = input.trim().toLowerCase()
      setInput('')

      if (!cmd) return

      setCmdHistory((prev) => [...prev, cmd])
      setHistoryIndex(-1)

      setHistory((prev) => [...prev, { type: 'command', text: cmd }])

      const command = COMMANDS[cmd]
      if (command) {
        if (command.clear) {
          setHistory([])
          return
        }
        animateOutput(command.output, command.scrollTo, command.action)
      } else {
        animateOutput([`  Command not found: ${cmd}`, '  Type "help" for available commands.'])
      }
    },
    [input, isAnimating, animateOutput]
  )

  const handleKeyDown = useCallback(
    (e) => {
      if (soundEnabled) playKeySound()

      if (e.key === 'ArrowUp') {
        e.preventDefault()
        if (cmdHistory.length === 0) return
        const newIndex = historyIndex === -1 ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(cmdHistory[newIndex])
      } else if (e.key === 'ArrowDown') {
        e.preventDefault()
        if (historyIndex === -1) return
        const newIndex = historyIndex + 1
        if (newIndex >= cmdHistory.length) {
          setHistoryIndex(-1)
          setInput('')
        } else {
          setHistoryIndex(newIndex)
          setInput(cmdHistory[newIndex])
        }
      }
    },
    [cmdHistory, historyIndex, soundEnabled]
  )

  const focusInput = () => inputRef.current?.focus()

  return (
    <section id="terminal" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-2xl mx-auto"
        >
        {/* Terminal window */}
        <div
          className="rounded-xl border border-border bg-surface overflow-hidden shadow-2xl shadow-black/50"
          onClick={focusInput}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3.5 border-b border-border bg-surface">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <span className="flex-1 text-center text-[11px] text-secondary/50 font-mono">
              terminal
            </span>
            {/* Sound toggle */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                setSoundEnabled(!soundEnabled)
              }}
              className="text-[11px] text-secondary/40 hover:text-accent transition-colors font-mono px-1.5 py-0.5 rounded hover:bg-accent/5"
              title={soundEnabled ? 'Mute typing sound' : 'Enable typing sound'}
            >
              {soundEnabled ? '♪ on' : '♪ off'}
            </button>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="p-5 sm:p-6 h-80 sm:h-104 overflow-y-auto font-mono text-[13px] leading-relaxed cursor-text space-y-1"
          >
            {history.map((entry, i) => (
              <div key={i}>
                {entry.type === 'command' && (
                  <div className="flex gap-2 mt-2">
                    <span className="text-accent/70 shrink-0">❯</span>
                    <span className="text-primary/90">{entry.text}</span>
                  </div>
                )}
                {entry.type === 'output' &&
                  entry.lines.map((line, j) => (
                    <div key={j} className="text-secondary/80 whitespace-pre">
                      {line || '\u00A0'}
                    </div>
                  ))}
                {entry.type === 'system' &&
                  entry.lines.map((line, j) => (
                    <div key={j} className="text-secondary/50">
                      {line || '\u00A0'}
                    </div>
                  ))}
              </div>
            ))}

            {/* Animating lines */}
            <AnimatePresence>
              {animatingLines.map((line, i) => (
                <motion.div
                  key={`anim-${i}`}
                  initial={{ opacity: 0, x: -3 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.12 }}
                  className="text-secondary/80 whitespace-pre"
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Input line */}
            {!isAnimating && (
              <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-2">
                <span className="text-accent/70 shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-primary/90 caret-accent font-mono text-[13px]"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-secondary/25 text-[11px] font-mono mt-6 tracking-wider">
          try "help" to explore
        </p>
        </motion.div>
      </div>
    </section>
  )
}
