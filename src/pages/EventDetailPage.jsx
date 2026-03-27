import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Info, ExternalLink, Ticket, Check, ChevronRight, Zap } from 'lucide-react';
import config from '../config';

export default function EventDetailPage() {
  const { id } = useParams()
  const [event, setEvent] = useState(null)
  const [slots, setSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingSlot, setBookingSlot] = useState(null)
  const [formData, setFormData] = useState({
    vtc_name: '',
    vtc_tag: '',
    vtc_member_count: ''
  })
  const [attendingSlot, setAttendingSlot] = useState(null)
  const MY_VTC_ID = 73933

  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventRes = await fetch(`${config.API_BASE_URL}/api/tmp/events/${id}`)
        const eventJson = await eventRes.json()
        const e = eventJson.response
        if (!e) return setEvent(null)
        setEvent(e)

        // Switch Logic: Our Event vs Attending Event
        if (e.vtc?.id === MY_VTC_ID) {
          const slotsRes = await fetch(`${config.API_BASE_URL}/api/slots/${id}`)
          const slotsJson = await slotsRes.json()
          setSlots(slotsJson)
        } else {
          try {
            const attRes = await fetch(`${config.API_BASE_URL}/api/slots/attending/${id}`)
            const attJson = await attRes.json()
            setAttendingSlot(attJson)
          } catch (e) {
            console.log("No attending slot info found")
          }
        }
      } catch (err) {
        console.error('Error fetching event data:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  useEffect(() => {
    if (loading || !event) return
    const timer = setTimeout(() => {
      Array.from(document.querySelectorAll('.reveal')).forEach(el => el.classList.add('in'))
    }, 100)
    return () => clearTimeout(timer)
  }, [loading, event])

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${config.API_BASE_URL}/api/slots/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          event_id: id,
          event_slot_id: bookingSlot.id
        })
      })
      if (res.ok) {
        alert('Booking request submitted!')
        setBookingSlot(null)
      } else {
        const data = await res.json()
        alert(data.message || 'Booking failed')
      }
    } catch (err) {
      alert('Error submitting booking')
    }
  }

  const renderDescription = (raw) => {
    if (!raw) return 'No description provided.'
    let html = (raw || '')
      // Remove those starting '>' blockquote markers that TMP uses heavily
      .replace(/^> /gm, '')
      // Remove markdown header hashes but keep the text
      .replace(/^#+ (.*$)/gm, '<div class="text-white fw-bold h6" style="margin-bottom:2px">$1</div>')
      .replace(/!\[.*?\]\((.*?)\)/g, '<img src="$1" class="img-fluid rounded-4 my-3 d-block shadow-lg border border-white border-opacity-10" alt="Event Image" />')
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noreferrer" class="text-accent-secondary text-decoration-none fw-bold hover:underline">$1</a>')
      .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>')
      .replace(/^---$/gm, '<hr class="my-2 opacity-5" />')
      .replace(/\n/g, '<br/>')
      // Cleanup: Remove brs that come immediately after headers (divs) to prevent double spacing
      .replace(/<\/div><br\/>/g, '</div>')
      .replace(/<br\/><div/g, '<div')
      // Cleanup redundant empty lines/brs
      .replace(/(<br\/>){2,}/g, '<br/>')
    return html
  }

  const fmt = (s) => new Date(s.replace(' ', 'T') + 'Z').toLocaleString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true
  })

  if (loading) return (
    <div className="container py-5 text-center" style={{ minHeight: '50vh' }}>
      <div className="spinner-border text-accent mb-3" role="status"></div>
      <div className="text-muted-custom">Loading event...</div>
    </div>
  )
  if (!event) return <div className="container py-5 text-white text-center">Event not found.</div>

  const isOurEvent = event.vtc?.id === MY_VTC_ID

  return (
    <div className="container py-4 reveal in">
      {/* Breadcrumb / Navigation */}
      <div className="d-flex align-items-center gap-3 mb-4 opacity-75">
        <Link to="/events" className="text-decoration-none text-muted-custom hover:text-white transition-all small fw-bold tracking-widest text-uppercase">Events</Link>
        <ChevronRight size={14} className="text-muted" />
        <span className="small text-accent fw-bold tracking-widest text-uppercase">{event.game}</span>
        <ChevronRight size={14} className="text-muted" />
        <span className="small text-white fw-bold tracking-widest text-uppercase text-truncate" style={{ maxWidth: 200 }}>{event.name}</span>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <div className="reveal">
            {/* Main Title Section */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-3 mb-2">
                <div className="badge bg-accent bg-opacity-10 text-accent border border-accent border-opacity-20 px-3 py-2 rounded-pill small fw-bold">OFFICIAL TRUCKERSMP EVENT</div>
                <div className="text-muted-custom small fw-bold d-flex align-items-center gap-2">
                  <Users size={14} className="text-accent" /> {event.vtc?.name || 'VTC Event'}
                </div>
              </div>
              <h1 className="h2 text-white fw-bold mb-0 tracking-tight">{event.name}</h1>
            </div>

            <div className="rounded-4 overflow-hidden mb-4 shadow-2xl border border-white border-opacity-10 position-relative group">
              <img src={event.banner} className="w-100 d-block transition-all hover:scale-105" alt={event.name} style={{ maxHeight: 400, objectFit: 'cover' }} />
              <div className="position-absolute bottom-0 start-0 w-100 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}></div>
            </div>

            {/* Structured Event Info Block (TMP Style) */}
            <div className="p-4 rounded-4 border border-white border-opacity-5 mb-4 shadow-sm" style={{ background: 'rgba(255,255,255,0.01)' }}>
              <div className="row g-4 text-uppercase tracking-widest x-small fw-bold opacity-75 mb-3 text-white">
                <div className="col-12"><Info size={14} className="me-2" /> Official Event Logistics</div>
              </div>
              <div className="row g-4">
                <div className="col-md-6 col-lg-3">
                  <div className="text-muted-custom x-small fw-bold mb-1 opacity-50 text-uppercase">Starting Point</div>
                  <div className="text-white small fw-bold">
                    {event.departure ? (event.departure.city === event.departure.location ? event.departure.city : `${event.departure.city} (${event.departure.location})`) : 'See Description'}
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="text-muted-custom x-small fw-bold mb-1 opacity-50 text-uppercase">Destination</div>
                  <div className="text-white small fw-bold">
                    {event.arrive ? (event.arrive.city === event.arrive.location ? event.arrive.city : `${event.arrive.city} (${event.arrive.location})`) : 'See Description'}
                  </div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="text-muted-custom x-small fw-bold mb-1 opacity-50 text-uppercase">DLC Requirement</div>
                  <div className="text-white small fw-bold">None / Base Game</div>
                </div>
                <div className="col-md-6 col-lg-3">
                  <div className="text-muted-custom x-small fw-bold mb-1 opacity-50 text-uppercase">Server</div>
                  <div className="text-white small fw-bold">{event.server?.name || 'Event Server'}</div>
                </div>
              </div>
            </div>

            <div className="event-description text-muted-custom mt-4" style={{ fontSize: '1.05rem', lineHeight: '1.9' }} dangerouslySetInnerHTML={{ __html: renderDescription(event.description) }} />

            {event.map && (
              <div className="mt-4 pt-4 border-top border-white border-opacity-5">
                <h3 className="h5 text-white fw-bold mb-3 d-flex align-items-center gap-3">
                  <div className="p-2 rounded-3 bg-white text-black"><MapPin size={20} /></div>
                  Event Route Map
                </h3>
                <img src={event.map} className="img-fluid rounded-4 shadow-2xl border border-white border-opacity-5 hover:border-opacity-20 transition-all" alt="Map" />
              </div>
            )}
          </div>
        </div>

        <div className="col-lg-4">
          <div className="reveal delay-1 sticky-top" style={{ top: '120px' }}>
            {/* Schedule Card */}
            <div className="content-card p-4 shadow-2xl" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
              <h4 className="h6 text-muted-custom mb-4 fw-bold tracking-widest text-uppercase d-flex align-items-center gap-2">
                <Calendar size={16} className="text-white" /> Event Schedule
              </h4>
              <div className="d-flex flex-column gap-4">
                <div className="d-flex gap-3">
                  <div className="rounded-3 bg-white text-black d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                    <Clock size={22} />
                  </div>
                  <div>
                    <div className="x-small text-muted-custom fw-bold tracking-widest text-uppercase mb-1 opacity-75">Meetup</div>
                    <div className="text-white fw-bold h6 mb-0">{fmt(event.meetup_at)}</div>
                  </div>
                </div>
                <div className="d-flex gap-3">
                  <div className="rounded-3 bg-white text-black d-flex align-items-center justify-content-center" style={{ width: 44, height: 44 }}>
                    <Zap size={22} />
                  </div>
                  <div>
                    <div className="x-small text-muted-custom fw-bold tracking-widest text-uppercase mb-1 opacity-75">Departure</div>
                    <div className="text-white fw-bold h6 mb-0">{fmt(event.start_at)}</div>
                  </div>
                </div>
              </div>
            </div>

            {isOurEvent && (
              <div className="content-card event-card-custom p-4 mt-4 overflow-hidden position-relative">
                <div className="position-absolute top-0 end-0 p-3 opacity-05 pe-none" style={{ zIndex: 0 }}><Ticket size={80} strokeWidth={1} /></div>
                <div className="position-relative" style={{ zIndex: 1 }}>
                  <h4 className="h5 text-white mb-2 fw-bold d-flex align-items-center gap-2"><Ticket size={20} /> Slot Reservation</h4>
                  <p className="small text-muted-custom mb-4 opacity-75">Request an official parking spot for your VTC fleet.</p>
                  <Link to={`/events/${id}/book`} className="btn btn-accent w-100 py-3 fw-bold tracking-wider rounded-pill d-flex align-items-center justify-content-center gap-2 shadow-lg">
                    RESERVE NOW <ChevronRight size={18} />
                  </Link>
                </div>
              </div>
            )}

            {!isOurEvent && (
              <div className="content-card p-4 mt-4 border-white border-opacity-10">
                <h4 className="h5 text-white mb-4 d-flex align-items-center gap-3">
                  <div className="p-2 rounded-3 d-flex align-items-center justify-content-center" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff' }}><MapPin size={18} /></div>
                  Assigned Parking
                </h4>
                {attendingSlot ? (
                  <div className="reveal zoom">
                    <div className="d-flex align-items-center justify-content-between mb-4 p-3 rounded-4 bg-dark bg-opacity-20 border border-white border-opacity-5">
                      <div>
                        <div className="x-small text-muted-custom fw-bold mb-1 opacity-50">SLOT NO.</div>
                        <div className="text-white fw-bold h4 mb-0">#{attendingSlot.slot_number}</div>
                      </div>
                      <div className="badge bg-white text-black px-3 py-1 rounded-pill x-small fw-bold">ALLOCATED</div>
                    </div>
                    {attendingSlot.slot_url && (
                      <div className="rounded-4 border border-white border-opacity-10 overflow-hidden shadow-2xl group cursor-pointer position-relative">
                        <img src={attendingSlot.slot_url} className="w-100 d-block transition-transform group-hover:scale-105" alt="Allotted Slot" />
                        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="badge bg-white text-dark small fw-bold">VIEW FULL MAP</span>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="p-4 rounded-4 border border-dashed border-white border-opacity-10 text-center">
                    <div className="opacity-20 mb-3"><Clock size={32} className="mx-auto" /></div>
                    <p className="small text-muted-custom px-2 mb-0">Waiting for slot allocation. Please check back later.</p>
                  </div>
                )}
              </div>
            )}

            <a href={`https://truckersmp.com/events/${event.id}`} target="_blank" rel="noreferrer" className="btn btn-outline-white w-100 mt-4 py-3 rounded-4 border-opacity-10 small fw-bold tracking-widest d-flex align-items-center justify-content-center gap-2 opacity-50 hover:opacity-100 transition-all">
              <ExternalLink size={16} /> VIEW ON TRUCKERSMP
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
