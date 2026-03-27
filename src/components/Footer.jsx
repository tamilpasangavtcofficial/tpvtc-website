import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer mt-auto py-4 border-top border-secondary">
      <div className="container text-center text-md-start">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-3">
          <span className="text-muted-custom">© {new Date().getFullYear()} Tamil Pasanga VTC</span>
          <div className="d-flex align-items-center gap-3">
            <a href="mailto:tamilpasangavtcofficial@gmail.com" className="text-white text-decoration-none d-flex align-items-center" title="For queries">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="me-2" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
              </svg>
              <span className="d-none d-sm-inline">tamilpasangavtcofficial@gmail.com</span>
              <span className="d-inline d-sm-none">Email Us</span>
            </a>
            <a className="text-white text-decoration-none border-start border-secondary ps-3" href="#">Back to top</a>
          </div>
        </div>
        <div className="d-flex justify-content-center justify-content-md-start gap-4 pt-2 border-top border-secondary" style={{ opacity: 0.8, fontSize: '0.9rem' }}>
          <Link to="/terms-of-use" className="text-muted-custom text-decoration-none">Terms of Use</Link>
          <Link to="/privacy-policy" className="text-muted-custom text-decoration-none">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  )
}


