import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner'
import config from '../config'

export default function EventsPage({ type = 'our' }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const fetchEvents = async () => {
      setLoading(true)
      try {
        const endpoint = type === 'our' 
          ? `${config.API_BASE_URL}/api/tmp/vtc/events` 
          : `${config.API_BASE_URL}/api/tmp/vtc/events/attending`
        
        const res = await fetch(endpoint)
        const json = await res.json()
        
        const now = new Date()
        const parseDate = (s) => new Date(s.replace(' ', 'T') + 'Z')
        
        let filtered = (json?.response || [])
          .filter((e) => parseDate(e.start_at) > now)
          .sort((a, b) => parseDate(a.start_at) - parseDate(b.start_at))

        if (type === 'attending') {
          // Additional filter if needed
        }

        if (!cancelled) {
          setEvents(filtered)
        }
      } catch (err) {
        console.error('Fetch error:', err)
        if (!cancelled) setEvents([])
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    fetchEvents()
    return () => { cancelled = true }
  }, [type])

  useEffect(() => {
    if (loading) return
    const els = Array.from(document.querySelectorAll('.reveal:not(.in)'))
    els.forEach((el) => el.classList.add('in'))
  }, [loading, events.length])

  const fmt = (s) => new Date(s.replace(' ', 'T') + 'Z').toLocaleString()
  
  const EventCard = ({ e }) => (
    <div className="col-md-6 col-lg-4 d-flex">
      <div className="content-card event-card-custom reveal w-100 d-flex flex-column">
        <div className="card-banner">
          {e.banner ? (
            <img src={e.banner} alt={e.name} />
          ) : (
            <div className="banner-fallback">Image not available</div>
          )}
        </div>
        <div className="card-body d-flex flex-column" style={{ padding: '1.5rem', flex: 1 }}>
          <h3 className="h5 fw-bold mb-2 text-white">{e.name}</h3>
          <div className="text-muted-custom small mb-4">{e.game} <span className="mx-1">•</span> {e.server?.name || 'TBD'}</div>
          
          <div className="d-flex flex-column gap-2 mb-4">
            <div className="d-flex align-items-center justify-content-between p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="small text-muted-custom">Meetup</span>
              <span className="small fw-semibold text-white">{fmt(e.meetup_at)}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span className="small text-muted-custom">Departure</span>
              <span className="small fw-semibold text-white">{fmt(e.start_at)}</span>
            </div>
          </div>

          <div className="mt-auto d-flex gap-2">
            <Link className="btn btn-outline-accent flex-grow-1" to={`/events/${e.id}`}>View Details</Link>
            {type === 'our' ? (
              <Link className="btn btn-accent flex-grow-1" to={`/events/${e.id}/book`}>Book Slot</Link>
            ) : (
              <a className="btn btn-accent flex-grow-1" href={`https://truckersmp.com${e.url}`} target="_blank" rel="noreferrer">View on TMP</a>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container py-5">
      <h1 className="h3 fw-bold mb-4">{type === 'our' ? 'Our Official Events' : 'Events We Are Attending'}</h1>
      
      {loading && <LoadingSpinner message={`Syncing ${type === 'our' ? 'Official' : 'Attending'} Events...`} />}
      
      {!loading && events.length === 0 && (
        <div className="text-muted-custom mb-4">No upcoming {type === 'our' ? 'official' : 'attending'} events.</div>
      )}
      
      <div className="row g-4 mb-5">
        {events.map((e) => (<EventCard key={e.id} e={e} />))}
      </div>
    </div>
  )
}




