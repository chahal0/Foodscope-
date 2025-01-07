import './Footer.css';
import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa'; // Importing icons

function Footer() {
  return (
    <footer className="footer">
      <p>&copy; 2023 Flavor Companion. All rights reserved.</p>
      <p>Crafted with ❤️ during the Foodoscope Hackathon</p>

      <div className="social-icons">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram />
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>

      <hr />

      <small>Designed for innovation and flavor enthusiasts worldwide</small>
    </footer>
  );
}

export default Footer;
