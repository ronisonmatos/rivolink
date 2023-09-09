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
          <Link to="/todolist"
                className={`menu-button ${selectedButton === 'todolist' ? 'selected' : ''}`}
                onClick={() => handleButtonClick('todolist')}>
            <i className="fa fa-calendar-check-o "></i> Lista de Tarefas
          </Link>
        </nav>
      </aside>
  );
};

export default Nav;