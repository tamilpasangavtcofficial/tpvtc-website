import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 border-top border-white border-opacity-10">
      <div className="container text-center text-md-start">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
          <div className="d-flex flex-column align-items-center align-items-md-start">
            <span className="text-muted-custom">© {new Date().getFullYear()} Tamil Pasanga VTC</span>
            <span className="text-muted-custom" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
              Developed by <a href="https://bavithragithan-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-cyan)', textDecoration: 'none' }}>SK BAVI</a>
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <a href="mailto:tamilpasangavtcofficial@gmail.com" className="text-white text-decoration-none d-flex align-items-center" title="For queries">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
              </svg>
              <span className="d-none d-sm-inline">tamilpasangavtcofficial@gmail.com</span>
              <span className="d-inline d-sm-none">Email Us</span>
            </a>
            <a className="text-white text-decoration-none border-start border-white border-opacity-10 ps-3" href="#">Back to top</a>
          </div>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-4 pt-3 border-top border-white border-opacity-10">
          <div className="d-flex gap-4" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            <Link to="/terms-of-use" className="text-muted-custom text-decoration-none">Terms of Use</Link>
            <Link to="/privacy-policy" className="text-muted-custom text-decoration-none">Privacy Policy</Link>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <a href="https://www.instagram.com/tamil_pasanga_vtc" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="https://www.facebook.com/profile.php?id=61590679895200" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="https://x.com/tamilpasangavtc" target="_blank" rel="noopener noreferrer" className="social-btn" title="Twitter / X">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="https://www.youtube.com/@powerfulgamingtamil" target="_blank" rel="noopener noreferrer" className="social-btn" title="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}


