import React from "react";
import "./Footer.css";

const Footer = ({ developerName, year }) => {
  return (
    <footer className="footer">
      <span>
        Desenvolvido por <strong>{developerName}</strong> | {year}
      </span>
    </footer>
  );
};

export default Footer;