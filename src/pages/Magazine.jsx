import React, { useState, useEffect } from 'react';
import { BookOpen } from 'lucide-react';
import config from '../config';
import NewspaperTemplate from '../components/magazine/NewspaperTemplate';

export default function Magazine() {
    const [magazine, setMagazine] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMagazine = async () => {
            try {
                // Fetch the latest published magazine (we get all published and take the first)
                const res = await fetch(`${config.API_BASE_URL}/api/magazines`);
                const data = await res.json();
                
                if (res.ok && data.length > 0) {
                    // Fetch full details of the latest one
                    const latestId = data[0].id;
                    const detailRes = await fetch(`${config.API_BASE_URL}/api/magazines/${latestId}`);
                    const detailData = await detailRes.json();
                    
                    if (detailRes.ok) {
                        setMagazine(detailData);
                    } else {
                        setError('Failed to load magazine details.');
                    }
                } else if (res.ok && data.length === 0) {
                    setError('No magazines have been published yet.');
                } else {
                    setError('Failed to load magazines.');
                }
            } catch (err) {
                console.error(err);
                setError('Server error while loading magazine.');
            } finally {
                setLoading(false);
            }
        };

        fetchMagazine();
    }, []);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                    <div className="spinner-grow text-light" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted-custom fw-bold" style={{ letterSpacing: '2px' }}>LOADING MAGAZINE...</p>
                </div>
            </div>
        );
    }

    if (error || !magazine) {
        return (
            <div className="container py-5 mt-5 text-center">
                <div className="alert alert-dark border-secondary bg-black text-white p-5 rounded-4 shadow-lg">
                    <BookOpen size={48} className="mb-3 text-muted" />
                    <h3 className="fw-bold mb-3">Magazine Unavailable</h3>
                    <p className="text-muted-custom mb-0">{error}</p>
                </div>
            </div>
        );
    }

    const renderTemplate = () => {
        return <NewspaperTemplate news={magazine.news || []} monthYear={magazine.month_year} />;
    };

    return (
        <div className="magazine-page-wrapper pb-5">
            {/* Common Magazine Header */}
            <section className="position-relative py-5 overflow-hidden border-bottom border-secondary" style={{ background: 'var(--card-bg)' }}>
                <div className="position-absolute top-0 start-0 w-100 h-100" style={{ 
                    background: 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05), transparent 70%)',
                    pointerEvents: 'none'
                }}></div>
                <div className="container position-relative z-1 text-center pt-5 pb-3">
                    <span className="badge bg-white text-dark px-3 py-2 rounded-pill mb-3 fw-bold" style={{ letterSpacing: '1px' }}>
                        MONTHLY EDITION
                    </span>
                    <h1 className="display-4 fw-black text-white mb-2 text-uppercase" style={{ letterSpacing: '2px' }}>
                        {magazine.month_year}
                    </h1>
                    <p className="text-muted-custom lead mx-auto" style={{ maxWidth: '600px' }}>
                        Dive into the latest updates, stories, and highlights from Tamil Pasanga VTC.
                    </p>
                </div>
            </section>

            {/* Template Rendering */}
            <div className="magazine-content mt-5">
                {renderTemplate()}
            </div>
        </div>
    );
}
