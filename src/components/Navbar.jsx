import { useNavigate, useLocation } from "react-router-dom"

const links = [
  { label: "Home",              path: "/",             hash: ""               },
  { label: "Projects",          path: "/",             hash: "#projects"      },
  { label: "Side Explorations", path: "/explorations", hash: ""               },
  { label: "About Me",          path: "/",             hash: "#system-inputs" },
  { label: "Contact",           path: "/",             hash: "#contact"       },
]

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = (link) => {
    if (link.hash) {
      if (location.pathname !== "/") {
        navigate("/")
        setTimeout(() => {
          document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" })
        }, 100)
      } else {
        document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" })
      }
    } else {
      navigate(link.path)
    }
  }

  const isActive = (link) => {
    if (link.path === "/explorations") return location.pathname === "/explorations"
    if (link.path === "/" && !link.hash) return location.pathname === "/"
    return false
  }

  return (
    <nav className="navbar">
      <button
        onClick={() => navigate("/")}
        style={{
          background: "transparent", border: "none",
          fontFamily: "var(--serif)", fontSize: "17px",
          color: "var(--text)", cursor: "pointer",
          letterSpacing: "-.02em", fontWeight: 400,
        }}
      >
        Aarushi Sharma
      </button>

      <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
        {links.map((link, i) => (
          <button
            key={i}
            onClick={() => handleClick(link)}
            style={{
              background: "transparent", border: "none",
              fontSize: "11px", letterSpacing: ".12em",
              textTransform: "uppercase",
              color: isActive(link) ? "var(--indigo)" : "var(--text-muted)",
              cursor: "pointer", fontFamily: "var(--sans)",
              fontWeight: 400, transition: "color .2s",
              padding: "4px 0",
              borderBottom: isActive(link) ? "1px solid var(--indigo)" : "1px solid transparent",
            }}
            onMouseEnter={e => e.currentTarget.style.color = "var(--indigo)"}
            onMouseLeave={e => e.currentTarget.style.color = isActive(link) ? "var(--indigo)" : "var(--text-muted)"}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>
  )
}