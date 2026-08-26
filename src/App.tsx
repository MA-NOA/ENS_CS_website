import { SpeedInsights } from "@vercel/speed-insights/next"
import { useState, useEffect } from 'react'

const NAV_LINKS = ['About', 'Events', 'Projects', 'Join']

const EVENTS = [
  {
    date: 'AUG 22',
    day: 'FRI',
    title: 'Hackathon Kickoff',
    desc: '48 hours. Build something that matters. Teams of 2–4.',
    type: 'COMPETITION',
  },
  {
    date: 'SEP 04',
    day: 'THU',
    title: 'Intro to Systems Programming',
    desc: 'Memory, pointers, and why segfaults haunt your dreams.',
    type: 'WORKSHOP',
  },
  {
    date: 'SEP 11',
    day: 'THU',
    title: 'Industry Panel: ML in Production',
    desc: 'Engineers from Stripe, Figma, and Two Sigma discuss the gap.',
    type: 'TALK',
  },
  {
    date: 'SEP 18',
    day: 'THU',
    title: 'Competitive Programming — Round 5',
    desc: 'LeetCode-style problems, live leaderboard, prizes.',
    type: 'CONTEST',
  },
]

const PROJECTS = [
  {
    name: 'Graphite',
    lang: 'Rust',
    desc: 'A from-scratch graph database with a custom query language and B+ tree storage engine.',
    members: 3,
    stars: 214,
  },
  {
    name: 'Nebula OS',
    lang: 'C',
    desc: 'A toy x86-64 operating system with preemptive multitasking, virtual memory, and a VFS layer.',
    members: 5,
    stars: 187,
  },
  {
    name: 'Lattice',
    lang: 'Python',
    desc: 'Neural architecture search over transformer variants — finds efficient attention patterns automatically.',
    members: 4,
    stars: 93,
  },
  {
    name: 'Fern',
    lang: 'TypeScript',
    desc: 'A structured concurrency library for Node.js with cancellation, timeouts, and nursery-style scoping.',
    members: 2,
    stars: 56,
  },
]

const LANG_COLORS: Record<string, string> = {
  Rust: '#aaaaaa',
  C: '#aaaaaa',
  Python: '#aaaaaa',
  TypeScript: '#aaaaaa',
}

const TYPE_COLORS: Record<string, string> = {
  COMPETITION: '#aaaaaa',
  WORKSHOP: '#aaaaaa',
  TALK: '#aaaaaa',
  CONTEST: '#aaaaaa',
}


function TerminalCursor() {
  const [visible, setVisible] = useState(true)
  useEffect(() => {
    const t = setInterval(() => setVisible(v => !v), 530)
    return () => clearInterval(t)
  }, [])
  return (
    <span
      style={{
        display: 'inline-block',
        width: '0.6ch',
        height: '1em',
        background: visible ? '#a3ff6e' : 'transparent',
        marginLeft: '2px',
        verticalAlign: 'text-bottom',
        transition: 'background 0.05s',
      }}
    />
  )
}

function TypedSubheading() {
  const phrases = [
    'build real systems.',
    'ship side projects.',
    'break things safely.',
    'learn together.',
  ]
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = phrases[phraseIdx]
    if (!deleting && text === target) {
      const t = setTimeout(() => setDeleting(true), 1800)
      return () => clearTimeout(t)
    }
    if (deleting && text === '') {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % phrases.length)
      return
    }
    const delay = deleting ? 38 : 68
    const t = setTimeout(() => {
      setText(prev =>
        deleting ? prev.slice(0, -1) : target.slice(0, prev.length + 1)
      )
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, phraseIdx])

  return (
    <span>
      {text}
      <TerminalCursor />
    </span>
  )
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return {
    < div style = {{ background: 'var(--color-background)', minHeight: '100vh', fontFamily: 'var(--font-body)' }
}>
  <SpeedInsights />
{/* Nav */ }
< nav
  style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
    background: scrolled ? 'rgba(11,11,15,0.92)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    transition: 'all 0.25s',
  }}
>
  <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 60 }}>
    <a href="#" style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 15, color: 'var(--color-primary)', textDecoration: 'none', letterSpacing: '-0.01em' }}>
      &lt;CS_CLUB /&gt;
    </a>
    <div style={{ display: 'flex', gap: 36, alignItems: 'center' }}>
      {NAV_LINKS.map(link => (
        <a
          key={link}
          href={`#${link.toLowerCase()}`}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--color-muted-foreground)',
            textDecoration: 'none',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ededed')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
        >
          {link}
        </a>
      ))}
      <a
        href="#join"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-primary-foreground)',
          background: 'var(--color-primary)',
          padding: '7px 16px',
          textDecoration: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Apply
      </a>
    </div>
  </div>
</nav >

{/* Hero */ }
< section
  style={{
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '120px 24px 80px',
    maxWidth: 1160,
    margin: '0 auto',
    position: 'relative',
  }}
>
  {/* Grid overlay */}
  < div
    style={{
      position: 'fixed',
      inset: 0,
      backgroundImage:
        'linear-gradient(var(--color-trans) 1px, transparent 1px), linear-gradient(90deg, var(--color-trans) 1px, transparent 1px)',
      backgroundSize: '80px 80px',
      opacity: 0.35,
      pointerEvents: 'none',
      zIndex: 0,
    }}
  />

  < div style={{ position: 'relative', zIndex: 1 }}>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--color-primary)',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        marginBottom: 28,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <span style={{ display: 'inline-block', width: 24, height: 1, background: 'var(--color-primary)' }} />
      ENS Ampefiloha (This website is in prod)
    </div>

    <h1
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: 'clamp(52px, 9vw, 112px)',
        lineHeight: 0.92,
        letterSpacing: '-0.04em',
        color: 'var(--color-foreground)',
        margin: 0,
        marginBottom: 32,
        maxWidth: 900,
      }}
    >
      We come here to <br></br>{' '}
      <span style={{ color: 'var(--color-primary)', display: 'inline-block' }}>
        <TypedSubheading />
      </span>
    </h1>

    <p
      style={{
        fontFamily: 'var(--font-body)',
        fontWeight: 300,
        fontSize: 20,
        color: 'var(--color-muted-foreground)',
        maxWidth: 540,
        lineHeight: 1.6,
        margin: '0 0 48px',
      }}
    >
      The CS Club is where ENS's builders, researchers, and hackers come together.
      Weekly workshops, semester projects, and an annual 48-hour hackathon.
    </p>

    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <a
        href="#join"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-primary-foreground)',
          background: 'var(--color-primary)',
          padding: '14px 28px',
          textDecoration: 'none',
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Apply for Fall 2026
      </a>
      <a
        href="#events"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 500,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--color-muted-foreground)',
          background: 'transparent',
          border: '1px solid var(--color-border)',
          padding: '14px 28px',
          textDecoration: 'none',
          transition: 'color 0.15s, border-color 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.color = '#ededed'
          e.currentTarget.style.borderColor = '#ededed'
        }}
        onMouseLeave={e => {
          e.currentTarget.style.color = 'var(--color-muted-foreground)'
          e.currentTarget.style.borderColor = 'var(--color-border)'
        }}
      >
        See upcoming events
      </a>
    </div>

    {/* Stats row */}
    <div
      style={{
        display: 'flex',
        gap: 48,
        marginTop: 80,
        paddingTop: 48,
        borderTop: '1px solid var(--color-border)',
        flexWrap: 'wrap',
      }}
    >
      {[
        { value: '0', label: 'Active Members' },
        { value: '0', label: 'Projects This Year' },
        { value: '$0k', label: 'Hackathon Prize Pool' },
        { value: '0', label: 'Industry Partners' },
      ].map(s => (
        <div key={s.label}>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 40,
              color: 'var(--color-foreground)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
            }}
          >
            {s.value}
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted-foreground)',
              marginTop: 6,
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  </div >
</section >

{/* About */ }
< section id="about" style={{ padding: '100px 24px', borderTop: '1px solid var(--color-border)' }}>
  <div style={{ maxWidth: 1160, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: 20,
        }}
      >
        01 / About
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 60px)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--color-foreground)',
          margin: '0 0 32px',
        }}
      >
        For people who want to go deeper.
      </h2>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 17, lineHeight: 1.75, margin: '0 0 20px', fontWeight: 300 }}>
        The CS Club isn't a résumé line. It's where students who love computing — systems, theory, ML, security, whatever pulls you in — find each other and build things together.
      </p>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 17, lineHeight: 1.75, margin: 0, fontWeight: 300 }}>
        We host weekly workshops that go further than coursework, semester-long project teams with mentors from the industry, and an annual hackathon open to anyone at the university.
      </p>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {[
        { icon: '⬡', title: 'Weekly Workshops', desc: 'Deep dives on compilers, distributed systems, cryptography, ML fundamentals, and more. Taught by members.' },
        { icon: '⬡', title: 'Project Teams', desc: 'Pair up with experienced members to build and ship something real over a semester. We have 17 active projects.' },
        { icon: '⬡', title: 'Industry Connections', desc: 'Regular talks, mock interviews, and referrals from our network at companies like Stripe, Jane Street, and Google.' },
        { icon: '⬡', title: 'Competitive Programming', desc: 'Weekly practice sessions and travel to ICPC regionals. All skill levels welcome.' },
      ].map(item => (
        <div
          key={item.title}
          style={{
            padding: '24px 28px',
            border: '1px solid var(--color-border)',
            background: 'var(--color-card)',
            transition: 'border-color 0.15s',
            cursor: 'default',
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
          onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        >
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <span style={{ color: 'var(--color-primary)', fontSize: 16, marginTop: 2, lineHeight: 1 }}>{item.icon}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--color-foreground)', marginBottom: 6 }}>
                {item.title}
              </div>
              <div style={{ fontWeight: 300, fontSize: 14, color: 'var(--color-muted-foreground)', lineHeight: 1.65 }}>
                {item.desc}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section >

{/* Events */ }
< section id="events" style={{ padding: '100px 24px', borderTop: '1px solid var(--color-border)' }}>
  <div style={{ maxWidth: 1160, margin: '0 auto' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 60, flexWrap: 'wrap', gap: 16 }}>
      <div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: 12,
          }}
        >
          02 / Events
        </div>
        <h2
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(36px, 5vw, 60px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            color: 'var(--color-foreground)',
            margin: 0,
          }}
        >
          What's coming up.
        </h2>
      </div>
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-muted-foreground)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 2,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#ededed')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
      >
        Full calendar →
      </a>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {EVENTS.map((ev, i) => (
        <div
          key={ev.title}
          style={{
            display: 'grid',
            gridTemplateColumns: '100px 1fr auto',
            gap: 32,
            alignItems: 'center',
            padding: '28px 32px',
            background: 'var(--color-card)',
            borderLeft: '2px solid transparent',
            transition: 'border-color 0.15s, background 0.15s',
            cursor: 'default',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderLeftColor = 'var(--color-primary)'
            e.currentTarget.style.background = '#161620'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderLeftColor = 'transparent'
            e.currentTarget.style.background = 'var(--color-card)'
          }}
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 18, color: 'var(--color-foreground)', lineHeight: 1 }}>
              {ev.date}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted-foreground)', letterSpacing: '0.1em', marginTop: 4 }}>
              {ev.day}
            </div>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 17, color: 'var(--color-foreground)', marginBottom: 4 }}>
              {ev.title}
            </div>
            <div style={{ fontWeight: 300, fontSize: 14, color: 'var(--color-muted-foreground)', lineHeight: 1.5 }}>
              {ev.desc}
            </div>
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: TYPE_COLORS[ev.type],
              border: `1px solid ${TYPE_COLORS[ev.type]}44`,
              padding: '4px 10px',
              whiteSpace: 'nowrap',
            }}
          >
            {ev.type}
          </div>
        </div>
      ))}
    </div>
  </div>
</section >

{/* Projects */ }
< section id="projects" style={{ padding: '100px 24px', borderTop: '1px solid var(--color-border)' }}>
  <div style={{ maxWidth: 1160, margin: '0 auto' }}>
    <div style={{ marginBottom: 60 }}>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: 12,
        }}
      >
        03 / Projects
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 60px)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--color-foreground)',
          margin: 0,
          maxWidth: 600,
        }}
      >
        Things members have built.
      </h2>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 2 }}>
      {PROJECTS.map(proj => (
        <div
          key={proj.name}
          style={{
            background: 'var(--color-card)',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            transition: 'background 0.15s',
            cursor: 'default',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#161620')}
          onMouseLeave={e => (e.currentTarget.style.background = 'var(--color-card)')}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 26,
                letterSpacing: '-0.02em',
                color: 'var(--color-foreground)',
                margin: 0,
              }}
            >
              {proj.name}
            </h3>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 700,
                color: LANG_COLORS[proj.lang],
                letterSpacing: '0.08em',
              }}
            >
              {proj.lang}
            </span>
          </div>

          <p
            style={{
              fontWeight: 300,
              fontSize: 14,
              color: 'var(--color-muted-foreground)',
              lineHeight: 1.7,
              margin: 0,
              flexGrow: 1,
            }}
          >
            {proj.desc}
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '1px solid var(--color-border)',
              paddingTop: 16,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted-foreground)' }}>
              {proj.members} contributors
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--color-muted-foreground)' }}>
              ★ {proj.stars}
            </span>
          </div>
        </div>
      ))}
    </div>

    <div style={{ marginTop: 40, textAlign: 'center' }}>
      <a
        href="#"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-muted-foreground)',
          textDecoration: 'none',
          borderBottom: '1px solid var(--color-border)',
          paddingBottom: 2,
          transition: 'color 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#ededed')}
        onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
      >
        View all projects on GitHub →
      </a>
    </div>
  </div>
</section >

{/* Join */ }
< section id="join" style={{ padding: '100px 24px', borderTop: '1px solid var(--color-border)' }}>
  <div
    style={{
      maxWidth: 1160,
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 80,
      alignItems: 'start',
    }}
  >
    <div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          marginBottom: 20,
        }}
      >
        04 / Join
      </div>
      <h2
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 900,
          fontSize: 'clamp(36px, 5vw, 60px)',
          lineHeight: 0.95,
          letterSpacing: '-0.03em',
          color: 'var(--color-foreground)',
          margin: '0 0 28px',
        }}
      >
        Apply for Fall 2026.
      </h2>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 17, lineHeight: 1.75, fontWeight: 300, margin: '0 0 20px' }}>
        Applications are open to all Northfield students regardless of major or year. We care about curiosity and follow-through, not grades or prior experience.
      </p>
      <p style={{ color: 'var(--color-muted-foreground)', fontSize: 17, lineHeight: 1.75, fontWeight: 300, margin: '0 0 36px' }}>
        The application takes about 10 minutes. Decisions are rolling — apply early.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {[
          'Applications open Aug 18, 2026',
          'Rolling decisions through Sep 5',
          'Kickoff meeting Sep 10, 7pm — Gates Hall 101',
        ].map(item => (
          <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--color-primary)', fontFamily: 'var(--font-mono)', fontSize: 14 }}>→</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--color-muted-foreground)' }}>{item}</span>
          </div>
        ))}
      </div>
    </div>

    <form
      onSubmit={e => e.preventDefault()}
      style={{
        background: 'var(--color-card)',
        border: '1px solid var(--color-border)',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      {[
        { label: 'Full Name', type: 'text', placeholder: 'Ada Lovelace' },
        { label: 'University Email', type: 'email', placeholder: 'ada@northfield.edu' },
        { label: 'Graduation Year', type: 'text', placeholder: '2027' },
      ].map(field => (
        <div key={field.label} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-muted-foreground)',
            }}
          >
            {field.label}
          </label>
          <input
            type={field.type}
            placeholder={field.placeholder}
            style={{
              background: 'var(--color-background)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-foreground)',
              fontFamily: 'var(--font-body)',
              fontSize: 15,
              padding: '12px 14px',
              outline: 'none',
              transition: 'border-color 0.15s',
            }}
            onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
            onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          />
        </div>
      ))}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-muted-foreground)',
          }}
        >
          What do you want to build?
        </label>
        <textarea
          rows={4}
          placeholder="Tell us about a project you've started, a problem you're thinking about, or something you want to learn."
          style={{
            background: 'var(--color-background)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-foreground)',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            padding: '12px 14px',
            outline: 'none',
            resize: 'vertical',
            transition: 'border-color 0.15s',
            lineHeight: 1.6,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = 'var(--color-primary)')}
          onBlur={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
        />
      </div>

      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-primary-foreground)',
          background: 'var(--color-primary)',
          border: 'none',
          padding: '16px',
          cursor: 'pointer',
          marginTop: 4,
          transition: 'opacity 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
      >
        Submit Application
      </button>
    </form>
  </div>
</section >

{/* Footer */ }
< footer
  style={{
    borderTop: '1px solid var(--color-border)',
    padding: '48px 24px',
    marginTop: 0,
  }}
>
  <div
    style={{
      maxWidth: 1160,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 24,
    }}
  >
    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--color-primary)' }}>
      &lt;CS_CLUB /&gt;
    </div>
    <div
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--color-muted-foreground)',
        letterSpacing: '0.04em',
      }}
    >
      ENS University · Ampefiloha · csclub@ens.edu
    </div>
    <div style={{ display: 'flex', gap: 24 }}>
      {['GitHub', 'Discord', 'Twitter'].map(link => (
        <a
          key={link}
          href="#"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-muted-foreground)',
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ededed')}
          onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-muted-foreground)')}
        >
          {link}
        </a>
      ))}
    </div>
  </div>
</footer >
    </div >
  )
}
