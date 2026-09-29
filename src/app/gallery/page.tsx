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
    images = await db.orm.public.GalleryImage.all({ orderBy: [{ createdAt: 'desc' }] }) as typeof images;
    categories = Array.from(new Set(images.map((i) => i.category).filter(Boolean))) as string[];
  } catch {
    images = [];
  }

  return (
    <>
      <section style={{ background: 'var(--primary)', padding: '4rem 0 3rem' }}>
        <div className="container text-center">
          <h1 style={{ color: '#fff', fontSize: '2.75rem' }}>Gallery</h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginTop: '.75rem' }}>
            A look inside Sant Complex
          </p>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          {images.length === 0 ? (
            <div className="empty-state" style={{ padding: '6rem 2rem' }}>
              <div className="icon">📸</div>
              <h3>Photos coming soon</h3>
              <p>Gallery images will be added shortly.</p>
            </div>
          ) : (
            <>
              {/* Show by category */}
              {categories.length > 0 ? categories.map((cat) => {
                const catImages = images.filter((i) => i.category === cat);
                return (
                  <div key={cat} style={{ marginBottom: '3rem' }}>
                    <h2 style={{ marginBottom: '1.25rem', color: 'var(--primary)' }}>{cat}</h2>
                    <div className="gallery-grid">
                      {catImages.map((img) => (
                        <div key={img.id} className="gallery-item">
                          <img src={img.url} alt={img.description || cat} loading="lazy" />
                          {img.description && (
                            <div className="gallery-item-overlay">{img.description}</div>
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
                        <div className="gallery-item-overlay">{img.description}</div>
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
