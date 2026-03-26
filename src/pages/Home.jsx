import { motion } from 'framer-motion'
import Hero from '../components/Hero'
import Terminal from '../components/Terminal'
import About from '../components/About'
import Projects from '../components/Projects'
import Thinking from '../components/Thinking'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <Hero />
      <Terminal />
      <About />
      <Projects />
      <Thinking />
      <Contact />
    </motion.main>
  )
}
