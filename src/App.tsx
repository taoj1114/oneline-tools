import React, { useState, useEffect } from 'react';
import { 
  Code2, 
  Type, 
  ShieldCheck, 
  Palette, 
  Globe, 
  Cpu, 
  Settings,
  Search,
  Hash,
  Binary,
  Lock,
  Braces,
  Home,
  FileText,
  CaseSensitive,
  Star,
  Clock,
  ChevronRight
} from 'lucide-react';
import JsonFormatter from './components/tools/JsonFormatter';
import Base64Tool from './components/tools/Base64Tool';
import PasswordGenerator from './components/tools/PasswordGenerator';
import WordCounter from './components/tools/WordCounter';
import CaseConverter from './components/tools/CaseConverter';
import HashGenerator from './components/tools/HashGenerator';
import PaletteGenerator from './components/tools/PaletteGenerator';
import MarkdownPreview from './components/tools/MarkdownPreview';
import UnitConverter from './components/tools/UnitConverter';
import LoremIpsum from './components/tools/LoremIpsum';
import UrlEncoder from './components/tools/UrlEncoder';
import UuidGenerator from './components/tools/UuidGenerator';
import GlassmorphismGenerator from './components/tools/GlassmorphismGenerator';
import SqlFormatter from './components/tools/SqlFormatter';
import QrCodeGenerator from './components/tools/QrCodeGenerator';
import { 
  Code2, 
  Type, 
  ShieldCheck, 
  Palette, 
  Globe, 
  Cpu, 
  Settings,
  Search,
  Hash,
  Binary,
  Lock,
  Braces,
  Home,
  FileText,
  CaseSensitive,
  Star,
  Clock,
  ChevronRight,
  Fingerprint,
  QrCode,
  Layout
} from 'lucide-react';

import RegexGenerator from './components/tools/RegexGenerator';

interface Tool {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  component: React.ReactNode;
  description: string;
}

const tools: Tool[] = [
  { id: 'json-formatter', name: 'JSON Formatter', icon: <Braces size={18} />, category: 'Developer', component: <JsonFormatter />, description: 'Prettify or minify JSON data' },
  { id: 'sql-formatter', name: 'SQL Formatter', icon: <FileText size={18} />, category: 'Developer', component: <SqlFormatter />, description: 'Beautify SQL queries' },
  { id: 'url-encoder', name: 'URL Encoder', icon: <Globe size={18} />, category: 'Developer', component: <UrlEncoder />, description: 'Encode or decode URL components' },
  { id: 'base64', name: 'Base64 Encoder', icon: <Binary size={18} />, category: 'Developer', component: <Base64Tool />, description: 'Encode/Decode text to Base64' },
  { id: 'uuid-gen', name: 'UUID Generator', icon: <Fingerprint size={18} />, category: 'Developer', component: <UuidGenerator />, description: 'Generate random UUID v4' },
  { id: 'regex-builder', name: 'Regex Builder', icon: <Cpu size={18} />, category: 'Developer', component: <RegexGenerator />, description: 'Common patterns & tester' },
  { id: 'hash-gen', name: 'Hash Generator', icon: <Hash size={18} />, category: 'Security', component: <HashGenerator />, description: 'Generate SHA-256 and other hashes' },
  { id: 'password-gen', name: 'Password Gen', icon: <Lock size={18} />, category: 'Security', component: <PasswordGenerator />, description: 'Generate secure passwords' },
  { id: 'word-counter', name: 'Word Counter', icon: <FileText size={18} />, category: 'Text', component: <WordCounter />, description: 'Analyze text statistics' },
  { id: 'case-converter', name: 'Case Converter', icon: <CaseSensitive size={18} />, category: 'Text', component: <CaseConverter />, description: 'Convert text cases' },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum', icon: <Type size={18} />, category: 'Text', component: <LoremIpsum />, description: 'Generate placeholder text' },
  { id: 'markdown-preview', name: 'Markdown Preview', icon: <FileText size={18} />, category: 'Text', component: <MarkdownPreview />, description: 'Live Markdown to HTML preview' },
  { id: 'palette-gen', name: 'Palette Gen', icon: <Palette size={18} />, category: 'Visual', component: <PaletteGenerator />, description: 'Generate color palettes' },
  { id: 'glass-gen', name: 'Glassmorphism', icon: <Layout size={18} />, category: 'Visual', component: <GlassmorphismGenerator />, description: 'Create frosted glass effects' },
  { id: 'qr-gen', name: 'QR Code Gen', icon: <QrCode size={18} />, category: 'Utility', component: <QrCodeGenerator />, description: 'Generate QR codes for URLs' },
  { id: 'unit-converter', name: 'Unit Converter', icon: <Settings size={18} />, category: 'Utility', component: <UnitConverter />, description: 'Convert length, weight, and temp' },
];

function App() {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recentTools, setRecentTools] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Load state from localStorage
  useEffect(() => {
    const savedFavorites = localStorage.getItem('tool-favorites');
    const savedRecent = localStorage.getItem('tool-recent');
    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedRecent) setRecentTools(JSON.parse(savedRecent));
  }, []);

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('tool-favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('tool-recent', JSON.stringify(recentTools));
  }, [recentTools]);

  const activeTool = tools.find(t => t.id === activeToolId);

  const toggleFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleToolClick = (id: string) => {
    setActiveToolId(id);
    setRecentTools(prev => {
      const filtered = prev.filter(rid => rid !== id);
      return [id, ...filtered].slice(0, 5);
    });
  };

  const filteredTools = tools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? t.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const favoriteTools = tools.filter(t => favorites.includes(t.id));
  const recentToolsList = tools.filter(t => recentTools.includes(t.id));

  return (
    <div className="layout">
      {/* Sidebar */}
      <aside className="glass-container sidebar animate-slide-in">
        <div 
          style={{ padding: '0 12px', cursor: 'pointer' }} 
          onClick={() => { setActiveToolId(null); setSelectedCategory(null); }}
        >
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', background: 'linear-gradient(to right, #fff, #a5b4fc)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>OneLine Tools</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Cloudflare Edge Powered</p>
        </div>

        <nav className="nav-section">
          <div className="nav-title">Menu</div>
          <div 
            className={`nav-item ${activeToolId === null && selectedCategory === null ? 'active' : ''}`}
            onClick={() => { setActiveToolId(null); setSelectedCategory(null); }}
          >
            <Home size={18} />
            <span>Home</span>
          </div>
          
          {favorites.length > 0 && (
            <div className="nav-item">
              <Star size={18} style={{ color: '#fbbf24' }} />
              <span>Favorites ({favorites.length})</span>
            </div>
          )}
        </nav>

        <div className="nav-section">
          <div className="nav-title">Categories</div>
          {[
            { name: 'Developer', icon: <Code2 size={18} /> },
            { name: 'Text', icon: <Type size={18} /> },
            { name: 'Security', icon: <ShieldCheck size={18} /> },
            { name: 'Visual', icon: <Palette size={18} /> },
            { name: 'Network', icon: <Globe size={18} /> },
            { name: 'AI', icon: <Cpu size={18} /> }
          ].map(cat => (
            <div 
              key={cat.name} 
              className={`nav-item ${selectedCategory === cat.name ? 'active' : ''}`}
              onClick={() => { setSelectedCategory(cat.name); setActiveToolId(null); }}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </div>
          ))}
        </div>

        {recentToolsList.length > 0 && (
          <div className="nav-section">
            <div className="nav-title">Recently Used</div>
            {recentToolsList.map(tool => (
              <div 
                key={tool.id} 
                className="nav-item"
                style={{ fontSize: '0.85rem' }}
                onClick={() => handleToolClick(tool.id)}
              >
                <Clock size={14} />
                <span>{tool.name}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="glass-container main-content animate-fade-in">
        <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              {activeTool ? activeTool.name : (selectedCategory || 'All Tools')}
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>
              {activeTool ? activeTool.description : `Explore our collection of high-performance tools.`}
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} size={20} />
            <input 
              type="text" 
              placeholder="Search tools (Ctrl + K)" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </header>

        {activeTool ? (
          <div className="tool-container animate-scale-up">
            {activeTool.component}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {/* Show Favorites First if no category selected */}
            {!selectedCategory && favoriteTools.length > 0 && searchQuery === '' && (
              <section>
                <h3 className="section-title"><Star size={18} /> Favorites</h3>
                <div className="tool-grid">
                  {favoriteTools.map(tool => renderToolCard(tool))}
                </div>
              </section>
            )}

            <section>
              <h3 className="section-title">
                {selectedCategory ? `${selectedCategory} Tools` : 'All Tools'}
              </h3>
              <div className="tool-grid">
                {filteredTools.map(tool => renderToolCard(tool))}
                {filteredTools.length === 0 && (
                  <div className="empty-state">
                    <p>No tools found matching your criteria.</p>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </main>

      <style>{`
        .search-input {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px 12px 48px;
          color: white;
          width: 340px;
          font-size: 0.95rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
        }
        .search-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          width: 400px;
          box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.05);
        }
        .section-title {
          font-size: 1.1rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .tool-grid {
          display: grid; 
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
          gap: 24px;
        }
        .tool-card {
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .fav-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.3);
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .fav-btn:hover {
          color: #fbbf24;
          transform: scale(1.2);
        }
        .fav-btn.active {
          color: #fbbf24;
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-slide-in { animation: slideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-scale-up { animation: scaleUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }

        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(-30px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes scaleUp { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

        .empty-state {
          grid-column: 1 / -1;
          text-align: center;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          color: var(--text-secondary);
        }
      `}</style>
    </div>
  );

  function renderToolCard(tool: Tool) {
    const isFav = favorites.includes(tool.id);
    return (
      <div 
        key={tool.id} 
        className="tool-card animate-scale-up"
        onClick={() => handleToolClick(tool.id)}
      >
        <button 
          className={`fav-btn ${isFav ? 'active' : ''}`}
          onClick={(e) => toggleFavorite(e, tool.id)}
        >
          <Star size={18} fill={isFav ? 'currentColor' : 'none'} />
        </button>
        <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '48px', height: '48px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', color: '#818cf8' }}>
          {tool.icon}
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{tool.name}</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.5' }}>{tool.description}</p>
        <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', color: '#818cf8', fontSize: '0.85rem', fontWeight: '500' }}>
          Open Tool <ChevronRight size={14} style={{ marginLeft: '4px' }} />
        </div>
      </div>
    );
  }
}

export default App;

export default App;
