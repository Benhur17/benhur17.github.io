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
    <section id="skills" className="py-24 sm:py-32">
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
          <span className="text-xs font-mono text-accent/60 tracking-widest">03</span>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mt-2">Thinking</h2>
        </motion.div>

        {/* Thoughts */}
        <div className="max-w-xl mx-auto space-y-1">
          {thoughts.map((thought, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              custom={i + 1}
              viewport={{ once: true, margin: '-40px' }}
              className="group flex items-center gap-5 py-5 border-b border-border/30 hover:border-accent/20 transition-colors duration-300"
            >
              <span className="text-accent/25 font-mono text-[11px] w-6 shrink-0 text-right group-hover:text-accent/60 transition-colors duration-300">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-sm sm:text-base lg:text-lg text-secondary/70 group-hover:text-primary/90 transition-colors duration-300 leading-snug">
                "{thought}"
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
