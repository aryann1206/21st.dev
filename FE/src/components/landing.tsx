import { useState } from 'react'
import axios from 'axios'
import { MiddleCompo } from './middlecomponent'
import { RightCompo } from './rightcompo'

const prompts = [
  ['✳', 'Pricing card', 'Create a bold pricing card with three plans and a featured plan.'],
  ['▧', 'Login screen', 'Create a modern login screen with email, password, and social sign in.'],
  ['↗', 'Landing page', 'Create a landing page hero with a headline, call to action, and illustration.'],
  ['◈', 'Product card', 'Create an ecommerce product card with an image, price, rating, and add to cart button.'],
]

export const Landing = () => {
  const [text, setText] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const generate = async () => {
    if (!text.trim() || loading) return
    setLoading(true)
    setError('')
    try {
      const res = await axios.post('http://localhost:3000/api/v1/generate', { text: text.trim() })
      if (typeof res.data?.code !== 'string' || !res.data.code.trim()) throw new Error('No code was returned.')
      setCode(res.data.code)
    } catch (err) {
      setError(axios.isAxiosError(err) ? 'Could not generate your UI. Check that the server is running and try again.' : 'No code was returned. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return <div className="app-shell">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Formwork home"><span className="brand-mark">✳</span>formwork<span className="brand-dot">.</span></a>
      <div className="topbar-center"><span className="status-dot" /> YOUR CREATIVE WORKSPACE</div>
      <span className="topbar-link">IDEAS INTO INTERFACES <span aria-hidden="true">↗</span></span>
    </header>
    <main id="top" className="main-content">
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE UI GENERATOR FOR BIG IDEAS</div>
          <h1>Dream it. <span>Build it.</span><br />Make it real<span className="hero-period">.</span></h1>
          <p>Turn your words into working interfaces in seconds. Describe what you have in mind, then watch it take shape.</p>
        </div>
        <div className="hero-sticker" aria-hidden="true"><span>IDEAS<br />INTO<br />UI</span><span className="sticker-arrow">↗</span></div>
      </section>
      <div className="workspace-heading"><span>01 / THE WORKSPACE</span><span>CREATE SOMETHING GOOD ↓</span></div>
      <div className="workspace-grid">
        <section className="panel prompt-panel" aria-labelledby="prompt-heading">
          <div className="panel-heading"><span className="panel-number">01</span><div><span className="panel-kicker">START HERE</span><h2 id="prompt-heading">Your prompt<span className="heading-dot">.</span></h2></div><span className="heading-spark" aria-hidden="true">✳</span></div>
          <label className="field-label" htmlFor="prompt">WHAT ARE WE MAKING?</label>
          <textarea id="prompt" placeholder="A playful dashboard for my coffee shop..." value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') generate() }} />
          <div className="prompt-hint"><span>Be as specific or wild as you like.</span><span>{text.length} CHARACTERS</span></div>
          <button className="press-button generate-button" onClick={generate} disabled={!text.trim() || loading}>{loading ? 'MAKING MAGIC…' : 'GENERATE UI'} <span aria-hidden="true">↗</span></button>
          {error && <p className="error-message" role="alert">{error}</p>}
          <div className="prompt-divider"><span>NEED A LITTLE SPARK?</span></div>
          <div className="suggestions">{prompts.map(([icon, title, prompt]) => <button key={title} className="suggestion" onClick={() => setText(prompt)}><span className="suggestion-icon">{icon}</span><span>{title}</span><span className="suggestion-arrow">↗</span></button>)}</div>
        </section>
        <MiddleCompo code={code} loading={loading} />
        <RightCompo onSelectPrompt={setText} />
      </div>
      <footer className="footer"><span>BUILT FOR THE CURIOUS. MADE TO CREATE.</span><span>FORMWORK © 2026 <span aria-hidden="true">✳</span></span></footer>
    </main>
  </div>
}
