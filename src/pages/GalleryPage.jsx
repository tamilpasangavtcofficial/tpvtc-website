import React, { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import config from '../config';
import './GalleryPage.css';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const CACHE_KEY = 'tpvtc_gallery_cache';
    const cachedData = localStorage.getItem(CACHE_KEY);
    if (cachedData) {
      const { data, timestamp } = JSON.parse(cachedData);
      if (Date.now() - timestamp < 1800000) { // 30 mins
        setImages(data);
        setLoading(false);
        return;
      }
    }

    fetch(`${config.API_BASE_URL}/api/images/gallery`)
      .then(r => r.json())
      .then(data => {
        setImages(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="gallery-wrapper">
      <div className="gallery-header animate-fade-in-up">
        <div className="d-inline-flex p-3 rounded-circle bg-white text-black mb-3 shadow-lg">
          <ImageIcon size={32} />
        </div>
        <h1 className="gallery-title tracking-tight">Our Gallery</h1>
        <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.2rem' }}>
          Explore moments from our official convoys and events captured by our media team.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5 mt-5">
          <div className="spinner-border text-accent mb-3" role="status"></div>
          <p className="text-muted-custom small tracking-widest text-uppercase">Loading Gallery...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="masonry-grid animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          {images.map((img) => (
            <div key={img.id} className="gallery-item">
              <img
                src={img.image_url}
                alt="Gallery"
                className="gallery-img"
              />
              <div className="gallery-overlay">
                <a href={img.image_url} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: '8px 20px' }}>
                  View HD
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5 mt-5">
          <div className="glass-panel p-5 d-inline-block shadow-lg">
            <ImageIcon size={48} className="text-white mb-4 opacity-50 mx-auto" />
            <h4 className="text-white h5 fw-bold mb-2">Gallery is Empty</h4>
            <p className="text-muted-custom small mb-0">No images have been uploaded to the public gallery yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
