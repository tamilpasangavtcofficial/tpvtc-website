import { useEffect, useState } from 'react'
import config from '../config'
import img1 from '../assets/gallery/gallery1.PNG'
import img2 from '../assets/gallery/gallery2.PNG'
import img3 from '../assets/gallery/gallery3.PNG'
import img4 from '../assets/gallery/gallery4.png'
import img5 from '../assets/gallery/gallery5.PNG'

export default function Home() {
  const fallbackImages = [img1, img2, img3, img4, img5]
  const [images, setImages] = useState(fallbackImages)
  const [vtc, setVtc] = useState(null)
  
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('.reveal'))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          io.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })
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
    load()
    loadHeaders()
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
                <h1 className="display-4 fw-bold mb-3 text-white" style={{ letterSpacing: '1px' }}>Welcome to TAMIL PASANGA VTC</h1>
                <p className="mb-5 lead text-white mx-auto" style={{ maxWidth: '800px', opacity: '0.9' }}>
                  Tamil Pasanga VTC is a friendly and active Virtual Trucking Company built by Tamil gamers and truck enthusiasts who love driving together on TruckersMP. Our goal is to create a fun, realistic, and respectful community.
                </p>
                <div className="d-flex flex-wrap gap-4 justify-content-center align-items-center">
                  <a href="https://truckersmp.com/vtc/73933/recruitment-form/3515-driver-recruitment-form" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg fw-bold px-5 py-3 rounded-pill" style={{ letterSpacing: '0.5px' }}>Apply Now</a>
                  <a href="https://discord.com/invite/FtYBxZxTBF" target="_blank" className="btn btn-outline-accent btn-lg fw-bold px-5 py-3 rounded-pill" rel="noreferrer" style={{ letterSpacing: '0.5px' }}>Join Discord</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Identity Section */}
      <section className="py-5 border-top section-modern" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
        <div className="container py-4">
          <div className="row g-4 align-items-stretch">
            <div className="col-lg-6">
              <div className="content-card reveal h-100 p-5 text-start">
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
              <div className="content-card reveal delay-1 h-100 p-5 text-start">
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
            <div className="col-12 reveal delay-2">
              <ul className="feature-grid text-muted-custom">
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-circle shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>1</span>
                  <span className="fw-bold text-white ms-2">Professional Driving Standards</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-circle shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>2</span>
                  <span className="fw-bold text-white ms-2">Exceptional Team Spirit</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-circle shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>3</span>
                  <span className="fw-bold text-white ms-2">Proud Culture & Global Vibes</span>
                </li>
                <li className="feature-box py-3 px-4">
                  <span className="bg-white text-black d-flex align-items-center justify-content-center border-0 fw-bold rounded-circle shadow" style={{ width: '32px', height: '32px', fontSize: '14px' }}>4</span>
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
            <div className="row g-4 text-center reveal">
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
              <div className="offer-card h-100 reveal p-4">
                <div className="offer-icon bg-white text-black rounded-circle shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🚚</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Regular Convoys</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>Drive in massive weekly and monthly organized convoys soaring across Europe & ProMods.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 reveal delay-1 p-4">
                <div className="offer-icon bg-white text-black rounded-circle shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🤝</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Friendly Community</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>Integrate seamlessly into a vibrant family-like atmosphere where members are always actively helping each other.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 reveal delay-2 p-4">
                <div className="offer-icon bg-white text-black rounded-circle shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🛡️</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Professional Standard</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>We enforce deep realistic driving rules to ensure our reputation remains absolutely pristine on TruckersMP.</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6 col-lg-4 offset-lg-2">
              <div className="offer-card h-100 reveal p-4">
                <div className="offer-icon bg-white text-black rounded-circle shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>🏁</div>
                <div className="pt-2">
                  <h3 className="h5 fw-bold text-white mb-3">Cultural Unity</h3>
                  <p className="text-muted-custom mb-0" style={{ lineHeight: '1.6' }}>We heavily represent Tamil pride, ethics, and unbreakable brotherhood to players traveling globally alongside us.</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="offer-card h-100 reveal p-4">
                <div className="offer-icon bg-white text-black rounded-circle shadow mb-3" style={{ border: 'none', width: '56px', height: '56px' }}>📅</div>
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


