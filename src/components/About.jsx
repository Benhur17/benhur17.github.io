import { motion } from 'framer-motion'

const details = [
  { label: 'Focus', value: 'Systems that scale' },
  { label: 'Approach', value: 'Design → Build → Ship' },
  { label: 'Philosophy', value: 'Less code, more impact' },
  { label: 'Location', value: 'Remote / Worldwide' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-accent font-mono text-xs tracking-widest">01</span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight mt-2">About</h2>
          </motion.div>

          {/* Statement */}
          <motion.p
            variants={fadeUp}
            custom={1}
            className="text-2xl sm:text-3xl lg:text-4xl font-light leading-snug tracking-tight text-primary/95 mb-6 max-w-2xl mx-auto text-center"
          >
            I build{' '}
            <span className="text-accent font-normal">systems</span>, not just
            interfaces.
          </motion.p>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-secondary/70 leading-relaxed mb-16 max-w-lg mx-auto text-center text-sm sm:text-[15px]"
          >
            CS Engineer who cares about the architecture behind the pixels. I obsess over performance,
            developer experience, and building tools that people actually want to use.
          </motion.p>

          {/* Info grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 max-w-3xl mx-auto">
            {details.map((item, i) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                custom={3 + i}
                className="group p-5 sm:p-6 rounded-xl border border-border bg-surface hover:border-accent/20 transition-colors duration-300"
              >
                <div className="text-[10px] font-mono text-accent/50 tracking-widest mb-3 uppercase">
                  {item.label}
                </div>
                <div className="text-sm text-primary/90 font-medium">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
