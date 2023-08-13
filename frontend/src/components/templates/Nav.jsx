import "./Nav.css";
import React, {useState} from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
  const [selectedButton, setSelectedButton] = useState('');

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  return(
      <aside className="menu-area">
        <nav className="menu">
          <Link to="/"
                className={`menu-button ${selectedButton === '' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('')}>
            <i className="fa fa-home"></i> Início
          </Link>
          <Link to="/users"
                className={`menu-button ${selectedButton === 'users' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('users')}>
            <i className="fa fa-users"></i> Usuários
          </Link>
          <Link to="/schedule"
                className={`menu-button ${selectedButton === 'schedule' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('schedule')}>
            <i className="fa fa-calendar"></i> Agenda
          </Link>
        </nav>
      </aside>
  );
};

export default Nav;