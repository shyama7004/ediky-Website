import { useSpeechSynthesis } from 'react-speech-kit';
import { useState } from 'react';
import './SpeechReader.css';

export default function SpeechReader() {
  // get speech functions and available voices
  const { speak, cancel, speaking, voices } = useSpeechSynthesis();

  // state: selected voice, rate of speech, and minimized toolbar
  const [voiceIdx, setVoiceIdx] = useState('');
  const [rate, setRate] = useState(1);
  const [minimized, setMinimized] = useState(true);  // default to minimized

  // speak selected text using chosen voice and rate
  const handleSpeak = () => {
    const text = window.getSelection().toString().trim();
    if (!text) return;
    speak({ text, voice: voiceIdx !== '' ? voices[voiceIdx] : null, rate });
  };

  // if minimized, show only the floating tab
  if (minimized) {
    return (
      <div
        className="sr-minimized-pill"
        onClick={() => setMinimized(false)}
        title="Show reader controls"
      >
        Reader
      </div>
    );
  }

  // expanded toolbar with voice, rate, and control buttons
  return (
    <div className="speech-reader">
      {/* dropdown: choose a voice */}
      <select
        className="sr-select"
        value={voiceIdx}
        onChange={e => setVoiceIdx(e.target.value)}
        aria-label="Choose voice"
      >
        <option value="">Default Voice</option>
        {voices.map((v, i) => (
          <option key={v.voiceURI} value={i}>
            {v.name} ({v.lang})
          </option>
        ))}
      </select>

      {/* rate adjustment slider */}
      <input
        className="sr-range"
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={rate}
        onChange={e => setRate(parseFloat(e.target.value))}
        title="Rate"
      />

      {/* speak button */}
      <button
        className="sr-btn"
        onClick={handleSpeak}
        disabled={speaking}  // disable while already speaking
      >
        Speak
      </button>

      {/* stop button */}
      <button
        className="sr-btn"
        onClick={cancel}
        disabled={!speaking}
      >
        Stop
      </button>

      {/* minimize back to pill */}
      <button
        className="sr-btn minimize-btn"
        onClick={() => setMinimized(true)}
      >
        Minimize
      </button>
    </div>
  );
}
