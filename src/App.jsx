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

import CustomCursor from './components/CustomCursor'

export default function App() {
  return (
    <div>
      <CustomCursor />
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
    </div>
  )
}
