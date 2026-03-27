import { useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  { label: 'Email', value: 'hello@example.com', href: 'mailto:hello@example.com', copy: true },
  { label: 'GitHub', value: 'github.com/benhur17', href: 'https://github.com/benhur17' },
  { label: 'LinkedIn', value: 'linkedin.com/in/benhur17', href: 'https://linkedin.com/in/benhur17' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Contact() {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, margin: '-80px' }}
          className="text-center mb-16"
        >
          <span className="text-xs font-mono text-accent/60 tracking-widest">04</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mt-2">Contact</h2>
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
          className="text-secondary/60 mb-12 text-base sm:text-lg text-center max-w-md mx-auto"
        >
          Let's build something together.
        </motion.p>

        {/* Links */}
        <div className="max-w-md mx-auto space-y-4">
          {links.map((link, i) => (
            <motion.div
              key={link.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 2}
              viewport={{ once: true }}
              className="group flex items-center justify-between py-4 px-5 sm:px-6 rounded-xl border border-border/50 bg-surface
                         hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="text-[10px] font-mono text-accent/50 tracking-widest w-14 sm:w-16 shrink-0 uppercase">
                  {link.label}
                </span>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary/80 hover:text-accent transition-colors text-sm truncate"
                >
                  {link.value}
                </a>
              </div>

              {link.copy && (
                <button
                  onClick={() => handleCopy(link.value)}
                  className="text-[11px] font-mono text-secondary/50 hover:text-accent transition-colors px-2 py-1 shrink-0"
                >
                  {copied ? '✓ copied' : 'copy'}
                </button>
              )}

              {!link.copy && (
                <svg
                  className="w-3.5 h-3.5 text-secondary/20 group-hover:text-accent/40 transition-colors shrink-0"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 1h8v8M13 1L1 13" />
                </svg>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={6}
          viewport={{ once: true }}
          className="mt-28 sm:mt-32 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="text-[11px] text-secondary/25 font-mono">
            Built with precision & caffeine
          </span>
          <span className="text-[11px] text-secondary/20 font-mono">
            © {new Date().getFullYear()}
          </span>
        </motion.div>
      </div>
    </section>
  )
}
