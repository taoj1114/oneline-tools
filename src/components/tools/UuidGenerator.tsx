import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';
import { RefreshCw } from 'lucide-react';

const UuidGenerator: React.FC = () => {
  const [uuids, setUuids] = useState<string[]>([]);
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState<'v4'>('v4');
  const [copySuccess, setCopySuccess] = useState(false);

  const generateUuids = () => {
    const newUuids = Array.from({ length: count }, () => {
      // Simple v4 UUID generator
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    });
    setUuids(newUuids);
  };

  useEffect(() => {
    generateUuids();
  }, [count]);

  const handleCopy = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="UUID Generator" 
      description="Generate version 4 Universally Unique Identifiers (UUIDs)"
      onReset={generateUuids}
      onCopy={uuids.length > 0 ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem' }}>Count: {count}</label>
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              style={{ accentColor: '#667eea', cursor: 'pointer' }}
            />
          </div>

          <button 
            onClick={generateUuids}
            className="uuid-btn"
          >
            <RefreshCw size={18} style={{ marginRight: '8px' }} />
            Regenerate
          </button>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Result</label>
          <textarea 
            readOnly
            value={uuids.join('\n')}
            style={{ minHeight: '300px', fontSize: '0.95rem' }}
          />
        </div>
      </div>

      <style>{`
        .uuid-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .uuid-btn:hover {
          background: #764ba2;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default UuidGenerator;
