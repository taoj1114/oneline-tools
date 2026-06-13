import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setError(null);
    } catch (e: any) {
      setError(e.message);
      setOutput('');
    }
  }, [input]);

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
      title="JSON Formatter" 
      description="Prettify or minify JSON data with syntax validation"
      onReset={handleReset}
      onCopy={output ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Input JSON</label>
          <textarea 
            placeholder="Paste your JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            style={{ borderColor: error ? '#f56565' : undefined }}
          />
          {error && <p style={{ color: '#f56565', fontSize: '0.8rem' }}>Error: {error}</p>}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Formatted JSON</label>
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

export default JsonFormatter;
