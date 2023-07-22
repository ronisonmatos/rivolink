import React, { Component } from "react";
import InputForm from "./InputForm";
import InputMaskForm from "./InputMaskForm";
import ComboBoxForm from "./ComboBoxForm";

class FormUser extends Component {
    state = {
        loading: true,
        error: null,
    };

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
          </div>
        );
    }
}

export default FormUser;