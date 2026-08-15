import React, { useEffect, useState } from 'react';
import config from '../config';
import { Handshake, ExternalLink } from 'lucide-react';
import logo from '../assets/logo.svg';

export default function Partners() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [tmpData, setTmpData] = useState({}); // { partnerId: { logo, name } }

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch(`${config.API_BASE_URL}/api/partners`);
                const data = await res.json();
                
                if (Array.isArray(data)) {
                    setPartners(data);
                    
                    // Fetch TMP data for all partners in parallel
                    const tmpObj = {};
                    const promises = data.map(async (p) => {
                        if (p.vtc_link) {
                            const match = p.vtc_link.match(/\/vtc\/(\d+)/);
                            if (match && match[1]) {
                                const vtcId = match[1];
                                try {
                                    const tmpRes = await fetch(`https://api.truckersmp.com/v2/vtc/${vtcId}`);
                                    const tmpJson = await tmpRes.json();
                                    if (!tmpJson.error && tmpJson.response) {
                                        tmpObj[p.id] = tmpJson.response;
                                    }
                                } catch (err) {
                                    console.error('Failed to fetch TMP data for partner', p.id);
                                }
                            }
                        }
                    });
                    
                    await Promise.all(promises);
                    setTmpData(tmpObj);
                } else {
                    setPartners([]);
                }
            } catch (e) {
                console.error('Failed to fetch partners:', e);
            } finally {
                setLoading(false);
            }
        };
        fetchPartners();
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
    }, [partners, loading]);

    return (
        <div className="pb-5" style={{ minHeight: '80vh', paddingTop: '100px' }}>
            <section className="py-5 text-center reveal">
                <div className="container py-4">
                    <div className="d-inline-flex align-items-center justify-content-center mb-4 p-3 rounded-3 bg-white text-black shadow-lg">
                        <Handshake size={48} fill="currentColor" />
                    </div>
                    <h1 className="display-4 fw-bold mb-3 text-white accent-glow">Our Partners</h1>
                    <p className="lead text-muted-custom mx-auto mb-5" style={{ maxWidth: '700px' }}>
                        We are proud to collaborate with some of the best Virtual Trucking Companies and communities globally. Together, we make the virtual roads more exciting.
                    </p>
                </div>
            </section>

            <section className="py-5 bg-black bg-opacity-20 border-top border-bottom" style={{ borderColor: 'rgba(255,255,255,0.05) !important' }}>
                <div className="container">
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-accent mb-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-muted-custom small">Synchronizing partner gallery...</p>
                        </div>
                    ) : (
                        <div className="row g-5">
                            {partners.map((p, idx) => {
                                const partnerTmp = tmpData[p.id];
                                const displayImage = p.image_url || partnerTmp?.logo || logo;
                                
                                return (
                                <div key={p.id} className="col-lg-6 reveal" style={{ transitionDelay: `${idx * 100}ms` }}>
                                    <div className="supporter-card card-with-bg p-5 h-100 border border-white border-opacity-10 transition-all hover:scale-105" 
                                        style={{ background: 'rgba(255, 255, 255, 0.02)', backdropFilter: 'blur(20px)' }}>
                                        
                                        <div className="d-flex align-items-center justify-content-between mb-4 pb-4 border-bottom border-white border-opacity-10">
                                            <div className="d-flex align-items-center gap-4">
                                                <div className="bg-white p-2 rounded-3 shadow-lg d-flex align-items-center justify-content-center overflow-hidden" style={{ width: '80px', height: '80px' }}>
                                                    <img src={displayImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                                </div>
                                                <div>
                                                    <h3 className="h4 fw-bold text-white mb-2">{p.name}</h3>
                                                    <span className="badge bg-white text-black fw-bold px-3 py-1 shadow-sm">{p.partner_type}</span>
                                                </div>
                                            </div>
                                            {p.vtc_link && (
                                                <a href={p.vtc_link} target="_blank" rel="noreferrer" className="btn btn-outline-accent d-flex align-items-center justify-content-center transition-all hover-scale" style={{ width: '48px', height: '48px', borderRadius: '50%' }}>
                                                    <ExternalLink size={20} />
                                                </a>
                                            )}
                                        </div>
                                        
                                        <div className="text-muted-custom mb-0" style={{ whiteSpace: 'pre-line', lineHeight: '1.8' }}>
                                            {p.description}
                                        </div>
                                    </div>
                                </div>
                            )})}
                            
                            {partners.length === 0 && (
                                <div className="col-12 text-center py-5">
                                    <p className="text-muted-custom opacity-50 italic lead mb-0">Our partner list is currently being updated.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
