import Link from 'next/link';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Premium Commercial Hub in <br/>Jandiala Manjki</h1>
          <p>Discover established businesses and available commercial spaces at Sant Complex, ideally located on Goraya Road.</p>
          <div className="hero-buttons">
            <Link href="/businesses" className="btn btn-primary">View Businesses</Link>
            <Link href="/spaces" className="btn btn-outline">Spaces Available</Link>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '6rem 2rem' }}>
        <h2 className="text-center" style={{ fontSize: '2.5rem' }}>Why Choose Sant Complex?</h2>
        <p className="text-center text-muted" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          We provide a professional environment for your business to thrive, with excellent facilities and a prime location.
        </p>

        <div className="card-grid">
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Prime Location</h3>
              <p className="text-muted">Situated on the bustling Goraya Road, ensuring high visibility and foot traffic for your business.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Established Community</h3>
              <p className="text-muted">Join a thriving network of successful businesses already operating within the complex.</p>
            </div>
          </div>
          <div className="card">
            <div className="card-content">
              <h3 className="card-title">Ample Parking</h3>
              <p className="text-muted">Dedicated parking spaces for business owners and visitors, ensuring convenience for everyone.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
