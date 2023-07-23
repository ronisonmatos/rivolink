import React, { Component } from "react";
import InputForm from "./InputForm";
import InputMaskForm from "./InputMaskForm";
import ComboBoxForm from "./ComboBoxForm";
import {IoIosSave} from "@react-icons/all-files/io/IoIosSave"
import { IconContext } from "@react-icons/all-files";


/* Conectando ao servidor */
const baseUrl = "http://localhost:3001/users/";
const initialState = {
  user: {
    name: "",
    email: "",
    lastName: "",
    phoneNumber: "",
    roleType: "",
    professionalResponsible: "",
    registrationDate: "",
    dateOfBirth: "",
    enable: "true"
  },
  list: [],
};

class FormUser extends Component {
    state = {
        loading: true,
        error: null,
    };

    clear() {
      this.setState({
        user: initialState.user,
        showErrorName: false,
        showErrorLastName: false,
        showErrorDateOfBirth: false,
        showErrorEmail: false,
        showErrorPhoneNumber: false
      });
    }

    renderForm() {
      return (
        <div className="form">
          <hr />
          <div className="row">
            <div className="col-12 d-flex justify-content-end ">
              <button 
                className="bnt btn-secondary" 
                onClick={(e) => this.clear(e)}>
                Cancelar
              </button>
              <button
                className="btn btn-primary ml-2"
                onClick={(e) => this.save(e)}>
              <IconContext.Provider value={{className: "global-class-name", size: "1.3em", title:"Salvar" }}>
                <div>
                  <IoIosSave/> Salvar
                </div>
              </IconContext.Provider>
              </button>
            </div>
          </div>
        </div >
      );
    }

    render() {
        return (
            <div className="form">
            <div className="row">
              <InputForm label="Nome" placeholderInput="Digite o nome..." name="name" />
              <InputForm label="Sobrenome" placeholderInput="Digite o sobrenome..." name="name" />
              <InputForm label="E-mail" placeholderInput="name@example.com" name="name" />
              <InputMaskForm label="Celular" placeholder="(00) 00000-0000" name="phoneNumber" type="tel" id="phoneNumber" mask="(99) 99999-9999" />
              <InputMaskForm label="Data de Nascimento" placeholder="dd/mm/aaaa" name="dateOfBirth" type="tel" id="dateOfBirth" mask="99/99/9999" />
              <ComboBoxForm value="professionalResponsible" name="professionalResponsible" />
            </div>
            {this.renderForm()} 
          </div>
          
        );
    }
}

export default FormUser;