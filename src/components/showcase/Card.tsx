import React, { useState } from 'react';

const Playground: React.FC = () => {
  // 1. Menyimpan kode awal di dalam state
  const [htmlCode, setHtmlCode] = useState<string>('<button class="btn-magic">Button ▷</button>');
  const [cssCode, setCssCode] = useState<string>(
    `.btn-magic {\n  background: #3b82f6;\n  color: white;\n  padding: 10px 20px;\n  border: none;\n  border-radius: 8px;\n  cursor: pointer;\n}`
  );

  // 2. Gabungkan HTML dan CSS ke dalam satu struktur dokumen mini
  const srcDoc = `
    <html>
      <head>
        <style>${cssCode}</style>
      </head>
      <body style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #111827; margin: 0;">
        ${htmlCode}
      </body>
    </html>
  `;

  return (
    <div style={{ display: 'flex', height: '80vh', gap: '20px', padding: '20px', background: '#0b0f19' }}>
      
      {/* KIRI: AREA EDITOR UNTUK TESTING KODE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h3 style={{ color: '#fff', margin: 0 }}>HTML Editor</h3>
        <textarea
          value={htmlCode}
          onChange={(e) => setHtmlCode(e.target.value)}
          style={{ flex: 1, background: '#1e293b', color: '#38bdf8', fontFamily: 'monospace', padding: '10px', border: '1px solid #334155', borderRadius: '8px' }}
        />

        <h3 style={{ color: '#fff', margin: 0 }}>CSS Editor</h3>
        <textarea
          value={cssCode}
          onChange={(e) => setCssCode(e.target.value)}
          style={{ flex: 1, background: '#1e293b', color: '#a855f7', fontFamily: 'monospace', padding: '10px', border: '1px solid #334155', borderRadius: '8px' }}
        />
      </div>

      {/* KANAN: AREA PREVIEW NYATA (LIVE LIVE TESTING) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ color: '#fff', margin: 0, marginBottom: '10px' }}>Live Preview</h3>
        <iframe
          srcDoc={srcDoc}
          title="output-sandbox"
          sandbox="allow-scripts"
          frameBorder="0"
          style={{ flex: 1, width: '100%', background: '#111827', border: '1px solid #334155', borderRadius: '8px' }}
        />
      </div>

    </div>
  );
};

export default Playground;
