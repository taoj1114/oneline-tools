import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const [stats, setStats] = useState({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
  });

  useEffect(() => {
    const trimmedText = text.trim();
    const words = trimmedText ? trimmedText.split(/\s+/).length : 0;
    const characters = text.length;
    const charactersNoSpaces = text.replace(/\s+/g, '').length;
    const sentences = trimmedText ? trimmedText.split(/[.!?]+/).filter(Boolean).length : 0;
    const paragraphs = trimmedText ? trimmedText.split(/\n+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(words / 200); // Avg 200 wpm

    setStats({
      words,
      characters,
      charactersNoSpaces,
      sentences,
      paragraphs,
      readingTime,
    });
  }, [text]);

  const handleReset = () => {
    setText('');
  };

  return (
    <ToolWrapper 
      title="Word Counter" 
      description="Real-time text analysis with word, character, and reading time stats"
      onReset={handleReset}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Enter Text</label>
          <textarea 
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: '300px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="stats-container">
            {Object.entries(stats).map(([label, value]) => (
              <div key={label} className="stat-item">
                <span className="stat-label">{label.replace(/([A-Z])/g, ' $1')}</span>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .stats-container {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .stat-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        .stat-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .stat-label {
          color: var(--text-secondary);
          font-size: 0.9rem;
          text-transform: capitalize;
        }
        .stat-value {
          font-weight: bold;
          font-size: 1.1rem;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default WordCounter;
