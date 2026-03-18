import './styles/main.css'
import CustomCursor from './components/CustomCursor'
import MiniMap from './components/MiniMap'
import Hero from './sections/Hero'
import SplitMind from './sections/SplitMind'
import SystemInputs from './sections/SystemInputs'
import Projects from './sections/Projects'
import CaseStudy from './sections/CaseStudy'
import SideExplorations from './sections/SideExplorations'
import OverwhelmMode from './sections/OverwhelmMode'
import Iteration from './sections/Iteration'
import Contact from './sections/Contact'

export default function App() {
  return (
    <div className="portfolio">
      <CustomCursor />
      <MiniMap />
      <Hero />
      <SplitMind />
      <SystemInputs />
      <Projects />
      <CaseStudy />
      <SideExplorations />
      <OverwhelmMode />
      <Iteration />
      <Contact />
    </div>
  )
}
