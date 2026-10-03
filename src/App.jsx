import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Events from './pages/Events'
import Calendar from './pages/Calendar'
import EventBooking from './pages/EventBooking'
import About from './pages/About'
import ContactPage from './pages/ContactPage'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import GalleryPage from './pages/GalleryPage'
import Supporters from './pages/Supporters'
import Partners from './pages/Partners'

const Placeholder = ({ title }) => (
  <div className="container py-5">
    <h1 className="display-6">{title}</h1>
    <p className="text-muted-custom">Content coming soon.</p>
  </div>
)

export default function App() {
  return (
    <div>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/events/:eventId" element={<EventBooking />} />
        <Route path="/about" element={<About />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/supporters" element={<Supporters />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
    </div>
  )
}
