import React from 'react';

export default function TermsOfUse() {
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
        <h1 className="display-4 fw-bold mb-2">Terms of Use</h1>
        <p className="text-muted-custom mb-4">Last Updated: 21/12/2025</p>

        <div className="content-card p-4 p-md-5">
          <p className="lead text-muted-custom mb-5">
            Welcome to Tamil Pasanga VTC (“we,” “us,” “our”). These Terms of Use (“Terms”) govern your access to and use of our website, services, community platforms, and related content (collectively, the “Service”). By accessing or using the Service, you agree to these Terms.
          </p>

          <h3 className="mt-4" style={headerStyle}>Acceptance of Terms</h3>
          <p className="text-muted-custom mb-5">
            By using our Service, you acknowledge that you have read, understood, and agree to be legally bound by these Terms. If you do not agree with any part of these Terms, you must not use the Service.
          </p>

          <h3 className="mt-5" style={headerStyle}>Eligibility</h3>
          <p className="text-muted-custom mb-5">
            You must be at least 13 years old to use this Service. If you are under 18, you must have permission from a parent or legal guardian.
          </p>

          <h3 className="mt-5" style={headerStyle}>Registration & Accounts</h3>
          <p className="text-muted-custom">
            Some features may require an account. You agree to:
          </p>
          <ul className="feature-list mb-4">
            <li style={listDotStyle}>Provide accurate information</li>
            <li style={listDotStyle}>Keep your login credentials secure</li>
            <li style={listDotStyle}>Be responsible for activity under your account</li>
          </ul>
          <p className="text-muted-custom mb-5">
            You must not share or transfer your account to others.
          </p>

          <h3 className="mt-5" style={headerStyle}>User Conduct</h3>
          <p className="text-muted-custom">
            You agree not to:
          </p>
          <ul className="feature-list mb-4">
            <li style={listDotStyle}>Post offensive, abusive, or defamatory content</li>
            <li style={listDotStyle}>Engage in harassment, hate speech, or discriminatory language</li>
            <li style={listDotStyle}>Promote illegal activities</li>
            <li style={listDotStyle}>Cheat, hack, or exploit the game or community</li>
            <li style={listDotStyle}>Impersonate others</li>
          </ul>
          <p className="text-muted-custom mb-5">
            We reserve the right to warn, mute, suspend, or ban users who violate rules.
          </p>

          <h3 className="mt-5" style={headerStyle}>Content</h3>
          <p className="text-muted-custom mb-4">
            You retain ownership of content you post (like text, logos, screenshots), but by posting, you grant Tamil Pasanga VTC a non-exclusive, royalty-free license to use, display, and share it on the Service and promotions.
          </p>
          <p className="text-muted-custom mb-5">
            You represent that you own or have rights to all content you submit.
          </p>

          <h3 className="mt-5" style={headerStyle}>Prohibited Content</h3>
          <p className="text-muted-custom">
            You must not post:
          </p>
          <ul className="feature-list mb-5">
            <li style={listDotStyle}>Copyrighted material without permission</li>
            <li style={listDotStyle}>NSFW, illegal, or harmful content</li>
            <li style={listDotStyle}>Links to malware, phishing, or harmful sites</li>
          </ul>

          <h3 className="mt-5" style={headerStyle}>Privacy</h3>
          <p className="text-muted-custom mb-5">
            Your use of data is governed by our Privacy Policy, which explains what information we collect and how we use it. By using the Service, you agree to that policy.
          </p>

          <h3 className="mt-5" style={headerStyle}>Disclaimers</h3>
          <p className="text-muted-custom mb-5">
            THE SERVICE IS PROVIDED “AS IS” WITHOUT WARRANTIES OF ANY KIND. We do not guarantee that the Service will be uninterrupted, error-free, or secure.
          </p>

          <h3 className="mt-5" style={headerStyle}>Limitation of Liability</h3>
          <p className="text-muted-custom">
            To the maximum extent allowed by law, Tamil Pasanga VTC is not liable for:
          </p>
          <ul className="feature-list mb-5">
            <li style={listDotStyle}>Lost data</li>
            <li style={listDotStyle}>Damages from use of the Service</li>
            <li style={listDotStyle}>In-game or real-world losses</li>
          </ul>

          <h3 className="mt-5" style={headerStyle}>Termination</h3>
          <p className="text-muted-custom mb-5">
            We may suspend or terminate your access at any time for violation of these Terms or for any other reason, with or without notice.
          </p>

          <h3 className="mt-5" style={headerStyle}>Changes to Terms</h3>
          <p className="text-muted-custom mb-5">
            We may update these Terms at any time. The “Last Updated” date at the top will reflect changes. Continued use after updates means you accept the new terms.
          </p>

          <h3 className="mt-5" style={headerStyle}>Governing Law</h3>
          <p className="text-muted-custom mb-5">
            These Terms are governed by the laws of Tamil Nadu, India.
          </p>

          <h3 className="mt-5" style={headerStyle}>Contact Us</h3>
          <p className="text-muted-custom">
            If you have questions about these Terms, contact us:
          </p>
          <ul className="feature-list mb-2">
            <li style={listDotStyle}>📧 Email: <a href="mailto:tamilpasangavtcofficial@gmail.com" className="text-white text-decoration-none hover-accent">tamilpasangavtcofficial@gmail.com</a></li>
            <li style={listDotStyle}>Discord Link: <a href="https://discord.com/invite/FtYBxZxTBF" className="text-white text-decoration-none hover-accent" target="_blank" rel="noopener noreferrer">https://discord.com/invite/FtYBxZxTBF</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
