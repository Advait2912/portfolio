import { Routes, Route } from 'react-router-dom'
import './styles/main.css'
import ParticleBackground from './components/ParticleBackground'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import MiniMap from './components/MiniMap'
import Hero from './sections/Hero'
import SplitMind from './sections/SplitMind'
import SystemInputs from './sections/SystemInputs'
import Projects from './sections/Projects'
import SideExplorations from './sections/SideExplorations'
import OverwhelmMode from './sections/OverwhelmMode'
import Contact from './sections/Contact'
import CaseStudyPage from './sections/CaseStudyPage'
import ExplorationsPage from './sections/ExplorationsPage'

function Portfolio() {
  return (
    <div className="portfolio" style={{ paddingTop: "60px" }}>
      <MiniMap />
      <Hero />
      <SplitMind />
      <SystemInputs />
      <Projects />
      <SideExplorations />
      <OverwhelmMode />
      <Contact />
    </div>
  )
}

export default function App() {
  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <Navbar />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/case-study/:id" element={<CaseStudyPage />} />
        <Route path="/explorations" element={<ExplorationsPage />} />
      </Routes>
    </>
  )
}