import { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97, y: 10 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-50
                   inset-x-4 top-[5%] bottom-[5%]
                   sm:inset-auto sm:top-1/2 sm:left-1/2
                   sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2
                   rounded-xl border border-border bg-surface overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-primary tracking-tight">{project.title}</h2>
              <p className="text-secondary/70 mt-1.5 text-sm">{project.tagline}</p>
            </div>
            <button
              onClick={onClose}
              className="text-secondary/50 hover:text-primary transition-colors p-2 -m-2 rounded-lg hover:bg-border/30"
              aria-label="Close modal"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4l10 10M14 4L4 14" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="space-y-7">
            <div>
              <h3 className="text-[10px] font-mono text-accent/70 tracking-widest mb-2.5 uppercase">Problem</h3>
              <p className="text-secondary/80 leading-relaxed text-[15px]">{project.problem}</p>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-accent/70 tracking-widest mb-2.5 uppercase">Solution</h3>
              <p className="text-secondary/80 leading-relaxed text-[15px]">{project.solution}</p>
            </div>

            <div>
              <h3 className="text-[10px] font-mono text-accent/70 tracking-widest mb-3 uppercase">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-[11px] font-mono text-accent/70 bg-accent/5 border border-accent/15 rounded-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-3 pt-4">
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono font-medium text-bg bg-accent rounded-lg
                           hover:bg-accent/85 transition-colors active:scale-[0.98]"
              >
                Demo
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 1h7v7M11 1L1 11" />
                </svg>
              </a>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-mono text-primary/80 border border-border rounded-lg
                           hover:border-accent/30 hover:text-accent transition-colors active:scale-[0.98]"
              >
                GitHub
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 1h7v7M11 1L1 11" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
