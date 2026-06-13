import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const UrlEncoder: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input));
      } else {
        setOutput(decodeURIComponent(input));
      }
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  }, [input, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="URL Encoder/Decoder" 
      description="Safely encode or decode characters for use in URLs"
      onReset={() => setInput('')}
      onCopy={output ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
        <button 
          onClick={() => setMode('encode')}
          style={{ 
            background: mode === 'encode' ? '#667eea' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Encode
        </button>
        <button 
          onClick={() => setMode('decode')}
          style={{ 
            background: mode === 'decode' ? '#667eea' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '6px',
            color: 'white',
            cursor: 'pointer'
          }}
        >
          Decode
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {mode === 'encode' ? 'Raw Text' : 'Encoded URL'}
          </label>
          <textarea 
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter URL to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ borderColor: error ? '#f56565' : undefined }}
          />
          {error && <p style={{ color: '#f56565', fontSize: '0.8rem' }}>Error: {error}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {mode === 'encode' ? 'Encoded Result' : 'Decoded Result'}
          </label>
          <textarea 
            readOnly
            placeholder="Result will appear here..."
            value={output}
          />
        </div>
      </div>
    </ToolWrapper>
  );
};

export default UrlEncoder;
