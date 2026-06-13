import React, { useState } from 'react';
import ToolWrapper from '../ToolWrapper';

const MarkdownPreview: React.FC = () => {
  const [text, setText] = useState('# Hello Markdown\n\nEdit this text to see the **preview**.\n\n- Lists\n- Links [OneLine Tools](https://oneline.tools)\n- Code snippets\n\n```js\nconsole.log("Hello Edge!");\n```');

  return (
    <ToolWrapper 
      title="Markdown Preview" 
      description="Write Markdown and see the rendered HTML in real-time"
      onReset={() => setText('')}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', height: '500px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Markdown Input</label>
          <textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ flex: 1, height: '100%' }}
            placeholder="Enter markdown..."
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Preview</label>
          <div className="markdown-body">
            {/* Minimal basic markdown rendering without a heavy library for demo purposes */}
            {text.split('\n').map((line, i) => {
              if (line.startsWith('# ')) return <h1 key={i}>{line.substring(2)}</h1>;
              if (line.startsWith('## ')) return <h2 key={i}>{line.substring(3)}</h2>;
              if (line.startsWith('- ')) return <li key={i}>{line.substring(2)}</li>;
              if (line.startsWith('```')) return null; // Skip code fences in this simple view
              return <p key={i}>{line}</p>;
            })}
          </div>
        </div>
      </div>

      <style>{`
        .markdown-body {
          flex: 1;
          background: white;
          color: #24292e;
          border-radius: 12px;
          padding: 24px;
          overflow-y: auto;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
        }
        .markdown-body h1 { border-bottom: 1px solid #eaecef; padding-bottom: .3em; margin-top: 0; }
        .markdown-body p { margin-top: 0; margin-bottom: 16px; }
        .markdown-body li { margin-left: 20px; }
      `}</style>
    </ToolWrapper>
  );
};

export default MarkdownPreview;
