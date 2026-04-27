import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Navbar } from "./components/Navbar";
import { Reveal } from "./components/Reveal";
import { AudioDemo } from "./components/AudioDemo";
import { CrystalMark } from "./components/CrystalMark";

const DEMO_AUDIO = `${import.meta.env.BASE_URL}audio/demo.mp3`;

export default function App() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroVisualY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.25]);

  return (
    <>
      <div className="page-bg" aria-hidden />
      <Navbar />
      <main>
        <section ref={heroRef} className="hero-section">
          <div className="shell hero-grid">
            <motion.div className="hero-copy" style={{ y: heroTextY, opacity: heroOpacity }}>
              <p className="eyebrow eyebrow-crystal">Crystal · Enterprise voice</p>
              <h1 className="hero-title-block">
                <span className="crystal-name">Crystal</span>
                <span className="hero-tagline">
                  Clarity on <span className="hero-tagline-accent">every</span> line.
                </span>
              </h1>
              <p className="hero-lead">
                Crystal is the voice layer between your callers and your systems: natural speech, tool-backed actions,
                and your APIs as the source of truth — on a business number or embedded in any app.
              </p>
              <div className="hero-chips">
                <span className="chip chip-solid">Realtime audio</span>
                <span className="chip chip-ghost">Pipecat</span>
                <span className="chip chip-ghost">Telco-ready</span>
              </div>
            </motion.div>
            <motion.div className="hero-visual-wrap" style={{ y: heroVisualY }} aria-hidden>
              <div className="hero-prism-ring" />
              <div className="hero-prism-ring hero-prism-ring--delay" />
              <motion.div
                className="hero-crystal-glow"
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              <CrystalMark variant="hero" size={280} className="hero-crystal-svg" />
            </motion.div>
          </div>
        </section>

        <section className="section light-surface">
          <div className="shell section-inner">
            <Reveal>
              <p className="eyebrow">Why teams feel it</p>
              <h2 className="section-title">
                Callers want <em className="emph-inline">answers</em>
                <br />— not hold music.
              </h2>
              <p className="section-lead max-w-xl">
                Staffing every channel around the clock is costly. IVR trees frustrate people. Generic bots break when a
                caller goes off-script. You need voice that sounds human and can actually <strong className="text-ink">do things</strong>{" "}
                in your backend.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="stat-bars" aria-hidden>
                {[32, 48, 64, 42, 56, 36, 60, 40].map((h, i) => (
                  <motion.span
                    key={i}
                    className="stat-bar"
                    style={{ height: h }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.05 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark">
          <div className="shell section-inner">
            <Reveal>
              <p className="eyebrow">The idea</p>
              <h2 className="section-title text-frost">
                Crystal is a layer you <span className="text-accent font-normal">own</span>
                <br />— not a boxed SaaS story.
              </h2>
              <p className="section-lead text-slate-300 max-w-xl">
                Backend-first architecture: streaming speech, structured tool calls, and durable integration with your
                APIs or data stores. The same Crystal runtime whether someone dials your number or taps “call” inside
                your product.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="section light-surface">
          <div className="shell section-inner narrow-top">
            <Reveal>
              <div className="center-head">
                <p className="eyebrow">At a glance</p>
                <h2 className="section-title center">From audio to outcomes</h2>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="flow-desktop">
                {[
                  { t: "Channel", s: "PSTN / SIP or in-app WebSocket" },
                  { t: "Crystal core", s: "Realtime pipeline & policies" },
                  { t: "Model", s: "Low-latency speech + reasoning" },
                  { t: "Your stack", s: "Bookings, records, workflows" },
                ].map((step, i) => (
                  <div key={step.t} className="flow-step">
                    <motion.div
                      className="flow-icon"
                      initial={{ scale: 0.85, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.08 * i, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="flow-num">{i + 1}</span>
                    </motion.div>
                    <div className="flow-text">
                      <strong>{step.t}</strong>
                      <span>{step.s}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flow-mobile">
                {[
                  { t: "Channel", s: "PSTN / SIP or WebSocket" },
                  { t: "Crystal core", s: "Pipeline & policies" },
                  { t: "Model", s: "Speech + reasoning" },
                  { t: "Your stack", s: "Your APIs & data" },
                ].map((step, i) => (
                  <motion.div
                    key={step.t}
                    className="flow-card"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.06 * i, duration: 0.45 }}
                  >
                    <span className="flow-card-num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <strong>{step.t}</strong>
                      <p>{step.s}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section section-dark">
          <div className="shell section-inner">
            <Reveal>
              <p className="eyebrow">What it handles</p>
              <h2 className="section-title text-frost">
                Built for <span className="text-accent font-normal">operations</span>, not small talk.
              </h2>
            </Reveal>
            <div className="cap-grid">
              {[
                {
                  title: "Scheduling & changes",
                  body: "Availability, confirmations, and reschedules — grounded in verified backend responses.",
                },
                {
                  title: "Lookups & context",
                  body: "Caller-aware retrieval so returning customers are recognised without interrogation.",
                },
                {
                  title: "Tool-grounded answers",
                  body: "Function calls to REST APIs — no invented confirmations or phantom bookings.",
                },
                {
                  title: "Observability",
                  body: "Turn-level metrics and structured logs for tuning latency and quality in production.",
                },
              ].map((c, i) => (
                <Reveal key={c.title} delay={0.06 * i}>
                  <div className="cap-card">
                    <span className="cap-accent" />
                    <h3>{c.title}</h3>
                    <p>{c.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section light-surface">
          <div className="shell section-inner">
            <Reveal>
              <p className="eyebrow">Stack & skills</p>
              <h2 className="section-title">Built like infrastructure.</h2>
              <p className="section-lead max-w-2xl">
                Async Python services, containerised deployment, and cloud-native voice runtimes — the kind of stack
                you expect when calls are revenue-critical.
              </p>
            </Reveal>
            <div className="tech-list">
              {[
                { tag: "Voice", items: "Pipecat · Google Gemini (native audio) · WebSocket transports" },
                { tag: "Telephony", items: "Telnyx (PSTN / SIP) · patterns portable to other CPaaS" },
                { tag: "Runtime", items: "Docker · Pipecat Cloud–style images · FastAPI" },
                { tag: "Data", items: "Supabase / Postgres patterns · REST backends · aiohttp · typed config" },
              ].map((row, i) => (
                <Reveal key={row.tag} delay={0.05 * i}>
                  <div className="tech-row">
                    <span className="tech-tag">{row.tag}</span>
                    <span className="tech-items">{row.items}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-mist">
          <div className="shell section-inner">
            <Reveal>
              <p className="eyebrow">For your business</p>
              <h2 className="section-title">
                Run <em className="emph-indigo">Crystal</em> everywhere you speak to customers.
              </h2>
            </Reveal>
            <div className="biz-list">
              {[
                {
                  title: "Business & toll-free numbers",
                  body: "Route inbound calls to a consistent AI reception or triage — professional, on-brand, auditable.",
                },
                {
                  title: "Mobile & web apps",
                  body: "Expose Crystal over WebSockets so product teams add “tap to talk” without duplicating speech logic.",
                },
                {
                  title: "Vertical-ready",
                  body: "Swap prompts, tools, and backends per tenant — scheduling, dispatch, membership support, and more.",
                },
              ].map((b, i) => (
                <Reveal key={b.title} delay={0.08 * i}>
                  <article className="biz-card">
                    <h3>{b.title}</h3>
                    <p>{b.body}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="demo" className="section section-demo">
          <div className="shell section-inner demo-layout">
            <Reveal>
              <p className="eyebrow">Hear Crystal</p>
              <h2 className="section-title text-frost">Live-style call demo</h2>
              <p className="section-lead text-slate-300 max-w-lg">
                A short Crystal session — natural pacing, tool use, and handoff tone. Headphones recommended for the
                cleanest read on audio quality.
              </p>
            </Reveal>
            <AudioDemo src={DEMO_AUDIO} />
          </div>
        </section>

        <footer id="contact" className="footer">
          <div className="shell footer-inner">
            <Reveal>
              <p className="eyebrow">Portfolio</p>
              <h2 className="footer-title">
                Private build.
                <br />
                <span className="text-accent font-normal">Public</span> impact.
              </h2>
              <p className="footer-note">
                Crystal is a proprietary build — source and internal architecture are not open. Open to conversations
                about similar voice products, integrations, or strategy for your organisation.
              </p>
              <div className="footer-links">
                <a
                  className="footer-link primary"
                  href="https://www.linkedin.com/in/musadiqgilal"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn →
                </a>
                <span className="footer-muted">Crystal · voice AI · backend systems · product-minded engineering</span>
              </div>
            </Reveal>
          </div>
        </footer>
      </main>
    </>
  );
}
