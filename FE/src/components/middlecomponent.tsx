import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export const MiddleCompo = ({ code, loading }: { code: string; loading: boolean }) => {
  const [tab, setTab] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }
  return <section className="panel output-panel" aria-labelledby="output-heading">
    <div className="panel-heading output-heading"><span className="panel-number">02</span><div><span className="panel-kicker">THE RESULT</span><h2 id="output-heading">Your canvas<span className="heading-dot">.</span></h2></div><span className="live-badge"><span className="status-dot" /> LIVE PREVIEW</span></div>
    <div className="output-toolbar">
      <div className="tabs" role="tablist" aria-label="Output view">
        <button role="tab" aria-selected={tab === 'preview'} className={tab === 'preview' ? 'active' : ''} onClick={() => setTab('preview')}>◫ &nbsp; PREVIEW</button>
        <button role="tab" aria-selected={tab === 'code'} className={tab === 'code' ? 'active' : ''} onClick={() => setTab('code')}>⌘ &nbsp; CODE</button>
      </div>
      <button className="copy-button" onClick={copy} disabled={!code}>{copied ? '✓ COPIED' : '▣ COPY CODE'}</button>
    </div>
    <div className="output-canvas">
      {!code ? <div className="empty-state"><div className="empty-illustration" aria-hidden="true"><div className="empty-window"><span /><span /><span /><div className="empty-line one" /><div className="empty-line two" /><div className="empty-block" /></div><span className="empty-spark one">✳</span><span className="empty-spark two">✳</span></div><div className="empty-kicker">YOUR NEXT BIG THING STARTS HERE</div><h3>{loading ? 'Making your idea real...' : 'A blank canvas, for now.'}</h3><p>{loading ? 'Hang tight while we put the pieces together.' : 'Write a prompt and hit generate. Your creation will show up right here.'}</p></div> : tab === 'code' ? <SyntaxHighlighter language="jsx" customStyle={{ margin: 0, minHeight: '100%', background: '#171e19', fontSize: '13px', padding: '24px' }}>{code}</SyntaxHighlighter> : <iframe title="Generated UI preview" sandbox="allow-scripts" srcDoc={buildSrcdoc(code)} />}
    </div>
    <div className="canvas-footer"><span><span className="status-dot" /> {loading ? 'GENERATING...' : code ? 'READY TO EXPLORE' : 'WAITING FOR YOUR IDEA'}</span><span>MADE WITH YOUR IMAGINATION ✳</span></div>
  </section>
}

export const buildSrcdoc = (jsxCode: string): string => `
<!DOCTYPE html><html><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
<script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script src="https://cdn.tailwindcss.com"></script>
<style>body{margin:0;padding:16px;font-family:system-ui;background:white}.error{color:red;font-family:monospace;white-space:pre-wrap}</style>
</head><body><div id="root"></div><script type="text/babel">
try { const Component = () => (${jsxCode}); ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(Component)); }
catch (err) { document.getElementById("root").textContent = err.message; }
</script></body></html>`
