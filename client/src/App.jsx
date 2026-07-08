import { useEffect, useState } from 'react'
import './App.css'

// --- tiny inline icon set (stroke-based, inherits currentColor) ---
const Icon = {
  edit: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
  ),
  chat: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" /></svg>
  ),
  memory: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></svg>
  ),
  model: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" /><path d="M9 9h6v6H9z" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" /></svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
  ),
  plus: (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14" /></svg>
  ),
  send: (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 2 11 13" /><path d="M22 2 15 22l-4-9-9-4Z" /></svg>
  ),
  chevron: (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  ),
}

const navItems = [
  { icon: Icon.edit, label: 'New chat', active: true },
  { icon: Icon.chat, label: 'Chats' },
  { icon: Icon.memory, label: 'Memories' },
  { icon: Icon.model, label: 'Models' },
  { icon: Icon.search, label: 'Search' },
]

const suggestions = [
  'Start a new memory',
  'Recall what we decided last time',
  'Switch the model, keep the context',
]

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-mark">m</span>
        <span className="brand-name">memorandum</span>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`nav-item${item.active ? ' is-active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="user">
        <span className="avatar">P</span>
        <div className="user-meta">
          <span className="user-name">Prakhar</span>
          <span className="user-plan">local · single-user</span>
        </div>
      </div>
    </aside>
  )
}

function Composer() {
  return (
    <div className="composer">
      <button className="composer-add" aria-label="Add">{Icon.plus}</button>
      <input
        className="composer-input"
        placeholder="Ask anything…"
        aria-label="Message"
      />
      <button className="composer-send" aria-label="Send">{Icon.send}</button>
    </div>
  )
}

export default function App() {
  // holds whatever the server sends back — starts empty until fetch resolves
  const [backendStatus, setBackendStatus] = useState('checking backend…')

  // runs once, when the component first loads on screen
  useEffect(() => {
    async function checkBackend() {
      try {
        const response = await fetch('http://localhost:3000')
        const text = await response.text()
        setBackendStatus(text)
      } catch (err) {
        setBackendStatus('backend unreachable')
      }
    }
    checkBackend()
  }, [])

  return (
    <div className="app">
      <Sidebar />

      <main className="main">
        <header className="topbar">
          <button className="model-pill">
            <span className="model-dot" />
            Claude Sonnet
            <span className="model-chevron">{Icon.chevron}</span>
          </button>
          <span className="backend-status">{backendStatus}</span>
        </header>

        <section className="stage">
          <h1 className="greeting">Good morning, Prakhar</h1>

          <Composer />

          <div className="chips">
            {suggestions.map((s) => (
              <button key={s} className="chip">{s}</button>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
