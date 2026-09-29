import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Gallery',
  description: 'Photo gallery of Sant Complex — exterior, shops, common areas, parking, and interiors.',
};

export default async function GalleryPage() {
  let images: { id: string; url: string; category?: string | null; description?: string | null }[] = [];
  let categories: string[] = [];

  try {
    images = await db.orm.public.GalleryImage.orderBy((i) => i.createdAt.desc()).all() as typeof images;
    categories = Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[];
  } catch {
    images = [];
  }

  return (
    <>
      <div className="page-hero">
        <div className="container text-center">
          <p className="page-hero-eyebrow">Visual Tour</p>
          <h1>Property Gallery</h1>
          <p style={{ margin: '12px auto 0' }}>
            Take a visual tour of Sant Complex, our facilities, and the business environment.
          </p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {images.length === 0 ? (
            <div className="empty-state">
              <h3>Gallery Updates Pending</h3>
              <p>We are currently compiling high-quality photographs of the complex. Please check back soon.</p>
            </div>
          ) : (
            <>
              {categories.length > 0 ? categories.map((cat) => {
                const catImages = images.filter((i) => i.category === cat);
                return (
                  <div key={cat} style={{ marginBottom: '64px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                      <h2 style={{ fontFamily: "'Playfair Display', serif", margin: 0 }}>{cat}</h2>
                      <div style={{ height: '1px', background: 'var(--border)', flex: 1 }}></div>
                    </div>
                    <div className="gallery-grid">
                      {catImages.map((img) => (
                        <div key={img.id} className="gallery-item">
                          <img src={img.url} alt={img.description || cat} loading="lazy" />
                          {img.description && (
                            <div className="gallery-overlay">{img.description}</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }) : (
                <div className="gallery-grid">
                  {images.map((img) => (
                    <div key={img.id} className="gallery-item">
                      <img src={img.url} alt={img.description || 'Sant Complex'} loading="lazy" />
                      {img.description && (
                        <div className="gallery-overlay">{img.description}</div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
