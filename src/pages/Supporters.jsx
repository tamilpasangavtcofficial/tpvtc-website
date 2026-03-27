import { useEffect, useState } from 'react';
import config from '../config';
import { Heart, User, ExternalLink, Calendar, Award, Shield } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Supporters() {
    const [supporters, setSupporters] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/supporters`);
                const data = await res.json();
                setSupporters(Array.isArray(data) ? data : []);
            } catch (e) {
                console.error('Failed to fetch supporters:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchSupporters();
    }, []);

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.reveal'));
        const io = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        elements.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, [supporters]);

    return (
        <div className="pb-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
            {/* Header Section */}
            <section className="py-5 text-center reveal">
                <div className="container py-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4 p-3 rounded-3 bg-white text-black shadow-lg">
                        <Heart size={48} fill="currentColor" />
                    </div>
                    <h1 className="display-4 fw-bold mb-3 text-white accent-glow">Our Supporters</h1>
                    <p className="lead text-muted-custom mx-auto mb-5" style={{ maxWidth: '700px' }}>
                        Honoring the dedicated individuals who contribute to our community's growth and success. Every contribution helps us build a better experience for all drivers.
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                        <div className="badge bg-white text-black px-4 py-2 rounded-pill fw-bold small shadow-lg">OFFICIAL PATRONS</div>
                        <div className="badge border border-white border-opacity-20 text-white px-4 py-2 rounded-pill fw-bold small">COMMUNITY HEROES</div>
                    </div>
                </div>
            </section>

            {/* Supporters Grid */}
            <section className="py-5 bg-black bg-opacity-20 border-top border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-accent mb-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-muted-custom small">Synchronizing supporter gallery...</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {supporters.map((s, idx) => (
                                <div key={s.id} className="col-md-6 col-lg-4 reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="supporter-card card-with-bg p-5 h-100 border border-white border-opacity-10 transition-all hover:scale-105" 
                                        style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)' }}>
                                        <div className="d-flex align-items-start justify-content-between mb-4">
                                            <div className="p-2 bg-white text-black rounded-3 shadow-lg d-flex align-items-center justify-content-center" style={{ width: '64px', height: '64px' }}>
                                                <img src={logo} alt="VTC Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                            </div>
                                            <Award size={24} className="text-white opacity-50" />
                                        </div>
                                        
                                        <h3 className="h5 fw-bold text-white mb-2">{s.name}</h3>
                                        <div className="d-flex align-items-center gap-2 mb-4 small text-muted-custom">
                                            <Shield size={14} className="text-white opacity-70" />
                                            <span>Member Since {new Date(s.created_at).toLocaleDateString()}</span>
                                        </div>

                                        <div className="border-top border-white border-opacity-5 pt-4 mt-auto">
                                            <div className="d-flex flex-column gap-3">
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <span className="x-small text-muted-custom fw-bold text-uppercase tracking-widest">ID Reference</span>
                                                    <code className="text-white small bg-white bg-opacity-10 px-2 py-1 rounded">#{s.truckersmp_id || 'N/A'}</code>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {supporters.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <p className="text-muted-custom opacity-50 italic lead mb-0">Our supporter list is currently being updated.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
