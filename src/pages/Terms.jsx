import { Link } from 'react-router-dom'

export default function Terms() {
  return (
    <div style={{ minHeight: '100vh', background: '#f5f3ff', fontFamily: "'Inter', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Navbar */}
      <nav style={{ background: '#fff', borderBottom: '1px solid #e9d5ff', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px', boxShadow: '0 2px 12px rgba(88,28,135,0.08)', position: 'sticky', top: 0, zIndex: 100 }}>
        <Link to="/">
          <div style={{ fontSize: '22px', fontWeight: '800', color: '#581c87' }}>
            IFIX<span style={{ color: '#1e0a3c' }}>Computers</span>
          </div>
        </Link>
        <Link to="/">
          <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 20px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
            Back to Home
          </button>
        </Link>
      </nav>

      {/* Header */}
      <div style={{ background: 'linear-gradient(135deg, #1e0a3c 0%, #3b0764 100%)', padding: '48px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#a78bfa', fontWeight: '700', letterSpacing: '3px', textTransform: 'uppercase', marginBottom: '10px' }}>Legal</p>
        <h1 style={{ fontSize: '40px', fontWeight: '800', color: '#fff', marginBottom: '10px' }}>Terms & Conditions</h1>
        <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)' }}>Last updated: June 2025</p>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '820px', margin: '0 auto', padding: '48px 24px' }}>

        {/* Placeholder Notice */}
        <div style={{ background: '#fef3c7', border: '1px solid #fcd34d', borderRadius: '10px', padding: '16px 20px', marginBottom: '36px', fontSize: '13px', color: '#92400e' }}>
          Note: These terms will be updated with final content provided by IFIX Computers.
        </div>

        {[
          {
            title: '1. Introduction',
            content: 'Welcome to IFIX Computers. By accessing and using our website, you accept and agree to be bound by these Terms and Conditions. Please read them carefully before making any purchase.'
          },
          {
            title: '2. Products',
            content: 'IFIX Computers sells both new and second-hand computer parts and accessories. All products are described accurately on the website. Second-hand products may show signs of use and come with limited warranty as specified on the product listing.'
          },
          {
            title: '3. Pricing',
            content: 'All prices are listed in Indian Rupees (Rs.). Prices are subject to change without prior notice. Final prices will be confirmed at the time of order via WhatsApp or email.'
          },
          {
            title: '4. Orders & Payment',
            content: 'Orders are placed by contacting us via WhatsApp or email after adding products to cart. Payment terms will be discussed and confirmed before dispatch. We accept cash, UPI, and bank transfers.'
          },
          {
            title: '5. Warranty',
            content: 'New products come with manufacturer warranty as specified. Second-hand products come with a limited warranty of 3 months unless stated otherwise. Warranty does not cover physical damage, liquid damage, or misuse.'
          },
          {
            title: '6. Returns & Refunds',
            content: 'Products can be returned within 7 days of purchase if they are found to be defective or not as described. The product must be in its original condition. Refunds will be processed within 7 working days after inspection.'
          },
          {
            title: '7. Delivery',
            content: 'We deliver across Delhi NCR. Delivery charges, if any, will be communicated at the time of order confirmation. Delivery timelines depend on product availability and location.'
          },
          {
            title: '8. Privacy',
            content: 'We respect your privacy. Your personal information shared with us (name, phone, email) will only be used for order processing and communication. We do not share your data with third parties.'
          },
          {
            title: '9. Limitation of Liability',
            content: 'IFIX Computers is not responsible for any indirect or consequential damages arising from the use of our products. Our liability is limited to the purchase price of the product.'
          },
          {
            title: '10. Contact Us',
            content: 'For any questions regarding these Terms & Conditions, please contact us at admin@ifixcomputers.com or call +91 98765 43210. We are available Monday to Saturday, 10am to 7pm.'
          },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: i < 9 ? '1px solid #e9d5ff' : 'none' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e0a3c', marginBottom: '12px' }}>{section.title}</h2>
            <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.8' }}>{section.content}</p>
          </div>
        ))}

        <div style={{ background: '#faf5ff', border: '1.5px solid #e9d5ff', borderRadius: '12px', padding: '24px', textAlign: 'center', marginTop: '16px' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>Have questions about our terms?</p>
          <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer">
            <button style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '8px', padding: '12px 28px', fontWeight: '700', fontSize: '14px', cursor: 'pointer' }}>
              Contact Us
            </button>
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{ background: '#0a0118', borderTop: '1px solid #1e0a3c', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '20px', fontWeight: '800', color: '#fff' }}>
          IFIX<span style={{ color: '#a78bfa' }}>Computers</span>
        </div>
        <div style={{ fontSize: '12px', color: '#4b5563' }}>2025 IFIX Computers, Delhi. All rights reserved</div>
        <Link to="/terms"><div style={{ fontSize: '12px', color: '#a78bfa', cursor: 'pointer' }}>Terms & Conditions</div></Link>
      </div>
    </div>
  )
}