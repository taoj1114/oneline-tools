import React, { useState } from 'react';
import ToolWrapper from '../ToolWrapper';
import { Send, Loader2 } from 'lucide-react';

const AiRegexGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<{ regex: string; explanation: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);

  const generateRegex = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/ai/regex', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) throw new Error('Failed to generate regex');

      const data = await response.json();
      setResult(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result.regex);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  return (
    <ToolWrapper 
      title="AI Regex Generator" 
      description="Describe the pattern you want to match in natural language, and AI will generate the Regex."
      onReset={() => { setPrompt(''); setResult(null); }}
      onCopy={result ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <input 
            type="text" 
            placeholder="e.g., Match a valid email address or Match dates in YYYY-MM-DD format"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && generateRegex()}
            className="ai-input"
          />
          <button 
            onClick={generateRegex}
            disabled={loading || !prompt.trim()}
            className="ai-btn"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
          </button>
        </div>

        {error && (
          <div style={{ padding: '12px', background: 'rgba(245, 101, 101, 0.1)', color: '#f56565', borderRadius: '8px', fontSize: '0.9rem' }}>
            {error}
          </div>
        )}

        {result && (
          <div className="ai-result animate-scale-up">
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Regex Pattern</label>
              <div className="regex-box">{result.regex}</div>
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Explanation</label>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>{result.explanation}</p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .ai-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 20px;
          color: white;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .ai-input:focus {
          border-color: #667eea;
        }
        .ai-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 0 20px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ai-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .ai-btn:not(:disabled):hover {
          background: #764ba2;
          transform: translateY(-2px);
        }
        .ai-result {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 24px;
        }
        .regex-box {
          font-family: monospace;
          background: rgba(0, 0, 0, 0.3);
          padding: 16px;
          border-radius: 8px;
          color: #818cf8;
          font-size: 1.1rem;
          word-break: break-all;
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </ToolWrapper>
  );
};

export default AiRegexGenerator;
