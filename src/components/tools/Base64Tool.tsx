import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const Base64Tool: React.FC = () => {
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
        setOutput(btoa(input));
      } else {
        setOutput(atob(input));
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

  const handleReset = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  return (
    <ToolWrapper 
      title="Base64 Encoder/Decoder" 
      description="Convert text to Base64 and vice versa"
      onReset={handleReset}
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
            {mode === 'encode' ? 'Normal Text' : 'Base64 Text'}
          </label>
          <textarea 
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter base64 to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ borderColor: error ? '#f56565' : undefined }}
          />
          {error && <p style={{ color: '#f56565', fontSize: '0.8rem' }}>Error: {error}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            {mode === 'encode' ? 'Base64 Result' : 'Text Result'}
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

export default Base64Tool;
