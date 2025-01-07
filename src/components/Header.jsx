import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="header">
      <div className="header__logo">
        <img src={logo} alt="Flavor Companion Logo" />
        <span className="header__tagline">Your Flavor Journey Starts Here</span>
      </div>

      <nav className="header__nav">
        <Link to="/">
          <span className="nav-icon">🏠</span> Home
        </Link>
        <Link to="/explore">
          <span className="nav-icon">🌍</span> Explore Flavors
        </Link>
        <Link to="/suitability">
          <span className="nav-icon">🍳</span> Recipe Suitability
        </Link>
        <Link to="/sensory">
          <span className="nav-icon">👩‍🍳</span> Sensory Designer
        </Link>
        <Link to="/dashboard">
          <span className="nav-icon">📊</span> My Dashboard
        </Link>
      </nav>
    </header>
  );
}

export default Header;
