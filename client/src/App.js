import React, { useState } from 'react';
import './styles.css';
import Loader from './Loader';

function App() {
  const [complaint, setComplaint] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const popSound = new Audio('/sounds/bubble_pop.mp3');
  const okidoki = new Audio('/sounds/okidoki.mp3');

  const handleSubmit = async (e) => {
    e.preventDefault();
    popSound.currentTime = 0;
    popSound.play();

    setModalOpen(true);    // Open modal immediately
    setLoading(true);      // Show loader inside modal
    setModalMessage('');   // Clear previous message

    try {
      const res = await fetch('https://mood-mailbox.onrender.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ complaint }),
      });

      const text = await res.text();
      setModalMessage(text);  // Show success message in modal
      setLoading(false);      // Hide loader
      if (res.ok) {
        setComplaint('');     // Clear textarea only on success
      }
    } catch (err) {
      setModalMessage('Error sending mood mail');
      setLoading(false);
    }
  };

  const closeModal = () => {
    okidoki.currentTime = 0.4;
    okidoki.play();
    setModalOpen(false);
    setModalMessage('');
    setLoading(false);
  };
  const generateBubbles = () => {
  const bubbles = [];
  for (let i = 0; i < 20; i++) {
    const direction = ['top', 'left', 'right', 'bottom'][Math.floor(Math.random() * 4)];
    bubbles.push(
      <div
        key={i}
        className={`bubble ${direction}`}
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDuration: `${5 + Math.random() * 5}s`,
          animationDelay: `${Math.random() * 3}s`,
          transform: `scale(${0.5 + Math.random()})`,
        }}
      />
    );
  }
  return bubbles;
};

  return (
    <>
    <div className="background-container"></div>
    <div className="background-overlay"></div>
    <div className="bubble-container">{generateBubbles()}</div>
    <div className="container">

      <h1 className="title">💌 Mood Mailbox</h1>
      <form onSubmit={handleSubmit} className="form">
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Write your mood or complaint here..."
          className="textarea"
          required
        ></textarea>
        <button type="submit" className="button">Send</button>
      </form>

      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal">
            {loading ? (
               <Loader text="Sending it to Booboo 💖" />
            ) : (
              <>
                <p>{modalMessage}</p>
                <button onClick={closeModal} className="button okay-button">OK</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
    </>
  );
  
}

export default App;
