import React from 'react';
import { Copy, RefreshCcw, Check } from 'lucide-react';

interface ToolWrapperProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onReset?: () => void;
  onCopy?: () => void;
  copySuccess?: boolean;
}

const ToolWrapper: React.FC<ToolWrapperProps> = ({ 
  title, 
  description, 
  children, 
  onReset, 
  onCopy,
  copySuccess 
}) => {
  return (
    <div className="tool-view" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{title}</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{description}</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          {onReset && (
            <button 
              onClick={onReset}
              className="action-btn"
              title="Reset"
            >
              <RefreshCcw size={18} />
            </button>
          )}
          {onCopy && (
            <button 
              onClick={onCopy}
              className="action-btn"
              title="Copy Output"
              style={{ background: copySuccess ? '#48bb78' : undefined }}
            >
              {copySuccess ? <Check size={18} /> : <Copy size={18} />}
            </button>
          )}
        </div>
      </div>
      
      <div className="tool-content">
        {children}
      </div>

      <style>{`
        .action-btn {
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          padding: 8px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .action-btn:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .tool-content textarea {
          width: 100%;
          min-height: 200px;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 16px;
          color: white;
          font-family: 'Fira Code', 'Courier New', monospace;
          font-size: 0.9rem;
          resize: vertical;
          outline: none;
        }
        .tool-content textarea:focus {
          border-color: #667eea;
        }
      `}</style>
    </div>
  );
};

export default ToolWrapper;
