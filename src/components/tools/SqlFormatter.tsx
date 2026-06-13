import React, { useState, useEffect } from 'react';
import ToolWrapper from '../ToolWrapper';

const SqlFormatter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const formatSql = (sql: string) => {
    // Simple SQL formatter logic (indentation based on keywords)
    if (!sql.trim()) return '';
    
    const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'GROUP BY', 'ORDER BY', 'LIMIT', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE'];
    let formatted = sql.replace(/\s+/g, ' '); // collapse whitespace
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${keyword.toUpperCase()}`);
    });
    
    return formatted.trim();
  };

  useEffect(() => {
    setOutput(formatSql(input));
  }, [input]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <ToolWrapper 
      title="SQL Formatter" 
      description="Beautify your SQL queries with proper indentation and casing"
      onReset={() => setInput('')}
      onCopy={output ? handleCopy : undefined}
      copySuccess={copySuccess}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Raw SQL</label>
          <textarea 
            placeholder="SELECT * FROM users WHERE id = 1..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Formatted SQL</label>
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

export default SqlFormatter;
