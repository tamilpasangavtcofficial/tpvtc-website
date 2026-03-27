import { useEffect, useState } from 'react'
import LoadingSpinner from '../components/LoadingSpinner'
import config from '../config'

export default function TeamPage() {
  const VTC_ID = 73933
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/api/tmp/vtc/members`)
        const json = await res.json()
        const members = json?.response?.members || []
        const map = new Map()
        for (const m of members) {
          // Extract multiple roles if available, otherwise fallback to single role string
          let memberRoles = []
          if (m.roles && Array.isArray(m.roles) && m.roles.length > 0) {
            memberRoles = m.roles.map(r => ({ name: r.name, order: r.order ?? 99 }))
          } else {
            memberRoles = [{ name: m.role || 'Member', order: 99 }]
          }

          // Assign member to EVERY role category they belong to
          for (const roleInfo of memberRoles) {
            const key = roleInfo.name
            if (!map.has(key)) {
              map.set(key, { role: roleInfo.name, order: roleInfo.order, members: [] })
            }
            map.get(key).members.push(m)
          }
        }
        const grouped = Array.from(map.values())
          .sort((a, b) => (a.order - b.order) || a.role.localeCompare(b.role))
          .map(g => ({ ...g, members: g.members.sort((a, b) => a.username.localeCompare(b.username)) }))
        if (!cancelled) setGroups(grouped)
      } catch (e) {
        if (!cancelled) setGroups([])
      } finally {
        if (!cancelled) setLoading(false)
        requestAnimationFrame(() => {
          Array.from(document.querySelectorAll('.reveal')).forEach(el => el.classList.add('in'))
        })
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    Array.from(document.querySelectorAll('.reveal')).forEach((el) => el.classList.add('in'))
  }, [groups])

  return (
    <div className="container py-5">
      <div className="text-center reveal mb-5">
        <h1 className="display-5 fw-bold mb-3 accent-title text-white">Our Team</h1>
        <div className="gradient-divider mx-auto mb-4"></div>
        <p className="text-muted-custom lead mx-auto" style={{ maxWidth: '700px' }}>
          Meet the dedicated drivers, management, and staff that keep the Tamil Pasanga VTC engines running smoothly across TruckersMP.
        </p>
      </div>

      {loading && <LoadingSpinner message="Retrieving Personnel Data..." />}
      {!loading && groups.length === 0 && <div className="text-center text-muted-custom my-5">No members found.</div>}
      
      {groups.map((g, index) => (
        <section key={g.role} className={`mb-5 ${index > 0 ? 'mt-5 pt-4 border-top' : ''}`} style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
          <div className="text-center mb-5 reveal">
             <span className="bg-white text-black fw-bold rounded px-4 py-2 small shadow-sm" style={{ letterSpacing: '0.5px' }}>{g.role.toUpperCase()}</span>
          </div>
          <div className="row g-4 justify-content-center">
            {g.members.map((m) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={m.id}>
                <div 
                  className="member-card reveal h-100 d-flex flex-column align-items-center text-center p-4 rounded-4"
                  style={{ 
                    background: 'rgba(255, 255, 255, 0.03)', 
                    backdropFilter: 'blur(16px)', 
                    WebkitBackdropFilter: 'blur(16px)', 
                    border: '1px solid rgba(255,255,255,0.08)', 
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                    transition: 'transform 0.3s ease, border-color 0.3s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.transform = 'translateY(-5px)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  <div className="member-avatar bg-white text-black d-flex justify-content-center align-items-center rounded-circle shadow mb-3" style={{ width: '70px', height: '70px', fontSize: '1.8rem', border: 'none' }}>
                    👤
                  </div>
                  
                  <h3 className="h5 fw-bold text-white mb-1" style={{ wordBreak: 'break-word' }}>{m.username}</h3>
                  <div className="small text-muted-custom mb-4" style={{ opacity: 0.8 }}>
                    Joined {new Date(m.joinDate.replace(' ', 'T') + 'Z').toLocaleDateString()}
                  </div>
                  
                  <div className="mt-auto w-100">
                    {m.steamID && (
                      <a 
                        className="btn btn-outline-light btn-sm w-100 rounded-pill fw-bold" 
                        href={`https://truckersmp.com/user/${m.user_id}`} 
                        target="_blank" 
                        rel="noreferrer"
                        style={{ padding: '0.4rem 0', borderColor: 'rgba(255,255,255,0.2)' }}
                      >
                        TruckersMP Profile
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}


