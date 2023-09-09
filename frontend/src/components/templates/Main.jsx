import "./Main.css";
import React, { Fragment } from "react";
import Header from "./Header";

const Main = (props) =>
    <Fragment>
        <Header {...props} />
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </Fragment>

export default Main;