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
  <section
    id="terminal"
    className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8"
  >
    <div className="w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true }}
        className="w-full"
      >
        {/* Terminal window */}
        <div
          className="rounded-2xl border border-border bg-surface overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          onClick={focusInput}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-border bg-surface">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]/80" />
            </div>

            <span className="flex-1 text-center text-xs text-secondary/50 font-mono tracking-wide">
              terminal
            </span>

            <button
              onClick={(e) => {
                e.stopPropagation()
                setSoundEnabled(!soundEnabled)
              }}
              className="text-xs text-secondary/40 hover:text-accent transition-colors font-mono px-2 py-1 rounded hover:bg-accent/5"
            >
              {soundEnabled ? '♪ on' : '♪ off'}
            </button>
          </div>

          {/* Terminal body */}
          <div
            ref={scrollRef}
            className="
              p-5 sm:p-6 md:p-7
              h-[420px] sm:h-[500px] md:h-[560px]
              overflow-y-auto
              font-mono text-[13px] sm:text-[14px]
              leading-relaxed
              cursor-text
              space-y-1
            "
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

            <AnimatePresence>
              {animatingLines.map((line, i) => (
                <motion.div
                  key={`anim-${i}`}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className="text-secondary/80 whitespace-pre"
                >
                  {line || '\u00A0'}
                </motion.div>
              ))}
            </AnimatePresence>

            {!isAnimating && (
              <form onSubmit={handleSubmit} className="flex gap-2 items-center mt-3">
                <span className="text-accent/70 shrink-0">❯</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-primary/90 caret-accent font-mono"
                  autoFocus
                  spellCheck={false}
                  autoComplete="off"
                />
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-secondary/25 text-[11px] font-mono mt-6 tracking-widest">
          try "help" to explore
        </p>
      </motion.div>
    </div>
  </section>
)
}
