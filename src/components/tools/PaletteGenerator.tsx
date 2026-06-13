import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';
import { RefreshCw } from 'lucide-react';

const PaletteGenerator: React.FC = () => {
  const [palette, setPalette] = useState<string[]>([]);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);

  const generatePalette = () => {
    const newPalette = Array.from({ length: 5 }, () => {
      const hex = Math.floor(Math.random() * 16777215).toString(16);
      return `#${hex.padStart(6, '0')}`;
    });
    setPalette(newPalette);
  };

  useEffect(() => {
    generatePalette();
  }, []);

  const handleCopy = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopySuccess(hex);
    setTimeout(() => setCopySuccess(null), 2000);
  };

  return (
    <ToolWrapper 
      title="Palette Generator" 
      description="Random color palette generator for your design inspiration"
      onReset={generatePalette}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', height: '300px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
          {palette.map((color, index) => (
            <div 
              key={index}
              className="color-swatch"
              style={{ background: color, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center', padding: '20px', cursor: 'pointer' }}
              onClick={() => handleCopy(color)}
            >
              <span className="hex-label">{copySuccess === color ? 'Copied!' : color.toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <button 
            onClick={generatePalette}
            className="generate-btn"
          >
            <RefreshCw size={18} style={{ marginRight: '8px' }} />
            Generate New Palette
          </button>
        </div>
      </div>

      <style>{`
        .color-swatch {
          transition: transform 0.2s, flex 0.3s;
        }
        .color-swatch:hover {
          transform: scaleY(1.05);
          flex: 1.2;
          z-index: 1;
        }
        .hex-label {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          padding: 6px 12px;
          border-radius: 20px;
          font-family: monospace;
          font-weight: bold;
          font-size: 0.9rem;
          color: white;
          text-shadow: 0 1px 2px rgba(0,0,0,0.3);
        }
        .generate-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          display: inline-flex;
          align-items: center;
        }
        .generate-btn:hover {
          background: #764ba2;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(118, 75, 162, 0.4);
        }
      `}</style>
    </ToolWrapper>
  );
};

export default PaletteGenerator;
