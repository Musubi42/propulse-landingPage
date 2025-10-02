import { ImageResponse } from 'next/og';

// Image metadata
export const alt = 'Propulse - Mentorat gratuit pour lycéens';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 60,
          background: 'linear-gradient(135deg, #FAF6F0 0%, #F5EFE6 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <div
            style={{
              fontSize: 100,
              fontWeight: 'bold',
              color: '#1B3A52',
              fontFamily: 'serif',
              textAlign: 'center',
            }}
          >
            Propulse
          </div>
          <div
            style={{
              fontSize: 50,
              color: '#4A4A4A',
              textAlign: 'center',
              maxWidth: '900px',
            }}
          >
            Mentorat gratuit pour lycéens vers les Grandes Écoles
          </div>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              fontSize: 35,
              color: '#D97642',
              fontWeight: 'bold',
            }}
          >
            <span>100% Gratuit</span>
            <span>•</span>
            <span>100% À Distance</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
