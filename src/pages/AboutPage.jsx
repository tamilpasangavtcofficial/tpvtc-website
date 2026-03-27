import { useEffect } from 'react'
import logo from '../assets/logo.gif'
import img1 from '../assets/gallery/gallery1.PNG'
import img2 from '../assets/gallery/gallery2.PNG'
import img3 from '../assets/gallery/gallery3.PNG'
import img4 from '../assets/gallery/gallery4.png'
import img5 from '../assets/gallery/gallery5.PNG'

export default function AboutPage() {
  const galleryImages = [img1, img2, img3, img4, img5]

  useEffect(() => {
    requestAnimationFrame(() => {
      Array.from(document.querySelectorAll('.reveal')).forEach((el) => el.classList.add('in'))
    })
  }, [])

  return (
    <div className="container py-5">
      {/* Hero Section */}
      <div className="text-center reveal mb-5">
        <img src={logo} alt="Tamil Pasanga VTC Logo" className="mb-4" style={{ height: '90px', objectFit: 'contain' }} />
        <h1 className="display-5 fw-bold mb-3 accent-title text-white">About Tamil Pasanga VTC</h1>
        <div className="gradient-divider mx-auto mb-4"></div>
        <p className="text-muted-custom lead mx-auto" style={{ maxWidth: '800px' }}>
          Tamil Pasanga VTC is a proud Virtual Trucking Company built by Tamil truckers and friends who share the same passion for driving, simulation, and community. Founded in 2024 to unite Tamil players in TruckersMP, our VTC has grown into a friendly, respectful, and professional space.
        </p>
      </div>

      {/* Gallery Section */}
      <section className="mb-5 reveal delay-1">
        <div className="row g-3">
          <div className="col-md-6">
            <div className="card-banner rounded overflow-hidden h-100" style={{ minHeight: '300px' }}>
              <img src={img1} alt="Gallery 1" className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.4s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.03)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}/>
            </div>
          </div>
          <div className="col-md-6">
            <div className="row g-3 h-100">
              <div className="col-6">
                <div className="card-banner rounded overflow-hidden h-100" style={{ minHeight: '142px' }}>
                   <img src={img2} alt="Gallery 2" className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.4s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
              </div>
              <div className="col-6">
                <div className="card-banner rounded overflow-hidden h-100" style={{ minHeight: '142px' }}>
                   <img src={img3} alt="Gallery 3" className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.4s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
              </div>
              <div className="col-6">
                <div className="card-banner rounded overflow-hidden h-100" style={{ minHeight: '142px' }}>
                   <img src={img4} alt="Gallery 4" className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.4s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
              </div>
              <div className="col-6">
                <div className="card-banner rounded overflow-hidden h-100" style={{ minHeight: '142px' }}>
                   <img src={img5} alt="Gallery 5" className="w-100 h-100 object-fit-cover" style={{ transition: 'transform 0.4s ease' }} onMouseOver={e=>e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e=>e.currentTarget.style.transform='scale(1)'}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="row g-4 mb-5">
        <div className="col-lg-6">
          <div className="content-card reveal h-100 text-start">
            <div className="d-flex align-items-center mb-4">
              <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>VISION</span>
              <h2 className="h4 fw-bold mb-0 text-white">What We Believe</h2>
            </div>
            <p className="text-muted-custom mb-0" style={{ lineHeight: '1.7' }}>We believe trucking is more than just reaching a destination – it’s about the journey, teamwork, and the bonds we build on the road. That’s why we focus on creating convoys that are enjoyable, realistic, and well-organized. Our VTC is open to all players worldwide, who want to be part of a family that values unity, fun, and professionalism.</p>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="content-card reveal delay-1 h-100 text-start">
            <div className="d-flex align-items-center mb-4">
               <span className="bg-white text-black fw-bold rounded px-2 py-1 me-3 small" style={{ letterSpacing: '0.5px' }}>TARGET</span>
               <h2 className="h4 fw-bold mb-0 text-white">Our Goal</h2>
            </div>
            <p className="text-muted-custom mb-4" style={{ lineHeight: '1.7' }}>Our main goal is to build a strong and united community of drivers who share a passion for trucking and brotherhood. To push our boundaries, we actively:</p>
            <div className="d-flex flex-wrap gap-2 mt-auto">
              <span className="chip" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>🚚 Realistic Driving</span>
              <span className="chip" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>🤝 Family Environment</span>
              <span className="chip" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>🌍 Unity & Respect</span>
              <span className="chip border-white bg-white text-black fw-bold">🚛 Grow Together</span>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center text-muted-custom small py-4 border-top" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
        For us, trucking is not just about kilometers – it’s about the bonds we build, the teamwork we share, and the pride of riding together under one name.
      </div>

    </div>
  )
}


