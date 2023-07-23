import "./Main.css";
import React, { Fragment } from "react";
import Header from "./Header";
import { BsFillHouseFill } from "@react-icons/all-files/bs/BsFillHouseFill";

const Main = (props) =>
    <Fragment>
        <Header {...props} >
            <BsFillHouseFill/>
        </Header>
        <main className="content container-fluid">
            <div className="p-3 mt-3">
                {props.children}
            </div>
        </main>
    </Fragment>

export default Main;