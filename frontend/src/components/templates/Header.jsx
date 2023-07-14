import React from "react";
import "./Header.css";

const Footer = (props) => (
  <header className="header d-none d-sm-flex flex-column ">
    <h1 className="mt-3">
      <i className={`fa fa-${props.icon}`}></i> {props.title}
    </h1>
    <p className="lead text-muted form-control-sm">{props.subtitle}</p>
  </header>
);

export default Footer;