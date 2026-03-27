import React from 'react';

export default function PrivacyPolicy() {
  const headerStyle = { 
    color: '#fff', 
    borderBottom: '1px solid rgba(255,255,255,0.08)', 
    paddingBottom: '0.75rem', 
    marginBottom: '1.25rem' 
  };
  const listDotStyle = { '--accent': '#fff' };

  return (
    <div className="section-modern py-5" style={{ minHeight: '80vh' }}>
      <div className="container mt-5 pt-4">
        <h1 className="display-4 fw-bold mb-4">Privacy Policy</h1>
        <div className="content-card p-4 p-md-5">
          <p className="lead text-muted-custom mb-5">
            Tamil Pasanga VTC ("we", "our", "us") respects your privacy and is committed to protecting the personal information of our members and visitors.
          </p>
          
          <h3 className="mt-4" style={headerStyle}>Information We Collect</h3>
          <p className="text-muted-custom">
            We may collect the following information:
          </p>
          <ul className="feature-list mb-5">
            <li style={listDotStyle}>Name or username</li>
            <li style={listDotStyle}>Email address</li>
            <li style={listDotStyle}>Discord ID</li>
            <li style={listDotStyle}>TruckersMP ID</li>
            <li style={listDotStyle}>Game-related information (ETS2 / ATS profile details)</li>
          </ul>
          <p className="text-muted-custom mb-5">
            We collect this information only when you voluntarily provide it (for example, during registration or applications).
          </p>

          <h3 className="mt-5" style={headerStyle}>How We Use Your Information</h3>
          <p className="text-muted-custom">
            We use the collected information to:
          </p>
          <ul className="feature-list mb-5">
            <li style={listDotStyle}>Manage VTC membership</li>
            <li style={listDotStyle}>Communicate with members</li>
            <li style={listDotStyle}>Organize events and convoys</li>
            <li style={listDotStyle}>Improve our services and community experience</li>
          </ul>

          <h3 className="mt-5" style={headerStyle}>Data Protection</h3>
          <p className="text-muted-custom mb-5">
            We take reasonable steps to protect your personal data. Your information is not sold, traded, or shared with third parties unless required by law.
          </p>

          <h3 className="mt-5" style={headerStyle}>Cookies</h3>
          <p className="text-muted-custom mb-5">
            Our website may use cookies to improve user experience. Cookies help us understand how visitors use our site. You can disable cookies in your browser settings if you prefer.
          </p>

          <h3 className="mt-5" style={headerStyle}>Third-Party Services</h3>
          <p className="text-muted-custom">
            We may use third-party platforms such as:
          </p>
          <ul className="feature-list mb-4">
            <li style={listDotStyle}>Discord</li>
            <li style={listDotStyle}>TruckersMP</li>
            <li style={listDotStyle}>Google services (for forms or analytics)</li>
          </ul>
          <p className="text-muted-custom mb-5">
            These services have their own privacy policies, and we are not responsible for their practices.
          </p>

          <h3 className="mt-5" style={headerStyle}>Children's Information</h3>
          <p className="text-muted-custom mb-5">
            Tamil Pasanga VTC does not knowingly collect personal information from children under the age required by TruckersMP or applicable laws.
          </p>

          <h3 className="mt-5" style={headerStyle}>Your Consent</h3>
          <p className="text-muted-custom mb-5">
            By using our website or joining Tamil Pasanga VTC, you agree to this Privacy Policy.
          </p>

          <h3 className="mt-5" style={headerStyle}>Changes to This Policy</h3>
          <p className="text-muted-custom mb-5">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page.
          </p>

          <h3 className="mt-5" style={headerStyle}>Contact Us</h3>
          <p className="text-muted-custom">
            If you have any questions about this Privacy Policy, you can contact us via:
          </p>
          <ul className="feature-list mb-2">
            <li style={listDotStyle}>Discord server</li>
            <li style={listDotStyle}>Official Tamil Pasanga VTC communication channels</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
