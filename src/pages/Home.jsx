import React, { useEffect, useState } from 'react'
import config from '../config'
import img1 from '../assets/gallery/gallery1.PNG'
import img2 from '../assets/gallery/gallery2.PNG'
import img3 from '../assets/gallery/gallery3.PNG'
import img4 from '../assets/gallery/gallery4.png'
import img5 from '../assets/gallery/gallery5.PNG'
import { Trophy, Medal, Crown, TrendingUp, User } from 'lucide-react'
import logo from '../assets/logo.svg'
import trophyImg from '../assets/trophy.png'

const MedalBadge = ({ rank, color }) => {
  const rankText = rank === 1 ? "1st" : rank === 2 ? "2nd" : "3rd";
  const bgColor = rank === 1 ? "#FFD700" : rank === 2 ? "#C0C0C0" : "#CD7F32";
  const darkColor = rank === 1 ? "#B8860B" : rank === 2 ? "#808080" : "#8B4513";

  return (
    <div className="medal-wrapper" style={{ position: 'relative', width: rank === 1 ? '160px' : '130px', height: rank === 1 ? '180px' : '150px' }}>
      <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
        {/* Ribbons */}
        <path d="M35 60 L25 95 L40 85 L50 95 L65 105 L75 95 L65 60" fill={bgColor} opacity="0.8" />
        <path d="M35 60 L20 100 L40 85 L35 60" fill={darkColor} />
        <path d="M65 60 L80 100 L60 85 L65 60" fill={darkColor} />
        
        {/* Rosette Jagged Edge */}
        <path d="M50 10 L54 12 L58 10 L62 14 L67 13 L70 18 L75 18 L77 23 L82 25 L82 30 L86 33 L85 38 L88 42 L85 47 L86 52 L82 55 L82 60 L77 62 L75 67 L70 67 L67 72 L62 71 L58 75 L54 73 L50 75 L46 73 L42 75 L38 71 L33 72 L30 67 L25 67 L23 62 L18 60 L18 55 L14 52 L15 47 L12 42 L15 38 L14 33 L18 30 L18 25 L23 23 L25 18 L30 18 L33 13 L38 14 L42 10 L46 12 Z" 
          fill={bgColor} 
          stroke={darkColor} 
          strokeWidth="1" 
        />
        
        {/* Inner Circle */}
        <circle cx="50" cy="42" r="24" fill={`url(#grad-${rank})`} stroke={darkColor} strokeWidth="1" />
        <circle cx="50" cy="42" r="21" fill="none" stroke={darkColor} strokeWidth="0.5" strokeDasharray="1,1" />
        
        <defs>
          <linearGradient id={`grad-${rank}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: bgColor, stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: darkColor, stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Text */}
        <text x="50" y="50" textAnchor="middle" fill="black" style={{ fontSize: '20px', fontWeight: '900', fontFamily: 'serif' }}>{rankText}</text>
      </svg>
    </div>
  );
};

export default function Home() {
  const fallbackImages = [img1, img2, img3, img4, img5]
  const [images, setImages] = useState(fallbackImages)
  const [vtc, setVtc] = useState(null)
  const [supporters, setSupporters] = useState([])
  const [achievements, setAchievements] = useState(null)
  const [isAchievementsLoading, setIsAchievementsLoading] = useState(true)
  const [eventData, setEventData] = useState(null)
  
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
        } else {
          entry.target.classList.remove('in')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })
    elements.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!vtc) return
    const dynamicReveals = Array.from(document.querySelectorAll('.reveal:not(.in)'))
    dynamicReveals.forEach((el) => el.classList.add('in'))
  }, [vtc])

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/tmp/vtc/profile`)
        const data = await response.json()
        if (data && !data.error && data.response) {
          setVtc(data.response)
        }
      } catch (err) {
        console.error('Error loading VTC profile:', err)
      }
    }
    const loadHeaders = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/images/headers`)
        const data = await response.json()
        if (data && data.length > 0) {
          setImages(data.map(img => img.image_url))
        }
      } catch (err) {
        console.error('Error loading header images:', err)
      }
    }
    const loadSupporters = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/supporters`)
        const data = await response.json()
        if (Array.isArray(data)) {
          const uniqueData = data.filter((v, i, a) => a.findIndex(t => (t.name === v.name)) === i)
          setSupporters(uniqueData)
        } else {
          setSupporters([])
        }
      } catch (err) {
        console.error('Error loading supporters:', err)
      }
    }
    const loadAchievements = async () => {
      try {
        const response = await fetch(`${config.API_BASE_URL}/api/achievements/latest`)
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
           console.warn("Home.jsx: Achievements API did not return JSON");
           setIsAchievementsLoading(false);
           return;
        }

        const data = await response.json()
        if (data && data.winner_name) {
          setAchievements(data)
          // Fetch event details if ID exists
          if (data.winner_event_id) {
            const evRes = await fetch(`${config.API_BASE_URL}/api/tmp/events/${data.winner_event_id}`)
            const evData = await evRes.json()
            if (!evData.error && evData.response) {
              setEventData(evData.response)
            }
          }
        }
      } catch (err) {
        console.error('Error loading achievements:', err)
      } finally {
        setIsAchievementsLoading(false)
      }
    }
    load()
    loadHeaders()
    loadSupporters()
    loadAchievements()
  }, [])

  return (
    <>
      {/* Hero Carousel */}
      <div id="heroCarousel" className="carousel slide carousel-fade hero" data-bs-ride="carousel">
        <div className="carousel-indicators">
          {images.map((_, idx) => (
            <button key={idx} type="button" data-bs-target="#heroCarousel" data-bs-slide-to={idx} className={idx === 0 ? 'active' : ''} aria-current={idx === 0 ? 'true' : undefined} aria-label={`Slide ${idx + 1}`}></button>
          ))}
        </div>
        <div className="carousel-inner">
          {images.map((src, idx) => (
            <div className={`carousel-item ${idx === 0 ? 'active' : ''}`} key={idx}>
              <div className="hero-img-wrap">
                <img src={src} className="d-block w-100 hero-img" alt={`Slide ${idx + 1}`} />
                <div className="hero-overlay" />
              </div>
              <div className="hero-center">
                <h1 className="display-4 fw-bold mb-3 text-white reveal hero-animate-title" style={{ letterSpacing: '1px' }}>WELCOME TO TAMIL PASANGA VTC</h1>
                <p className="mb-5 lead text-white mx-auto reveal hero-animate-text" style={{ maxWidth: '800px', opacity: '0.9' }}>
                  Tamil Pasanga VTC is a friendly and active Virtual Trucking Company built by Tamil gamers and truck enthusiasts who love driving together on TruckersMP. Our goal is to create a fun, realistic, and respectful community.
                </p>
                <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
                  <a href="https://truckersmp.com/vtc/73933/recruitment-form/3515-driver-recruitment-form" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg fw-bold px-5 py-3 rounded-pill reveal hero-animate-btn hero-delay-1" style={{ letterSpacing: '0.5px' }}>Apply Now</a>
                  <a href="https://discord.com/invite/FtYBxZxTBF" target="_blank" className="btn btn-outline-accent btn-lg fw-bold px-5 py-3 rounded-pill reveal hero-animate-btn hero-delay-2" rel="noreferrer" style={{ letterSpacing: '0.5px' }}>Join Discord</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* News Ticker Marquee: Supporters */}
      <div className="news-ticker-container">
        <div className="news-ticker-content">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="news-ticker-item fw-bold" style={{ color: '#fff' }}>OUR SUPPORTERS</span>
              <span className="ticker-sep">✶</span>
              {supporters.length > 0 ? (
                supporters.map((s, idx) => (
                  <React.Fragment key={`${i}-${idx}`}>
                    <span className="news-ticker-item">{s.name}</span>
                    <span className="ticker-sep">✶</span>
                  </React.Fragment>
                ))
              ) : (
                <>
                  <span className="news-ticker-item">Loading Patrons...</span>
                  <span className="ticker-sep">✶</span>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Monthly Achievements Section */}
      <section className="py-5 border-top section-modern achievements-section" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
        <div className="container py-4">
          <div className="d-flex align-items-center mb-5 reveal">
            <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>RECOGNITION</span>
            <h2 className="h3 fw-bold mb-0 text-white">Monthly Achievements</h2>
          </div>

          {isAchievementsLoading ? (
            <div className="d-flex justify-content-center align-items-center py-5">
              <div className="spinner-border text-light" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : achievements ? (
            <div className="row g-4">
              {/* Giveaway Winner */}
              <div className="col-lg-5">
                <div className="content-card achievement-card winner-card h-100 p-5 in overflow-hidden position-relative">
                  {/* Logo Overlay */}
                  <img src={logo} alt="" className="position-absolute start-50 top-50 translate-middle" style={{ width: '120%', opacity: '0.05', pointerEvents: 'none', filter: 'grayscale(1)' }} />
                  
                  <div className="winner-badge mb-4 position-relative z-1">
                    <div className="logo-container d-flex align-items-center justify-content-center">
                      <img src={trophyImg} alt="Trophy" className="achievement-trophy" style={{ width: '150px', height: '150px', objectFit: 'contain', filter: 'drop-shadow(0 0 25px rgba(255,215,0,0.5))' }} />
                    </div>
                  </div>
                  <div className="text-center position-relative z-1">
                    <h3 className="h4 fw-bold text-white mb-2">Giveaway Winner</h3>
                    <p className="text-muted-custom mb-3 small text-uppercase" style={{ letterSpacing: '2px' }}>
                      {eventData ? eventData.name : 'VTC EVENT'} • {achievements.month || 'THIS MONTH'}
                    </p>
                    
                    {achievements.winner_dlc && (
                      <div className="mb-4">
                        <span className="badge rounded-pill bg-warning text-dark px-3 py-2 fw-bold small">
                          PRIZE: {achievements.winner_dlc}
                        </span>
                      </div>
                    )}
                    
                    <div className="winner-info p-4 rounded-4 bg-white text-black shadow-lg mx-auto" style={{ maxWidth: '300px' }}>
                      <Crown className="mb-2" size={24} />
                      <div className="h3 fw-black mb-0 text-uppercase" style={{ letterSpacing: '1px' }}>
                        {achievements.winner_name || 'PENDING'}
                      </div>
                      <div className="small fw-bold text-muted-custom text-uppercase mt-1" style={{ fontSize: '10px' }}>
                        {achievements.winner_role || 'DRIVERS TEAM'}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div className="col-lg-7">
                <div className="content-card achievement-card h-100 p-5 in">
                  <div className="d-flex align-items-center mb-5">
                    <TrendingUp className="text-white me-3" size={28} />
                    <h3 className="h4 fw-bold text-white mb-0 text-uppercase" style={{ letterSpacing: '1px' }}>Top 3 Performers</h3>
                  </div>
                  
                  <div className="podium-container">
                    {[
                      // Order: 2nd, 1st, 3rd
                      { 
                        rank: 2, 
                        name: achievements.p2_name || "TBA", 
                        km: achievements.p2_distance || "0", 
                        role: achievements.p2_role || "VTC Driver",
                        color: "#C0C0C0" 
                      },
                      { 
                        rank: 1, 
                        name: achievements.p1_name || "TBA", 
                        km: achievements.p1_distance || "0", 
                        role: achievements.p1_role || "VTC Driver",
                        color: "#FFD700" 
                      },
                      { 
                        rank: 3, 
                        name: achievements.p3_name || "TBA", 
                        km: achievements.p3_distance || "0", 
                        role: achievements.p3_role || "VTC Driver",
                        color: "#CD7F32" 
                      }
                    ].map((p, i) => (
                      <div key={i} className={`podium-item podium-item--${p.rank}`}>
                        <div className="podium-avatar-wrap">
                          <MedalBadge rank={p.rank} color={p.color} />
                        </div>
                        <div className="podium-rank-box" style={{ marginTop: '0' }}>
                          <div className="podium-rank-num">{p.rank}</div>
                          <div className="podium-info">
                            <div className="podium-name">{p.name}</div>
                            <div className="podium-role">{p.role}</div>
                            <div className="podium-distance mt-2">{p.km}</div>
                            <div className="text-muted-custom fw-bold" style={{ fontSize: '8px', letterSpacing: '1px' }}>KM DRIVEN</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted-custom mb-0">Achievements will be updated soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Editorial Identity Section */}
      <section className="py-5 border-top section-modern" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
        <div className="container py-4">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="content-card h-100 p-5 text-start">
                <div className="d-flex align-items-center mb-4">
                  <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>IDENTITY</span>
                  <h2 className="h4 fw-bold mb-0 text-white">Who We Are</h2>
                </div>
                <p className="text-muted-custom mb-0" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                  Tamil Pasanga VTC is a completely community-driven Virtual Trucking Company forged by Tamil players who share an intense passion for trucks, deep simulation, and unbreakable brotherhood. We proudly carry our Tamil identity into the global scene of TruckersMP, crafting not just a VTC, but a resilient family where organic teamwork, pure fun, and utmost respect always take priority.
                </p>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="content-card h-100 p-5 text-start">
                <div className="d-flex align-items-center mb-4">
                  <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>MISSION</span>
                  <h2 className="h4 fw-bold mb-0 text-white">Our Directive</h2>
                </div>
                <p className="text-muted-custom mb-0" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
                  Our essential mission is to powerfully unite Tamil truckers and dedicated friends from around the globe under one single, unified banner. We exist to provide a highly polished, professional space to enjoy remarkably realistic trucking, coordinate massive cross-continental convoys, and build unforgettable memories on the open digital road. We welcome both veterans and beginners.
                </p>
              </div>
            </div>
          </div>
          
          <div className="row mt-5 pt-3">
            <div className="col-12">
              <ul className="feature-grid text-muted-custom">
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-3 shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>1</span>
                  <span className="fw-bold text-white ms-2">Professional Driving Standards</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-3 shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>2</span>
                  <span className="fw-bold text-white ms-2">Exceptional Team Spirit</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-3 shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>3</span>
                  <span className="fw-bold text-white ms-2">Proud Culture & Global Vibes</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-3 shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>4</span>
                  <span className="fw-bold text-white ms-2">Premium Convoys & High-End Events</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Massive Typography Stat Readout */}
      {vtc && (
        <section className="py-5 border-top bg-black" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
          <div className="container py-4">
            <div className="row g-4 text-center">
              <div className="col-6 col-md-3">
                <div className="display-4 fw-bolder text-white mb-2">{vtc.members_count}</div>
                <div className="small text-muted-custom text-uppercase fw-bold" style={{ letterSpacing: '1.5px', opacity: '0.8' }}>Active Drivers</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="display-4 fw-bolder text-white mb-2">2024</div>
                <div className="small text-muted-custom text-uppercase fw-bold" style={{ letterSpacing: '1.5px', opacity: '0.8' }}>Established</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="display-4 fw-bolder text-white mb-2">{vtc?.games?.ets ? 'ETS2' : 'ATS'}</div>
                <div className="small text-muted-custom text-uppercase fw-bold" style={{ letterSpacing: '1.5px', opacity: '0.8' }}>Main Platform</div>
              </div>
              <div className="col-6 col-md-3">
                <div className="display-4 fw-bolder text-white mb-2" style={{ color: vtc.recruitment === 'Open' ? '#fff' : 'inherit' }}>{vtc.recruitment === 'Open' ? 'OPEN' : 'LOCKED'}</div>
                <div className="small text-muted-custom text-uppercase fw-bold" style={{ letterSpacing: '1.5px', opacity: '0.8' }}>Recruitment</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* What We Offer Glass Grid */}
      <section className="py-5 border-top border-secondary offer-section">
        <div className="container py-4">
          <div className="d-flex align-items-center mb-5">
            <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>BENEFITS</span>
            <h2 className="h3 fw-bold mb-0 text-white">What We Offer</h2>
          </div>
          
          <div className="row g-4">
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 p-4">
                <div className="offer-icon bg-white text-black rounded-3 shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🚚</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Regular Convoys</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>Drive in massive weekly and monthly organized convoys soaring across Europe & ProMods.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 p-4">
                <div className="offer-icon bg-white text-black rounded-3 shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🤝</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Friendly Community</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>Integrate seamlessly into a vibrant family-like atmosphere where members are always actively helping each other.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 p-4">
                <div className="offer-icon bg-white text-black rounded-3 shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🛡️</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Professional Standard</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>We enforce deep realistic driving rules to ensure our reputation remains absolutely pristine on TruckersMP.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4 offset-lg-2">
              <div className="offer-card h-100 p-4">
                <div className="offer-icon bg-white text-black rounded-3 shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🏁</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Cultural Unity</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>We heavily represent Tamil pride, ethics, and unbreakable brotherhood to players traveling globally alongside us.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 p-4">
                <div className="offer-icon bg-white text-black rounded-3 shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>📅</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Exclusive Partnerships</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>Gain coveted access to heavily organized international VTC collaborations, huge cross-server events, and more.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

    </>
  )
}


