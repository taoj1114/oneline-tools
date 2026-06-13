import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit', 'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore', 'magna', 'aliqua', 'ut', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation', 'ullamco', 'laboris', 'nisi', 'ut', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'in', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

const LoremIpsum: React.FC = () => {
  const [type, setType] = useState<'paragraphs' | 'sentences' | 'words'>('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const generate = () => {
    let result = '';
    
    if (type === 'words') {
      result = Array.from({ length: count }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(' ');
    } else if (type === 'sentences') {
      result = Array.from({ length: count }, () => {
        const len = Math.floor(Math.random() * 10) + 5;
        const sentence = Array.from({ length: len }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(' ');
        return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
      }).join(' ');
    } else {
      result = Array.from({ length: count }, () => {
        const sentenceCount = Math.floor(Math.random() * 3) + 3;
        return Array.from({ length: sentenceCount }, () => {
          const len = Math.floor(Math.random() * 10) + 5;
          const sentence = Array.from({ length: len }, () => LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]).join(' ');
          return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.';
        }).join(' ');
      }).join('\n\n');
    }

    setOutput(result);
  };

  useEffect(() => {
    generate();
  }, [type, count]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="Lorem Ipsum Generator" 
      description="Generate placeholder text for your designs or prototypes"
      onReset={() => { setType('paragraphs'); setCount(3); }}
      onCopy={output ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem' }}>Type</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as any)}
              className="lorem-select"
            >
              <option value="paragraphs">Paragraphs</option>
              <option value="sentences">Sentences</option>
              <option value="words">Words</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '0.9rem' }}>Count: {count}</label>
            <input 
              type="range" 
              min="1" 
              max={type === 'words' ? 200 : 20} 
              value={count} 
              onChange={(e) => setCount(parseInt(e.target.value))}
              style={{ accentColor: '#667eea', cursor: 'pointer' }}
            />
          </div>

          <button 
            onClick={generate}
            className="lorem-btn"
          >
            Regenerate
          </button>
        </div>

        <div>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px', display: 'block' }}>Output</label>
          <textarea 
            readOnly
            value={output}
            style={{ minHeight: '300px' }}
          />
        </div>
      </div>

      <style>{`
        .lorem-select {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 10px;
          color: white;
          cursor: pointer;
        }
        .lorem-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
        }
        .lorem-btn:hover {
          background: #764ba2;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default LoremIpsum;
