import React, { useEffect, useState } from 'react'
import config from '../config'
import img1 from '../assets/gallery/gallery1.PNG'
import img2 from '../assets/gallery/gallery2.PNG'
import img3 from '../assets/gallery/gallery3.PNG'
import img4 from '../assets/gallery/gallery4.png'
import img5 from '../assets/gallery/gallery5.PNG'
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react'
import logo from '../assets/logo.svg'
import trophyImg from '../assets/trophy.png'

export default function Home() {
  const fallbackImages = [img1, img2, img3, img4, img5]
  const [images, setImages] = useState(fallbackImages)
  const [vtc, setVtc] = useState(null)
  const [supporters, setSupporters] = useState([])
  
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
        setSupporters(Array.isArray(data) ? data : [])
      } catch (err) {
        console.error('Error loading supporters:', err)
      }
    }
    load()
    loadHeaders()
    loadSupporters()
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
                  <p className="text-muted-custom mb-5 small text-uppercase" style={{ letterSpacing: '2px' }}>Public Convoy • April 2024</p>
                  
                  <div className="winner-info p-4 rounded-4 bg-white text-black shadow-lg mx-auto" style={{ maxWidth: '300px' }}>
                    <Crown className="mb-2" size={24} />
                    <div className="h3 fw-black mb-0 text-uppercase" style={{ letterSpacing: '1px' }}>MR. GIDEON</div>
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
                
                <div className="performer-list">
                  {[
                    { name: "Suresh", km: "12,450", rank: 1, color: "#FFD700" },
                    { name: "Dinesh", km: "11,200", rank: 2, color: "#C0C0C0" },
                    { name: "Ramesh", km: "10,800", rank: 3, color: "#CD7F32" }
                  ].map((p, i) => (
                    <div key={i} className="performer-item d-flex align-items-center p-3 mb-3 rounded-4" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <div className="rank-icon me-4 d-flex align-items-center justify-content-center" style={{ color: p.color }}>
                        <Medal size={32} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-white h5 mb-0">{p.name}</div>
                        <div className="text-muted-custom small text-uppercase" style={{ fontSize: '10px', letterSpacing: '1px' }}>VTC Driver</div>
                      </div>
                      <div className="text-end">
                        <div className="fw-black text-white h4 mb-0">{p.km}</div>
                        <div className="text-muted-custom fw-bold" style={{ fontSize: '9px', letterSpacing: '1.5px', opacity: '0.6' }}>KM DRIVEN</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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


