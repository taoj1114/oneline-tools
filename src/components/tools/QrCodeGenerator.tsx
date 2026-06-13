import React, { useState, useEffect, useRef } from 'react';
import ToolWrapper from '../ToolWrapper';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';

const QrCodeGenerator: React.FC = () => {
  const [text, setText] = useState('https://oneline.tools');
  const [qrUrl, setQrUrl] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const generateQr = async () => {
    if (!text.trim()) {
      setQrUrl('');
      return;
    }
    try {
      const url = await QRCode.toDataURL(text, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff',
        },
      });
      setQrUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateQr();
  }, [text]);

  const downloadQr = () => {
    const link = document.createElement('a');
    link.download = 'qrcode.png';
    link.href = qrUrl;
    link.click();
  };

  return (
    <ToolWrapper 
      title="QR Code Generator" 
      description="Create customizable QR codes for URLs or text"
      onReset={() => setText('')}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <label style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Content (URL or Text)</label>
          <textarea 
            placeholder="Enter URL or text to encode..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ minHeight: '150px' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
          <div style={{ 
            background: 'white', 
            padding: '16px', 
            borderRadius: '16px', 
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '280px',
            height: '280px'
          }}>
            {qrUrl ? (
              <img src={qrUrl} alt="QR Code" style={{ width: '100%', height: '100%' }} />
            ) : (
              <div style={{ color: '#ccc' }}>Enter text to generate</div>
            )}
          </div>
          
          <button 
            onClick={downloadQr}
            disabled={!qrUrl}
            className="download-btn"
          >
            <Download size={18} style={{ marginRight: '8px' }} />
            Download PNG
          </button>
        </div>
      </div>

      <style>{`
        .download-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          opacity: ${qrUrl ? 1 : 0.5};
        }
        .download-btn:hover {
          background: #764ba2;
          transform: translateY(-2px);
        }
      `}</style>
    </ToolWrapper>
  );
};

export default QrCodeGenerator;
