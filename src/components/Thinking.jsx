import { motion } from 'framer-motion'

const thoughts = [
  'I optimize for clarity.',
  'I design before I build.',
  'I focus on real-world impact.',
  'I ship fast, then iterate.',
  'I write code for humans first.',
  'I question every abstraction.',
]

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Thinking() {
  return (
    <section id="skills" className="py-24 sm:py-36 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true, margin: '-80px' }}
          className="flex items-center gap-4 mb-14"
        >
          <span className="text-xs font-mono text-accent/60 tracking-wider">03</span>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Thinking</h2>
          <div className="flex-1 h-px bg-border" />
        </motion.div>

        {/* Thoughts */}
        <div className="space-y-0">
          {thoughts.map((thought, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              viewport={{ once: true, margin: '-40px' }}
              className="group flex items-center gap-4 py-4 border-b border-border/40 hover:border-accent/25 transition-colors"
            >
              <span className="text-accent/30 font-mono text-[11px] w-6 shrink-0 group-hover:text-accent/70 transition-colors">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[17px] sm:text-lg text-secondary/80 group-hover:text-primary transition-colors leading-snug">
                "{thought}"
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
