import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const generateHashes = async (text: string) => {
    if (!text) {
      setHashes({ 'SHA-1': '', 'SHA-256': '', 'SHA-384': '', 'SHA-512': '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const result: any = {};

    for (const algo of Object.keys(hashes)) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      result[algo] = hashHex;
    }

    setHashes(result);
  };

  useEffect(() => {
    generateHashes(input);
  }, [input]);

  const handleCopy = (text: string, algo: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(algo);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <ToolWrapper 
      title="Hash Generator" 
      description="Generate secure cryptographic hashes (SHA-1, SHA-256, SHA-512) using Web Crypto API"
      onReset={() => setInput('')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input Text</label>
          <textarea 
            placeholder="Enter text to hash..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ minHeight: '120px' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="hash-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: '#818cf8' }}>{algo}</span>
                <button 
                  onClick={() => handleCopy(hash, algo)}
                  className={`mini-copy-btn ${copySuccess === algo ? 'success' : ''}`}
                >
                  {copySuccess === algo ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <div className="hash-value">{hash || '...'}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hash-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 12px 16px;
        }
        .hash-value {
          font-family: monospace;
          font-size: 0.9rem;
          word-break: break-all;
          color: var(--text-secondary);
        }
        .mini-copy-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s;
        }
        .mini-copy-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          color: white;
        }
        .mini-copy-btn.success {
          background: #48bb78;
          color: white;
          border-color: #48bb78;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default HashGenerator;
