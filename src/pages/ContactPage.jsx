import React, { useEffect } from 'react';
import { MessageSquare, ExternalLink, MapPin } from 'lucide-react';
import './ContactPage.css';

export default function ContactPage() {
  useEffect(() => {
    requestAnimationFrame(() => {
      Array.from(document.querySelectorAll('.animate-fade-in-up')).forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    });
  }, []);

  return (
    <div className="contact-wrapper">
      <div className="contact-container text-center animate-fade-in-up">
        
        <h1 className="contact-title">Contact Tamil Pasanga VTC</h1>
        <div className="mx-auto mb-4" style={{ width: '80px', height: '4px', background: 'var(--accent-cyan)', borderRadius: '2px' }}></div>
        <p className="contact-desc mx-auto">
          Connect with us through our active community channels. Whether you want to join our convoys or just hang out, you are always welcome!
        </p>
          
        <div className="contact-cards-grid mt-5">
          {/* Discord Card */}
          <a href="https://discord.com/invite/FtYBxZxTBF" target="_blank" rel="noreferrer" className="glass-panel contact-card animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <div className="contact-icon-wrapper discord mb-4 mx-auto">
              <MessageSquare size={36} />
            </div>
            <h2 className="card-title">Discord Community</h2>
            <p className="card-text">
              Join our active Discord server for real-time communication, convoy announcements, and community discussions.
            </p>
            <div className="btn-primary mt-4 d-inline-flex">
              Join Discord Server <ExternalLink size={18} />
            </div>
          </a>

          {/* TruckersMP Card */}
          <a href="https://truckersmp.com/vtc/73933-tamil_pasanga" target="_blank" rel="noreferrer" className="glass-panel contact-card animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="contact-icon-wrapper tmp mb-4 mx-auto">
              <MapPin size={36} />
            </div>
            <h2 className="card-title">TruckersMP Profile</h2>
            <p className="card-text">
              Visit our official TruckersMP VTC page to see our latest statistics, member list, and convoy schedules.
            </p>
            <div className="btn-outline mt-4 d-inline-flex">
              View VTC Profile <ExternalLink size={18} />
            </div>
          </a>
        </div>

      </div>
    </div>
  );
}
