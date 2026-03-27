import React, { useEffect, useState } from 'react';
import { ImageIcon } from 'lucide-react';
import config from '../config';

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${config.API_BASE_URL}/api/images/gallery`)
      .then(r => r.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container py-5 mt-4">
      <div className="text-center mb-5 reveal in">
        <div className="d-inline-flex p-3 rounded-circle bg-accent bg-opacity-10 text-accent mb-3 border border-accent border-opacity-20 shadow-sm">
          <ImageIcon size={32} />
        </div>
        <h1 className="display-5 text-white fw-bold mb-3 tracking-tight">Official <span className="text-accent">Gallery</span></h1>
        <p className="text-muted-custom mx-auto mb-0" style={{ maxWidth: '600px', fontSize: '1.1rem' }}>
          Explore moments from our official convoys and events captured by our media team.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-accent mb-3" role="status"></div>
          <p className="text-muted-custom small tracking-widest text-uppercase">Loading Gallery...</p>
        </div>
      ) : images.length > 0 ? (
        <div className="row g-4 reveal in delay-1">
          {images.map((img) => (
            <div key={img.id} className="col-md-6 col-lg-4">
              <div className="content-card p-0 h-100 overflow-hidden group">
                <img
                  src={img.image_url}
                  alt="Gallery"
                  className="w-100 h-100 object-fit-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ minHeight: '300px' }}
                />
                <div className="position-absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 d-flex align-items-center justify-content-center">
                  <a href={img.image_url} target="_blank" rel="noreferrer" className="btn btn-outline-accent rounded-pill px-4">View HD</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-5">
          <div className="p-5 rounded-4 d-inline-block border border-white border-opacity-10 shadow-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <ImageIcon size={48} className="text-muted-custom mb-3 opacity-50" />
            <h4 className="text-white h5 fw-bold mb-2">Gallery is Empty</h4>
            <p className="text-muted-custom small mb-0">No images have been uploaded to the public gallery yet.</p>
          </div>
        </div>
      )}
    </div>
  );
}
