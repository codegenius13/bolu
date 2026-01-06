import { useState, useEffect } from "react";
import "./Navbar.css";
import profile from "../../assets/img/profile.jpg";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);

  const handleScroll = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMenuOpen(false);
    }
  };

  // Auto show bubble on first load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBubble(false);
    }, 5000); // show for 5s
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo" onClick={() => handleScroll("hero")}>
          <span className="logo-bold">Bolu</span>
          <span className="logo-light">Ikuerowo</span>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li onClick={() => handleScroll("about")}>About</li>
          <li onClick={() => handleScroll("services")}>Services</li>
          <li onClick={() => handleScroll("requests")}>JobRequests</li>
          <li onClick={() => handleScroll("work")}>Portfolio</li>
          <li onClick={() => handleScroll("reviews")}>Reviews</li>
          <li onClick={() => handleScroll("contact")}>Contact</li>
        </ul>

        {/* Animated Profile CTA */}
        <div
          className="profile-cta"
          onMouseEnter={() => setShowBubble(true)}
          onMouseLeave={() => setShowBubble(false)}
          onClick={() => handleScroll("requests")}
        >
          {showBubble && (
            <div className="speech-bubble">
              <span>Send job request</span>
              <small>or contact me</small>
            </div>
          )}

          <div className="profile-circle">
            <img src={profile} alt="Profile" className="profile-initials"/>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div
          className={`menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
