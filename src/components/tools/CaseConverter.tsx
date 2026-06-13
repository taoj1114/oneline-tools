import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const CaseConverter: React.FC = () => {
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const convert = (type: string) => {
    switch (type) {
      case 'upper': setOutput(text.toUpperCase()); break;
      case 'lower': setOutput(text.toLowerCase()); break;
      case 'title': setOutput(text.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase())); break;
      case 'sentence': setOutput(text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()); break;
      case 'camel': setOutput(text.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => index === 0 ? word.toLowerCase() : word.toUpperCase()).replace(/\s+/g, '')); break;
      case 'snake': setOutput(text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)?.map(x => x.toLowerCase()).join('_') || ''); break;
      default: setOutput(text);
    }
  };

  useEffect(() => {
    setOutput(text);
  }, [text]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="Case Converter" 
      description="Transform text between different letter cases (UPPER, lower, camelCase, snake_case)"
      onReset={() => setText('')}
      onCopy={output ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        {[
          { label: 'UPPERCASE', id: 'upper' },
          { label: 'lowercase', id: 'lower' },
          { label: 'Title Case', id: 'title' },
          { label: 'Sentence case', id: 'sentence' },
          { label: 'camelCase', id: 'camel' },
          { label: 'snake_case', id: 'snake' }
        ].map(btn => (
          <button 
            key={btn.id}
            onClick={() => convert(btn.id)}
            className="convert-btn"
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <textarea 
          placeholder="Enter text to convert..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <textarea 
          readOnly
          placeholder="Result will appear here..."
          value={output}
        />
      </div>

      <style>{`
        .convert-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 0.85rem;
        }
        .convert-btn:hover {
          background: #667eea;
          border-color: #667eea;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default CaseConverter;
