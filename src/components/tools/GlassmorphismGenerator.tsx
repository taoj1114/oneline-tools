import React, { useState } from 'react';
import ToolWrapper from '../ToolWrapper';

const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(12);
  const [transparency, setTransparency] = useState(0.1);
  const [color, setColor] = useState('#ffffff');
  const [outline, setOutline] = useState(0.2);
  const [copySuccess, setCopySuccess] = useState(false);

  const rgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const cssCode = `background: ${rgba(color, transparency)};
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid ${rgba(color, outline)};
border-radius: 16px;
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="Glassmorphism Generator" 
      description="Create beautiful frosted glass effects and get the CSS code"
      onCopy={handleCopy}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="control-group">
            <label>Blur: {blur}px</label>
            <input type="range" min="0" max="40" value={blur} onChange={(e) => setBlur(parseInt(e.target.value))} />
          </div>
          <div className="control-group">
            <label>Transparency: {transparency.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={transparency} onChange={(e) => setTransparency(parseFloat(e.target.value))} />
          </div>
          <div className="control-group">
            <label>Border Opacity: {outline.toFixed(2)}</label>
            <input type="range" min="0" max="1" step="0.01" value={outline} onChange={(e) => setOutline(parseFloat(e.target.value))} />
          </div>
          <div className="control-group">
            <label>Color</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} style={{ width: '100%', height: '40px', background: 'none', border: 'none', cursor: 'pointer' }} />
          </div>
        </div>

        <div style={{ 
          background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', 
          borderRadius: '20px', 
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          position: 'relative'
        }}>
          <div style={{
            background: rgba(color, transparency),
            backdropFilter: `blur(${blur}px)`,
            WebkitBackdropFilter: `blur(${blur}px)`,
            border: `1px solid ${rgba(color, outline)}`,
            borderRadius: '16px',
            width: '100%',
            height: '150px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
          }}>
            Glass Preview
          </div>
          
          <textarea 
            readOnly 
            value={cssCode}
            style={{ 
              width: '100%', 
              fontSize: '0.8rem', 
              height: '120px', 
              background: 'rgba(0,0,0,0.4)',
              border: 'none',
              color: '#4fd1c5',
              padding: '12px'
            }}
          />
        </div>
      </div>

      <style>{`
        .control-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .control-group label {
          font-size: 0.9rem;
          color: var(--text-secondary);
        }
        input[type="range"] {
          accent-color: #667eea;
          cursor: pointer;
        }
      `}</style>
    </ToolWrapper>
  );
};

export default GlassmorphismGenerator;
