import { NavLink, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Offcanvas } from 'bootstrap'
import logo from '../assets/logo.gif'

export default function Navbar() {
  const location = useLocation()

  const hideOffcanvas = () => {
    const el = document.getElementById('mobileNav')
    if (!el) return
    const inst = Offcanvas.getOrCreateInstance(el)
    inst.hide()
    // Ensure any lingering backdrop is removed
    setTimeout(() => {
      document.querySelectorAll('.offcanvas-backdrop').forEach((n) => n.parentNode && n.parentNode.removeChild(n))
      document.body.classList.remove('offcanvas-open')
      document.body.style.overflow = ''
    }, 200)
  }

  // Close offcanvas on route change
  useEffect(() => {
    const el = document.getElementById('mobileNav')
    if (!el) return
    const inst = Offcanvas.getOrCreateInstance(el)
    inst.hide()
    // Force clean up in case of navigation timing
    const t = setTimeout(() => {
      document.querySelectorAll('.offcanvas-backdrop').forEach((n) => n.parentNode && n.parentNode.removeChild(n))
      document.body.classList.remove('offcanvas-open')
      document.body.style.overflow = ''
    }, 200)
    return () => clearTimeout(t)
  }, [location.pathname])
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top navbar-modern navbar-unique py-2">
      <div className="container">
        <NavLink className="navbar-brand text-white d-flex align-items-center" to="/">
          <img src={logo} alt="Tamil Pasanga VTC logo" className="me-2" style={{ height: '28px' }} />
          <span>Tamil Pasanga VTC</span>
        </NavLink>
        {/* Desktop nav */}
        <div className="d-none d-lg-block ms-auto">
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item"><NavLink className="nav-link text-white" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/events/our">Our Events</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/events/attending">Our Attending Events</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/team">Our Team</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/supporters">Our Supporters</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/gallery">Gallery</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/about">About</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link text-white" to="/contact">Contact</NavLink></li>
          </ul>
        </div>

        {/* Mobile hamburger → offcanvas */}
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#mobileNav"
          aria-controls="mobileNav"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
      </div>

    </nav>

    {/* Offcanvas sidebar for mobile - placed outside nav to avoid clipping */}
    <div
      className="offcanvas offcanvas-start text-bg-dark"
      tabIndex="-1"
      id="mobileNav"
      aria-labelledby="mobileNavLabel"
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="mobileNavLabel">Tamil Pasanga VTC</h5>
        <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        <ul className="navbar-nav">
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/">Home</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/events/our">Our Events</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/events/attending">Our Attending Events</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/team">Our Team</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/supporters">Our Supporters</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/gallery">Gallery</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/about">About</NavLink></li>
          <li className="nav-item"><NavLink onClick={hideOffcanvas} className="nav-link text-white" to="/contact">Contact</NavLink></li>
        </ul>
      </div>
    </div>
    </>
  )
}


