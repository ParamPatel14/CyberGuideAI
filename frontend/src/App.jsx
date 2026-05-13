import { useState, useEffect } from 'react'

/* ─── Status Badge Component ─── */
function StatusBadge({ status }) {
  const isConnected = status === 'connected'
  const isChecking = status === 'checking'

  return (
    <div
      id="status-badge"
      className={`
        inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm font-medium
        border backdrop-blur-sm transition-all duration-500
        ${isConnected
          ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300'
          : isChecking
            ? 'border-neon-cyan/30 bg-neon-cyan/5 text-neon-cyan'
            : 'border-red-500/40 bg-red-500/10 text-red-300'
        }
      `}
    >
      <span className="relative flex h-2.5 w-2.5">
        {(isConnected || isChecking) && (
          <span
            className={`
              absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping
              ${isConnected ? 'bg-emerald-400' : 'bg-cyan-400'}
            `}
          />
        )}
        <span
          className={`
            relative inline-flex h-2.5 w-2.5 rounded-full
            ${isConnected ? 'bg-emerald-400' : isChecking ? 'bg-cyan-400' : 'bg-red-400'}
          `}
        />
      </span>
      {isConnected ? 'Backend Connected' : isChecking ? 'Connecting...' : 'Backend Offline'}
    </div>
  )
}

/* ─── Health Data Card ─── */
function HealthCard({ data }) {
  if (!data) return null

  const fields = [
    { label: 'Application', value: data.app, icon: '🛡️' },
    { label: 'Version', value: data.version, icon: '📦' },
    { label: 'Status', value: data.status, icon: '✅' },
    { label: 'Timestamp', value: new Date(data.timestamp).toLocaleString(), icon: '🕐' },
  ]

  return (
    <div
      id="health-card"
      className="
        w-full max-w-lg mx-auto mt-8 rounded-2xl border border-cyber-500/50
        bg-cyber-800/80 backdrop-blur-xl overflow-hidden
        shadow-[0_0_40px_rgba(0,240,255,0.06)]
      "
      style={{ animation: 'fade-in-up 0.6s ease-out forwards, border-glow 3s ease-in-out infinite' }}
    >
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-cyber-500/30 flex items-center gap-3">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
        </div>
        <span className="font-mono text-xs text-cyan-400/70 tracking-wider">
          GET /api/v1/health — 200 OK
        </span>
      </div>

      {/* Card Body */}
      <div className="px-6 py-5">
        <div className="font-mono text-xs text-cyan-500/50 mb-4">// API Response</div>
        <div className="space-y-3">
          {fields.map((field) => (
            <div
              key={field.label}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-cyber-700/50 hover:bg-cyber-600/50 transition-colors duration-200"
            >
              <span className="flex items-center gap-2 text-sm text-slate-400">
                <span>{field.icon}</span>
                {field.label}
              </span>
              <span className="font-mono text-sm text-neon-cyan font-medium">
                {field.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Feature Card ─── */
function FeatureCard({ icon, title, description, delay }) {
  return (
    <div
      className="
        group relative p-6 rounded-2xl border border-cyber-500/30
        bg-cyber-800/60 backdrop-blur-sm hover:border-neon-cyan/40
        transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.08)]
        cursor-default
      "
      style={{ animation: `fade-in-up 0.6s ease-out ${delay}s both` }}
    >
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-neon-cyan transition-colors duration-300">
        {title}
      </h3>
      <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
    </div>
  )
}

/* ─── Animated Grid Background ─── */
function GridBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 240, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 240, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />
      {/* Radial Gradient Orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.3), transparent 70%)',
          animation: 'float 8s ease-in-out infinite',
        }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-15 blur-[120px]"
        style={{
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%)',
          animation: 'float 10s ease-in-out infinite 2s',
        }}
      />
      {/* Scan Line */}
      <div
        className="absolute left-0 right-0 h-px opacity-10"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.5), transparent)',
          animation: 'scan-line 6s linear infinite',
        }}
      />
    </div>
  )
}

/* ─── Main App ─── */
function App() {
  const [connectionStatus, setConnectionStatus] = useState('checking')
  const [healthData, setHealthData] = useState(null)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/v1/health')
        if (!response.ok) throw new Error('Not OK')
        const data = await response.json()
        setHealthData(data)
        setConnectionStatus('connected')
      } catch {
        setConnectionStatus('disconnected')
        setHealthData(null)
      }
    }

    checkHealth()

    // Poll every 15 seconds
    const interval = setInterval(checkHealth, 15000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: '🔍',
      title: 'Threat Analysis',
      description: 'AI-powered analysis of cybersecurity threats, vulnerabilities, and attack vectors in real-time.',
    },
    {
      icon: '🧠',
      title: 'Intelligent Guidance',
      description: 'Get contextual security recommendations powered by advanced machine learning models.',
    },
    {
      icon: '📊',
      title: 'Risk Assessment',
      description: 'Comprehensive risk scoring and prioritization to focus on what matters most.',
    },
    {
      icon: '🔐',
      title: 'Security Posture',
      description: 'Continuous monitoring and evaluation of your organization\'s security stance.',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <GridBackground />

      {/* Main Content */}
      <main className="relative z-10">

        {/* ─── Navigation ─── */}
        <nav
          id="main-nav"
          className="
            sticky top-0 z-50 px-6 py-4 backdrop-blur-xl
            border-b border-cyber-500/20 bg-cyber-900/80
          "
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className="
                  w-9 h-9 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-blue
                  flex items-center justify-center text-white font-bold text-sm
                  shadow-[0_0_20px_rgba(0,240,255,0.3)]
                "
              >
                CG
              </div>
              <span className="text-lg font-bold text-white tracking-tight">
                Cyber<span className="text-neon-cyan">Guide</span>AI
              </span>
            </div>
            <StatusBadge status={connectionStatus} />
          </div>
        </nav>

        {/* ─── Hero Section ─── */}
        <section
          id="hero-section"
          className="px-6 pt-24 pb-16"
          style={{ animation: 'fade-in-up 0.8s ease-out' }}
        >
          <div className="max-w-4xl mx-auto text-center">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neon-cyan/5 border border-neon-cyan/20 mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              <span className="text-xs font-medium text-neon-cyan tracking-wider uppercase">
                AI-Powered Security Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              <span className="text-white">Navigate Cyber</span>
              <br />
              <span
                className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent"
                style={{
                  backgroundSize: '200% auto',
                  animation: 'shimmer 4s linear infinite',
                }}
              >
                Threats with AI
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Harness the power of artificial intelligence for real-time threat detection,
              vulnerability assessment, and actionable security guidance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                id="cta-get-started"
                className="
                  px-8 py-3.5 rounded-xl font-semibold text-sm
                  bg-gradient-to-r from-neon-cyan to-neon-blue text-cyber-900
                  hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]
                  transform hover:scale-105 active:scale-[0.98]
                  transition-all duration-300
                "
              >
                Get Started
              </button>
              <button
                id="cta-docs"
                className="
                  px-8 py-3.5 rounded-xl font-semibold text-sm
                  border border-cyber-400 text-slate-300
                  hover:border-neon-cyan/50 hover:text-white
                  hover:bg-neon-cyan/5
                  transition-all duration-300
                "
              >
                View API Docs ↗
              </button>
            </div>
          </div>
        </section>

        {/* ─── Health Check Section ─── */}
        <section id="health-section" className="px-6 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-white mb-2">System Status</h2>
            <p className="text-sm text-slate-500 mb-4 font-mono">
              Real-time backend connectivity check
            </p>
            <HealthCard data={healthData} />
            {connectionStatus === 'disconnected' && (
              <div
                className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-500/20 max-w-lg mx-auto"
                style={{ animation: 'fade-in-up 0.4s ease-out' }}
              >
                <p className="text-sm text-red-300">
                  ⚠️ Backend is not reachable. Start the server with:
                </p>
                <code className="block mt-2 text-xs font-mono text-red-200 bg-red-500/10 rounded-lg px-4 py-2">
                  cd backend && uvicorn app.main:app --reload
                </code>
              </div>
            )}
          </div>
        </section>

        {/* ─── Features Grid ─── */}
        <section id="features-section" className="px-6 pb-24">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-3">Capabilities</h2>
              <p className="text-slate-400 max-w-xl mx-auto">
                A comprehensive suite of AI-driven cybersecurity tools designed to protect and inform.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  delay={0.1 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Tech Stack Bar ─── */}
        <section id="tech-stack" className="px-6 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl border border-cyber-500/30 bg-cyber-800/40 backdrop-blur-sm p-8">
              <h3 className="text-center text-sm font-medium text-slate-500 uppercase tracking-widest mb-6">
                Built With
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-8">
                {['React', 'TailwindCSS', 'Vite', 'FastAPI', 'Python', 'Pydantic'].map((tech) => (
                  <span
                    key={tech}
                    className="
                      px-4 py-2 rounded-lg bg-cyber-700/50 text-sm font-mono text-slate-300
                      border border-cyber-500/20 hover:border-neon-cyan/30 hover:text-neon-cyan
                      transition-all duration-200 cursor-default
                    "
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── Footer ─── */}
        <footer
          id="main-footer"
          className="px-6 py-8 border-t border-cyber-500/20"
        >
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm text-slate-500">
              © 2026 CyberGuideAI — AI-Powered Cybersecurity Platform
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-600 font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70" />
              All systems operational
            </div>
          </div>
        </footer>

      </main>
    </div>
  )
}

export default App
