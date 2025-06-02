import React, { useEffect, useState } from 'react';

const gifs = [
  '/loader1.gif',
  '/loader2.gif',
  '/loader3.gif'
];

function Loader({ text }) {
  const [currentGif, setCurrentGif] = useState(gifs[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      let nextGif;
      do {
        nextGif = gifs[Math.floor(Math.random() * gifs.length)];
      } while (nextGif === currentGif);

      setCurrentGif(nextGif);
    }, 700);

    return () => clearInterval(interval);
  }, [currentGif]);

  return (
    <div style={{ textAlign: 'center' }}>
      <img
        src={currentGif}
        alt="Loading..."
        style={{
          width: '120px',
          height: '120px',
          margin: '20px auto',
          display: 'block',
        }}
      />
      {text && (
        <p style={{ fontSize: '1rem', color: '#ff6b81', marginTop: '10px' }}>
          {text}
        </p>
      )}
    </div>
  );
}

export default Loader;
