const ideas = [
  { number: '01', name: 'SaaS dashboard', tag: 'DATA & CHARTS', color: 'yellow', prompt: 'Create a SaaS dashboard with analytics cards, a chart, and recent activity.' },
  { number: '02', name: 'Portfolio site', tag: 'PERSONAL', color: 'sage', prompt: 'Create a creative portfolio homepage with featured projects and an about section.' },
  { number: '03', name: 'Event page', tag: 'LANDING PAGE', color: 'white', prompt: 'Create an event landing page with a bold hero, schedule, and registration button.' },
]
export const RightCompo = ({ onSelectPrompt }: { onSelectPrompt: (prompt: string) => void }) => (
  <aside className="panel inspiration-panel" aria-labelledby="inspiration-heading">
    <div className="panel-heading compact"><span className="panel-number">03</span><div><span className="panel-kicker">GET INSPIRED</span><h2 id="inspiration-heading">The gallery<span className="heading-dot">.</span></h2></div></div>
    <p className="inspiration-intro">A little inspiration to get the gears turning.</p>
    <div className="gallery-list">{ideas.map((idea) => <button className={`gallery-card ${idea.color}`} key={idea.number} onClick={() => onSelectPrompt(idea.prompt)}><span className="gallery-card-top"><span>{idea.number} / IDEA</span><span>↗</span></span><strong>{idea.name}</strong><span className="gallery-tag">{idea.tag}</span></button>)}</div>
    <div className="tip-card"><span className="tip-star">✳</span><strong>GOOD TO KNOW</strong><p>More detail in your prompt means a more tailored result. Go on, get specific!</p></div>
  </aside>
)
