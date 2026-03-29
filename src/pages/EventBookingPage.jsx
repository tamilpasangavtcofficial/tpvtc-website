import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate } from 'react-router-dom'
import { Calendar, Users, MapPin, Check, Plus, AlertCircle, Loader2, ArrowLeft, X as LucideX, Shield } from 'lucide-react'
import config from '../config'

export default function EventBookingPage() {
   const { id } = useParams()
   const navigate = useNavigate()
   const [event, setEvent] = useState(null)
   const [slots, setSlots] = useState([])
   const [loading, setLoading] = useState(true)
   const [bookingGroup, setBookingGroup] = useState(null)
   const [formData, setFormData] = useState({
      vtc_name: '',
      vtc_member_count: '',
      discord_username: '',
      vtc_role: '',
      vtc_link: '',
      selected_slot_id: ''
   })
   const [submitting, setSubmitting] = useState(false)

   // Custom Status Modal State
   const [statusModal, setStatusModal] = useState({ show: false, title: '', message: '', type: 'success' })
   const showStatus = (title, message, type = 'success') => setStatusModal({ show: true, title, message, type })

   const fetchData = async () => {
      try {
         const [eRes, sRes] = await Promise.all([
            fetch(`${config.API_BASE_URL}/api/tmp/events/${id}`),
            fetch(`${config.API_BASE_URL}/api/slots/${id}`)
         ])
         const eJson = await eRes.json()
         setEvent(eJson.response)
         const slotsData = await sRes.json();
         setSlots(slotsData)
      } catch (err) {
         console.error('Fetch error:', err)
      } finally {
         setLoading(false)
      }
   }

   useEffect(() => { fetchData() }, [id])

   useEffect(() => {
      document.body.style.overflow = (bookingGroup || statusModal.show) ? 'hidden' : 'auto';
      return () => { document.body.style.overflow = 'auto'; }
   }, [bookingGroup, statusModal.show]);

   const handleBookingSubmit = async (e) => {
      e.preventDefault()
      if (!formData.selected_slot_id) return showStatus('Selection Required', 'Please select a specific slot number to continue.', 'error')

      setSubmitting(true)
      try {
         const res = await fetch(`${config.API_BASE_URL}/api/slots/book`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               ...formData,
               vtc_member_count: Number(formData.vtc_member_count),
               event_id: Number(id),
               event_slot_id: Number(formData.selected_slot_id)
            })
         })
         if (res.ok) {
            setBookingGroup(null)
            showStatus('Request Transmitted', 'Our event team has received your VTC request. Check your status here after 24 hours.', 'success')
            setFormData({ vtc_name: '', vtc_member_count: '', discord_username: '', vtc_role: '', vtc_link: '', selected_slot_id: '' })
            fetchData()
         } else {
            const d = await res.json()
            showStatus('Booking Failed', d.message || 'Could not process booking.', 'error')
         }
      } catch (err) {
         showStatus('Network Error', 'Check your connection to the TP operational center.', 'error')
      } finally {
         setSubmitting(false)
      }
   }

   // Pre-process groups
   const groups = slots.reduce((acc, s) => {
      const url = s.EventSlotImage?.slot_url || 'default'
      if (!acc[url]) acc[url] = []
      acc[url].push(s)
      return acc
   }, {})

   if (loading) return (
      <div className="container py-5 text-center min-vh-50">
         <Loader2 size={40} className="animate-spin text-accent mb-3 mx-auto" />
         <div className="text-muted-custom">Loading event map data...</div>
      </div>
   )

   if (!event) return <div className="container py-5 text-white text-center">Event not found.</div>

   return (
      <div className="container py-5 reveal in">
         {/* Header Bar */}
         <div className="d-flex align-items-center justify-content-between mb-5">
            <button onClick={() => navigate(`/events/${id}`)} className="btn btn-outline-secondary border-0 text-muted-custom d-flex align-items-center gap-2 hover:text-white transition-all">
               <ArrowLeft size={18} /> Back to Details
            </button>
            <div className="text-end">
               <h1 className="h4 text-white fw-bold mb-1">{event.name}</h1>
               <div className="small text-accent fw-bold text-uppercase tracking-widest">{new Date(event.start_at).toLocaleDateString()} • SLOT RESERVATION</div>
            </div>
         </div>

         <div className="info-alert mb-5 p-4 rounded-4 border border-white border-opacity-10" style={{ background: 'rgba(255, 255, 255, 0.01)' }}>
            <div className="d-flex align-items-center justify-content-between flex-wrap gap-4">
               <div className="d-flex align-items-start gap-3">
                  <AlertCircle className="text-white mt-1" size={20} />
                  <div>
                     <div className="text-white fw-bold mb-1 h6">Tamil Pasanga Booking Engine</div>
                     <div className="small text-muted-custom">Select a parking zone and request a slot. All requests are processed within 24 hours by our event team.</div>
                  </div>
               </div>
               <div className="d-flex gap-4">
                  <div className="d-flex align-items-center gap-2">
                     <div className="rounded-1 border border-white" style={{ width: 12, height: 12 }}></div>
                     <span className="x-small text-muted-custom fw-bold tracking-widest text-uppercase">Available</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                     <div className="rounded-1" style={{ width: 12, height: 12, background: '#ffc107' }}></div>
                     <span className="x-small text-muted-custom fw-bold tracking-widest text-uppercase" style={{ color: '#ffc107' }}>Pending</span>
                  </div>
                  <div className="d-flex align-items-center gap-2">
                     <div className="rounded-1" style={{ width: 12, height: 12, background: '#ff4d4d' }}></div>
                     <span className="x-small text-muted-custom fw-bold tracking-widest text-uppercase" style={{ color: '#ff4d4d' }}>Reserved</span>
                  </div>
               </div>
            </div>
         </div>

         {/* Map Sections */}
         <div className="row g-4 mb-5">
            {Object.entries(groups).length === 0 ? (
               <div className="col-12 text-center py-5 opacity-50 text-muted-custom h5">No parking records found for this event.</div>
            ) : Object.entries(groups)
               .sort((a, b) => {
                  const minA = Math.min(...a[1].map(s => parseInt(s.slot_no) || 999));
                  const minB = Math.min(...b[1].map(s => parseInt(s.slot_no) || 999));
                  return minA - minB;
               })
               .map(([url, groupSlots], gIdx) => {
                  const booked = groupSlots.filter(s => s.booked_by).length
                  const total = groupSlots.length
                  const avail = total - booked

                  return (
                     <div key={gIdx} className="col-lg-4">
                        <div className="content-card p-0 overflow-hidden border-0 shadow-xl group h-100 d-flex flex-column">
                           <div className="bg-dark p-2 border-bottom border-white border-opacity-5" style={{ height: 350 }}>
                              <img src={url} className="w-100 h-100 object-fit-contain rounded-2 transition-all hover:scale-105" alt="Parking Floor" />
                           </div>
                           <div className="p-4 flex-grow-1">
                              <div className="d-flex justify-content-between align-items-center mb-3">
                                  <div>
                                    <div className="x-small text-muted-custom fw-bold tracking-widest text-uppercase d-flex align-items-center gap-2 mb-1">
                                       <MapPin size={12} className="text-white" /> Parking Zone
                                    </div>
                                    <h5 className="text-white fw-bold mb-0">{groupSlots[0]?.EventSlotImage?.slot_name || `ZONE ${String.fromCharCode(65 + gIdx)}`}</h5>
                                 </div>
                                 <div className="text-end">
                                    <span className="badge bg-white text-black px-3 py-2 rounded-pill small fw-bold">{avail} / {total} AVAILABLE</span>
                                 </div>
                              </div>

                              <div className="mb-4">
                                 <div className="d-flex flex-wrap gap-2">
                                    {groupSlots.sort((a, b) => parseInt(a.slot_no) - parseInt(b.slot_no)).map(s => {
                                       const isReserved = !!s.booked_by;
                                       const isPending = !isReserved && s.BookingRequests?.length > 0;

                                       let style = "border-white border-opacity-20 text-white";
                                       if (isReserved) style = "bg-danger border-danger text-white";
                                       else if (isPending) style = "border-warning text-warning";

                                       return (
                                          <div key={s.id} className={`p-1 px-3 rounded-2 x-small fw-600 border ${style}`}
                                             style={isReserved ? { backgroundColor: '#ff4d4d', color: '#fff' } : isPending ? { border: '1px solid #ffc107', color: '#ffc107' } : {}}>
                                             #{s.slot_no}
                                          </div>
                                       )
                                    })}
                                 </div>
                              </div>

                              {/* Booking Roster */}
                              <div className="p-3 rounded-4 bg-dark bg-opacity-20 border border-white border-opacity-5 mb-4">
                                 <div className="x-small text-muted-custom fw-bold mb-3 tracking-widest text-uppercase opacity-75">SLOT ALLOCATIONS</div>
                                 {groupSlots.filter(s => s.booked_by || (s.BookingRequests && s.BookingRequests.length > 0)).length === 0 ? (
                                    <div className="x-small text-muted-custom opacity-50 italic">No bookings yet.</div>
                                 ) : (
                                    <div className="d-flex flex-column gap-2">
                                       {/* Confirmed Bookings */}
                                       {groupSlots.filter(s => s.booked_by).map(s => (
                                          <div key={s.id} className="d-flex justify-content-between align-items-center">
                                             <div className="small text-white fw-500 text-truncate pe-3">#{s.slot_no} {s.booked_by}</div>
                                             <span className="badge x-small px-2 py-1 rounded-pill" style={{ background: '#ff4d4d', color: '#fff' }}>RESERVED</span>
                                          </div>
                                       ))}
                                       {/* Pending Bookings */}
                                       {groupSlots.filter(s => !s.booked_by && s.BookingRequests && s.BookingRequests.length > 0).map(s => (
                                          <div key={s.id} className="d-flex justify-content-between align-items-center border-top border-white border-opacity-5 pt-2 mt-1">
                                             <div className="small text-warning fw-500 text-truncate pe-3">#{s.slot_no} {s.BookingRequests[0].vtc_name} {s.BookingRequests.length > 1 ? `+${s.BookingRequests.length - 1} more` : ''}</div>
                                             <span className="badge x-small px-2 py-1 rounded-pill" style={{ background: 'rgba(255, 193, 7, 0.1)', color: '#ffc107', border: '1px solid #ffc107' }}>PENDING</span>
                                          </div>
                                       ))}
                                    </div>
                                 )}
                              </div>

                              {avail > 0 ? (
                                  <button
                                    onClick={() => setBookingGroup(groupSlots)}
                                    className="btn btn-accent w-100 py-3 rounded-pill fw-bold small mt-auto"
                                 >
                                    REQUEST SLOT
                                 </button>
                              ) : (
                                 <button disabled className="btn btn-outline-secondary w-100 py-3 rounded-4 fw-bold small opacity-50 mt-auto">
                                    ZONE FULL
                                 </button>
                              )}
                           </div>
                        </div>
                     </div>
                  )
               })}
         </div>

         {bookingGroup && createPortal(
            <div className="modal-overlay">
               <div className="content-card p-0 border-0 shadow-2xl w-100 overflow-hidden" style={{ maxWidth: 650, background: '#111' }}>
                  <div className="p-5">
                     <div className="d-flex justify-content-between align-items-start mb-5">
                        <div>
                           <h3 className="text-white fw-bold mb-1">Reserve Slot</h3>
                           <div className="text-accent small fw-bold text-uppercase tracking-widest">SUBMIT OFFICIAL VTC CREDENTIALS</div>
                        </div>
                        <button onClick={() => setBookingGroup(null)} className="btn btn-outline-secondary border-0 p-2 text-muted-custom hover:text-white transition-all">
                           <LucideX size={24} />
                        </button>
                     </div>

                     <form onSubmit={handleBookingSubmit}>
                        <div className="row g-4">
                           <div className="col-12">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">1. SELECT SLOT NUMBER</label>
                              <select
                                 className="form-select bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.selected_slot_id} onChange={e => setFormData({ ...formData, selected_slot_id: e.target.value })}
                              >
                                 <option value="">-- Choose available spot --</option>
                                 {bookingGroup.filter(s => !s.booked_by).sort((a, b) => parseInt(a.slot_no) - parseInt(b.slot_no)).map(s => (
                                    <option key={s.id} value={s.id}>Slot #{s.slot_no} {s.BookingRequests?.length > 0 ? '(Pending Requests)' : ''}</option>
                                 ))}
                              </select>
                           </div>

                           <div className="col-md-6">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">VTC NAME</label>
                              <input
                                 type="text" className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.vtc_name} onChange={e => setFormData({ ...formData, vtc_name: e.target.value })}
                                 placeholder="e.g. Tamil Pasanga VTC"
                              />
                           </div>

                           <div className="col-md-6">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">DISCORD USERNAME</label>
                              <input
                                 type="text" className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.discord_username} onChange={e => setFormData({ ...formData, discord_username: e.target.value })}
                                 placeholder="e.g. user_739"
                              />
                           </div>

                           <div className="col-md-6">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">YOUR VTC ROLE</label>
                              <input
                                 type="text" className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.vtc_role} onChange={e => setFormData({ ...formData, vtc_role: e.target.value })}
                                 placeholder="e.g. Event Manager"
                              />
                           </div>

                           <div className="col-md-8">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">TMP PROFILE / VTC LINK</label>
                              <input
                                 type="url" className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.vtc_link} onChange={e => setFormData({ ...formData, vtc_link: e.target.value })}
                                 placeholder="https://truckersmp.com/vtc/..."
                              />
                           </div>

                           <div className="col-md-4">
                              <label className="x-small text-muted-custom fw-bold mb-2 tracking-widest text-uppercase">EXPECTED PLAYERS</label>
                              <input
                                 type="number" className="form-control bg-dark border-white border-opacity-10 text-white rounded-3 py-3 px-4 shadow-sm" required
                                 value={formData.vtc_member_count} onChange={e => setFormData({ ...formData, vtc_member_count: e.target.value })}
                                 placeholder="5" min="1"
                              />
                           </div>
                        </div>
                         <div className="d-flex gap-3 mt-5">
                            <button type="button" onClick={() => setBookingGroup(null)} className="btn btn-outline-white px-4 py-3 rounded-pill fw-bold small tracking-widest border-white border-opacity-10 hover:bg-white hover:bg-opacity-5 transition-all text-uppercase">
                               CANCEL
                            </button>
                            <button type="submit" disabled={submitting} className="btn btn-accent flex-grow-1 py-3 rounded-pill shadow-lg h6 fw-bold tracking-wider mb-0 text-uppercase d-flex align-items-center justify-content-center gap-3">
                               {submitting ? <Loader2 size={20} className="animate-spin mx-auto" /> : (
                                  <>
                                     <Check size={18} /> TRANSMIT BOOKING REQUEST
                                  </>
                               )}
                            </button>
                         </div>
                     </form>
                  </div>
               </div>
            </div>,
            document.body
         )}

         {/* Premium Status Modal */}
         {statusModal.show && createPortal(
            <div className="modal-overlay position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center p-4"
               style={{ background: 'rgba(3,5,9,0.92)', backdropFilter: 'blur(12px)', zIndex: 99999 }}>                <div className="content-card p-0 border-0 shadow-2xl reveal zoom in w-100 overflow-hidden" style={{ maxWidth: 450, background: '#000' }}>
                   <div className="p-5 text-center">
                      <div className={`rounded-3 mx-auto d-flex align-items-center justify-content-center mb-4 border-2 border ${statusModal.type === 'error' ? 'text-danger border-danger' : 'text-white border-white'}`}
                         style={{ width: 64, height: 64, background: 'rgba(255,255,255,0.03)' }}>
                         {statusModal.type === 'error' ? <LucideX size={32} /> : <Check size={32} />}
                      </div>
                      <h4 className="fw-bold text-white mb-2">{statusModal.title}</h4>
                      <p className="text-muted-custom small mb-4">{statusModal.message}</p>
 
                      <div className="d-flex justify-content-center pt-2">
                         <button onClick={() => setStatusModal({ ...statusModal, show: false })} className="btn btn-accent px-5 py-2 rounded-pill mx-auto fw-bold">UNDERSTOOD</button>
                      </div>
                   </div>
                </div>
            </div>,
            document.body
         )}
      </div>
   )
}
