import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";
import InputForm from "../commons/InputForm";
import InputMaskForm from "../commons/InputMaskForm";
import ComboBoxForm from "../commons/ComboBoxForm";

const headerPros = {
  icon: "user",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir.",
};

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


class UserCrud extends Component {
  state = { ...initialState };

  /* Obter a lista que está no backend */
  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

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

  save(e) {
    e.preventDefault();
    const { name, lastName, phoneNumber, dateOfBirth } = this.state.user;
    const user = this.state.user;
    if (name !== '' && lastName !== '' && phoneNumber !== '' && dateOfBirth !== '') {
      const method = user.id ? "put" : "post";
      const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
      axios[method](url, user).then((resp) => {
        const list = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list });
      });
    } else {
      this.setState({
        showErrorName: UserCrud.isEmptyInput(user.name),
        showErrorLastName: UserCrud.isEmptyInput(user.lastName),
        showErrorDateOfBirth: UserCrud.isEmptyInput(user.dateOfBirth),
        showErrorEmail: UserCrud.isEmptyInput(user.email),
        showErrorPhoneNumber: UserCrud.isEmptyInput(user.phoneNumber)
      });
    }
  }

  static isEmptyInput(currentInput) {
    return currentInput === '';
  }

  getUpdatedList(user, add = true) {
    const list = this.state.list.filter(
      (userServer) => userServer.id !== user.id
    );
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const { name, value } = event.target;
    const user = { ...this.state.user, [name]: value };

    this.setState({
      user,
      showErrorName: UserCrud.isEmptyInput(user.name),
      showErrorLastName: UserCrud.isEmptyInput(user.lastName),
      showErrorDateOfBirth: UserCrud.isEmptyInput(user.dateOfBirth),
      showErrorEmail: UserCrud.isEmptyInput(user.email),
      showErrorPhoneNumber: UserCrud.isEmptyInput(user.phoneNumber)
    });
  }

  getDescriptionEnableUser(user) {
    return user.enable === "true" ? "Ativo" : "Inativo";
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row">
        </div >
        <hr />
        <div className="row">
          <div className="col-12 d-flex justify-content-end ">
            <button className="bnt btn-primary" onClick={(e) => this.save(e)}>
              Salvar
            </button>
            <button
              className="btn btn-secondary ml-2"
              onClick={(e) => this.clear(e)}
            >
              Cancelar
            </button>
          </div>
        </div>
      </div >
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
      const list = this.getUpdatedList(user, false);
      this.setState({ list });
    });
  }

  renderTable() {
    return (
      <table className="table mt-4 form-control-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{this.getDescriptionEnableUser(user)}</td>
          <td>
            <button className="btn btn-warning ml-2 form-control-sm"
              onClick={() => this.load(user)}>
              <i className="fa fa-pencil" />
            </button>

            <button
              className="btn btn-danger ml-2 form-control-sm"
              onClick={() => this.remove(user)}>
              <i className="fa fa-trash" />
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return <Main {...headerPros}>
      <div className="form">
        <div className="row">
          <InputForm label="Nome" placeholderInput="Digite o nome..." name="name" />
          <InputForm label="Sobrenome" placeholderInput="Digite o sobrenome..." name="lastName" />
          <InputForm label="E-mail" placeholderInput="name@example.com" name="email" />
          <InputMaskForm label="Celular" placeholder="(00) 00000-0000" name="phoneNumber" type="tel" id="phoneNumber" mask="(99) 99999-9999" />
          <InputMaskForm label="Data de Nascimento" placeholder="00/00/0000" name="dateOfBirth" type="tel" id="dateOfBirth" mask="99/99/9999" />
          <ComboBoxForm value="professionalResponsible" name="professionalResponsible"/>
        </div>
      </div>

      {this.renderForm()}
      {this.renderTable()}
    </Main>;
  }
}

export default UserCrud;