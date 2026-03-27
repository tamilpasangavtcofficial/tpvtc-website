import { useEffect } from 'react'
import img6 from '../assets/gallery/gallery6.png'

export default function ContactPage() {
  useEffect(() => {
    requestAnimationFrame(() => {
      Array.from(document.querySelectorAll('.reveal')).forEach((el) => el.classList.add('in'))
    })
  }, [])

  return (
    <div className="container py-5">
      <div className="text-center reveal mb-5">
        <h1 className="display-5 fw-bold mb-3 text-white">Contact Tamil Pasanga VTC</h1>
        <div className="mx-auto mb-4" style={{ width: '60px', height: '4px', background: '#fff', borderRadius: '2px' }}></div>
        <p className="text-muted-custom lead mx-auto" style={{ maxWidth: '700px' }}>
          Connect with us through our active community channels. Whether you want to join our convoys or just hang out, you are always welcome!
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        <div className="col-md-6 d-flex">
          <div className="content-card reveal w-100 d-flex flex-column text-start">
            <h2 className="h4 fw-bold mb-3 text-white">Discord Community</h2>
            <p className="text-muted-custom mb-4" style={{ lineHeight: '1.6' }}>
              Join our active Discord server for real-time communication, convoy announcements, and community discussions.
            </p>
            <a href="https://discord.com/invite/FtYBxZxTBF" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg px-5 fw-bold mt-auto rounded-pill shadow-lg">
              Join Discord Server
            </a>
          </div>
        </div>

        <div className="col-md-6 d-flex">
          <div className="content-card reveal delay-1 w-100 d-flex flex-column text-start">
            <h2 className="h4 fw-bold mb-3 text-white">TruckersMP Profile</h2>
            <p className="text-muted-custom mb-4" style={{ lineHeight: '1.6' }}>
              Visit our official TruckersMP VTC page to see our latest statistics, member list, and convoy schedules.
            </p>
            <a href="https://truckersmp.com/vtc/73933-tamil_pasanga" target="_blank" rel="noreferrer" className="btn btn-accent btn-lg px-5 fw-bold mt-auto rounded-pill shadow-lg">
              View VTC Profile
            </a>
          </div>
        </div>
      </div>

      <div className="reveal delay-2 mt-5">
        <div className="rounded-4 overflow-hidden border border-white border-opacity-10 shadow-2xl" style={{ height: '350px', background: 'rgba(255,255,255,0.02)' }}>
          {/* Fallback image handler for when gallery6.png doesn't exist yet */}
          <img 
            src={img6} 
            alt="Contact Banner" 
            className="w-100 h-100 object-fit-cover" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  )
}

