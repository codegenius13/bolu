import "./Footer.css";
import { FaWhatsapp, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Identity */}
        <div className="footer-brand">
          <h3>
            <span>Bolu</span>Ikuerowo
          </h3>
          <p>Researcher & Web Developer</p>
        </div>

        {/* Socials */}
        <div className="footer-socials">
          <a
            href="https://wa.me/2348145584399"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
          >
            <FaWhatsapp />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Bolu Ikuerowo. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
