import { useState, useEffect } from 'react'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? 'bg-black/70 backdrop-blur-2xl border-b border-border/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8 flex items-center justify-between h-16 sm:h-18">
        <a
          href="#hero"
          className="text-sm font-semibold tracking-tight text-primary/90 hover:text-accent transition-colors duration-300"
        >
          Ben<span className="text-accent">.</span>
        </a>
        <div className="flex items-center gap-7 sm:gap-9">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[11px] sm:text-xs font-mono text-secondary/50 hover:text-accent transition-colors duration-300 tracking-wider"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}
