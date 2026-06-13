import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const PRESETS = [
  { name: 'Email Address', regex: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', description: 'Matches standard email formats' },
  { name: 'URL', regex: '^(https?:\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .-]*)*\\/?$', description: 'Matches web URLs (http/https)' },
  { name: 'Phone Number (Intl)', regex: '^\\+?[1-9]\\d{1,14}$', description: 'Matches international E.164 phone numbers' },
  { name: 'IPv4 Address', regex: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', description: 'Matches standard IPv4 addresses' },
  { name: 'Date (YYYY-MM-DD)', regex: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$', description: 'Matches dates in YYYY-MM-DD format' },
  { name: 'Strong Password', regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', description: 'Min 8 chars, one uppercase, one lowercase, one number, one special char' },
  { name: 'Numbers Only', regex: '^\\d+$', description: 'Matches a string containing only digits' },
  { name: 'Alphanumeric', regex: '^[a-zA-Z0-9]+$', description: 'Letters and numbers only' },
];

const RegexGenerator: React.FC = () => {
  const [selectedRegex, setSelectedRegex] = useState(PRESETS[0].regex);
  const [customRegex, setCustomRegex] = useState('');
  const [flags, setFlags] = useState({ g: true, i: false, m: false });
  const [testText, setTestText] = useState('');
  const [matches, setMatches] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState(false);

  const currentRegex = customRegex || selectedRegex;

  useEffect(() => {
    if (!testText || !currentRegex) {
      setMatches([]);
      return;
    }

    try {
      const flagStr = (flags.g ? 'g' : '') + (flags.i ? 'i' : '') + (flags.m ? 'm' : '');
      const re = new RegExp(currentRegex, flagStr);
      const found = testText.match(re);
      setMatches(found ? Array.from(found) : []);
    } catch (e) {
      setMatches([]);
    }
  }, [testText, currentRegex, flags]);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentRegex);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="Regex Builder & Library" 
      description="Select from common patterns or build your own, then test it in real-time."
      onCopy={handleCopy}
      copySuccess={copySuccess}
      onReset={() => { setCustomRegex(''); setSelectedRegex(PRESETS[0].regex); setTestText(''); }}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Common Presets</label>
            <div className="preset-grid">
              {PRESETS.map(p => (
                <button 
                  key={p.name}
                  onClick={() => { setSelectedRegex(p.regex); setCustomRegex(''); }}
                  className={`preset-btn ${selectedRegex === p.regex && !customRegex ? 'active' : ''}`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Flags</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              {Object.entries(flags).map(([f, active]) => (
                <label key={f} className="flag-toggle">
                  <input 
                    type="checkbox" 
                    checked={active} 
                    onChange={() => setFlags(prev => ({ ...prev, [f]: !active }))}
                  />
                  <span>{f === 'g' ? 'Global' : f === 'i' ? 'Ignore Case' : 'Multiline'}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Regex Pattern</label>
            <input 
              type="text" 
              value={currentRegex}
              onChange={(e) => setCustomRegex(e.target.value)}
              className="regex-input"
              placeholder="Enter custom regex or select a preset..."
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Test Area</label>
            <textarea 
              placeholder="Enter text to test the regex against..."
              value={testText}
              onChange={(e) => setTestText(e.target.value)}
              style={{ minHeight: '120px' }}
            />
          </div>

          <div className="match-result">
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Matches Found: <span style={{ color: matches.length > 0 ? '#48bb78' : '#f56565', fontWeight: 'bold' }}>{matches.length}</span>
            </div>
            <div className="matches-list">
              {matches.map((m, i) => (
                <span key={i} className="match-tag">{m}</span>
              ))}
              {matches.length === 0 && testText && <span style={{ fontSize: '0.85rem', opacity: 0.5 }}>No matches found in text</span>}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .preset-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }
        .preset-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: white;
          padding: 8px;
          border-radius: 6px;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
        }
        .preset-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .preset-btn.active {
          background: #667eea;
          border-color: #667eea;
        }
        .regex-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 8px;
          padding: 12px;
          color: #818cf8;
          font-family: monospace;
          font-size: 1.1rem;
          outline: none;
        }
        .flag-toggle {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          cursor: pointer;
          color: var(--text-secondary);
        }
        .match-result {
          background: rgba(0,0,0,0.2);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .matches-list {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .match-tag {
          background: rgba(72, 187, 120, 0.2);
          color: #48bb78;
          border: 1px solid rgba(72, 187, 120, 0.3);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          font-size: 0.8rem;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default RegexGenerator;
