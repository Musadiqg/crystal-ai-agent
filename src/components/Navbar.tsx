import { motion, useScroll, useTransform } from "framer-motion";

function scrollToDemo() {
  document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
}

function scrollToContact() {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
}

export function Navbar() {
  const { scrollY } = useScroll();

  return (
    <motion.header
      className="nav-shell"
      style={{
        backgroundColor: useTransform(
          scrollY,
          [0, 100],
          ["rgba(12, 21, 36, 0.42)", "rgba(12, 21, 36, 0.9)"]
        ),
        borderBottomColor: useTransform(
          scrollY,
          [0, 80],
          ["rgba(39, 53, 73, 0.35)", "rgba(165, 243, 252, 0.18)"]
        ),
      }}
    >
      <div className="nav-inner shell">
        <motion.div
          className="nav-brand"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="nav-dot" aria-hidden />
          <span className="nav-brand-name">Crystal</span>
        </motion.div>
        <motion.nav
          className="nav-actions"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <button type="button" className="btn-text" onClick={scrollToDemo}>
            View demo
          </button>
          <button type="button" className="btn-primary" onClick={scrollToContact}>
            Get in touch
          </button>
        </motion.nav>
      </div>
    </motion.header>
  );
}
