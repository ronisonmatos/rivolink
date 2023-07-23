import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";
import FormUser from "../forms/userForm/FormUser";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import {BsPencilSquare} from "@react-icons/all-files/bs/BsPencilSquare.esm"
import {IoIosSave} from "@react-icons/all-files/io/IoIosSave"
import { IconContext } from "@react-icons/all-files";

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

/*   clear() {
    this.setState({
      user: initialState.user,
      showErrorName: false,
      showErrorLastName: false,
      showErrorDateOfBirth: false,
      showErrorEmail: false,
      showErrorPhoneNumber: false
    });
  } */

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

/*   renderForm() {
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
            <IconContext.Provider value={{className: "global-class-name", size: "1.3em" }}>
              <div>
                <IoIosSave/> Salvar
              </div>
            </IconContext.Provider>

            </button>
          </div>
        </div>
      </div >
    );
  } */

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
                <IconContext.Provider value={{ color: "black", className: "global-class-name", size: "1.1em" }}>
                  <div>
                    <BsPencilSquare />
                  </div>
                </IconContext.Provider>
            </button>

            <button
              className="btn btn-danger ml-2 form-control-sm"
              onClick={() => this.remove(user)}>
                <IconContext.Provider value={{className: "global-class-name", size: "1.1em" }}>
                  <div>
                    <BsTrashFill />
                  </div>
                </IconContext.Provider>               
            </button>
          </td>
        </tr>
      );
    });
  }

  // O que está dentro do <Main> ... </Main> são os childrens
  render() {
    return <Main {...headerPros}>
      <FormUser/>
{/*       {this.renderForm()}  */}
      {this.renderTable()}
    </Main>;
  }
}

export default UserCrud;