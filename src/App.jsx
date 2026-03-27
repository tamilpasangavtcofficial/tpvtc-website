import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import EventsPage from './pages/EventsPage'
import EventDetailPage from './pages/EventDetailPage'
import EventBookingPage from './pages/EventBookingPage'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import TermsOfUse from './pages/TermsOfUse'
import PrivacyPolicy from './pages/PrivacyPolicy'
import GalleryPage from './pages/GalleryPage'
import Supporters from './pages/Supporters'

const Placeholder = ({ title }) => (
  <div className="container py-5">
    <h1 className="display-6">{title}</h1>
    <p className="text-muted-custom">Content coming soon.</p>
  </div>
)

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<EventsPage type="our" />} />
        <Route path="/events/our" element={<EventsPage type="our" />} />
        <Route path="/events/attending" element={<EventsPage type="attending" />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/events/:id/book" element={<EventBookingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/supporters" element={<Supporters />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <Footer />
      {/* Floating Mail Button */}
      <a 
        href="mailto:tamilpasangavtcofficial@gmail.com" 
        className="floating-mail-btn" 
        title="Send us an email" 
        aria-label="Send Email"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
        </svg>
      </a>
    </div>
  )
}
