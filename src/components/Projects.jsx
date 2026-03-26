import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import projectsData from '../data/projects'
import ProjectModal from './ProjectModal'

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Projects() {
  const [selected, setSelected] = useState(null)

  return (
    <section id="projects" className="py-24 sm:py-36 px-6 sm:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} custom={0} className="flex items-center gap-4 mb-14 sm:mb-20">
            <span className="text-accent font-mono text-xs tracking-wider">02</span>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </motion.div>

          {/* Project grid */}
          <LayoutGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {projectsData.map((project, i) => (
                <motion.div
                  key={project.id}
                  variants={fadeUp}
                  custom={1 + i}
                  layoutId={project.id}
                  onClick={() => setSelected(project)}
                  className="group relative p-5 sm:p-6 rounded-xl border border-border bg-surface cursor-pointer
                             transition-all duration-300 hover:border-accent/20 hover:bg-surface-hover"
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-xl bg-accent/[0.015] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-primary/95 group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-[13px] text-secondary/70 mt-1 leading-relaxed">{project.tagline}</p>
                      </div>
                      <span className="text-[11px] text-secondary/40 font-mono ml-4 shrink-0">{project.year}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[11px] font-mono text-secondary/60 bg-border/40 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-2 py-0.5 text-[11px] font-mono text-secondary/40">
                          +{project.stack.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </LayoutGroup>
        </motion.div>

        {/* Modal */}
        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
