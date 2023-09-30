import React, { Component } from "react";
import Main from "../templates/Main";
import axios from "axios";
import { BsTrashFill } from "@react-icons/all-files/bs/BsTrashFill";
import {BsPencilSquare} from "@react-icons/all-files/bs/BsPencilSquare.esm"
import {IoIosSave} from "@react-icons/all-files/io/IoIosSave"
import { IconContext } from "@react-icons/all-files";
import InputMask from "react-input-mask";
import * as PropTypes from "prop-types";

const headerPros = {
  icon: "user",
  title: "Usuários",
  subtitle: "Cadastro de usuários: Incluir, Listar, Alterar e Excluir.",
};

/* Conectando ao servidor */
//const baseUrl = "http://localhost:3001/users/";
const baseUrl = "http://127.0.0.1:3004/user";
const statusOk = 200;

const initialState = {
  user: {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    password:"Default",
    date_of_birth: "",
    role_type: "client",
    is_enabled: true
  },
  list: [],
};

class DateOfBirth extends Component {
  render() {
    return <div className="col-12 col-md-3">
      <div className="form-group">
        <label>Data de Nascimento:</label>
        <InputMask
            className="form-control form-control-sm"
            mask="99/99/9999"
            value={this.props.user.date_of_birth}
            id="date_of_birth"
            name="date_of_birth"
            type="tel"
            onChange={this.props.onChange}
            placeholder="dd/mm/aaaa"
        />
        {this.props.showErrorDateOfBirth && <p className="text-danger">Campo obrigatório</p>}
      </div>
    </div>;
  }
}

DateOfBirth.propTypes = {
  user: PropTypes.shape({
    date_of_birth: PropTypes.string
  }),
  onChange: PropTypes.func,
  showErrorDateOfBirth: PropTypes.any
};

class InputForm extends Component {
  render() {
    return <div className="col-12 col-md-6">
      <div className="form-group">
        <label>Nome:</label>
        <input type="text" className="form-control"
               name="first_name"
               value={this.props.user.first_name}
               onChange={this.props.onChange}
               placeholder="Digite o nome..."/>
        {this.props.showErrorName && <p className="text-danger">Campo obrigatório</p>}
      </div>
    </div>;
  }
}

InputForm.propTypes = {
  user: PropTypes.shape({
    first_name: PropTypes.string
  }),
  onChange: PropTypes.func,
  showErrorName: PropTypes.any
};

class UserCrud extends Component {
  state = { ...initialState };

  /* Obter a lista que está no backend */
  componentDidMount() {
    axios.get(baseUrl)
        .then((resp) => {
          this.setState({ list: resp.data.user});
          console.log(`======> ${resp}`)
        })
        .catch((error) => {
         /* console.error('Erro na requisição:', error);*/
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

  static isEmptyInput(currentInput) {
    return currentInput === '';
  }

  save(e) {
    e.preventDefault();
    //const {name, lastName, phoneNumber, dateOfBirth } = this.state.user; -> Retorna do user só o que preciso
    const USER = this.state.user;
    if (USER.first_name !== '' && USER.last_name !== '' && USER.phone_number !== '') {
      const METHOD = USER.id ? "put" : "post";
      const URL_API = USER.id ? `${baseUrl}/${USER.id}` : baseUrl;
      axios[METHOD](URL_API, USER).then((resp) => {
        const USER_LIST = this.getUpdatedList(resp.data);
        this.setState({ user: initialState.user, list: USER_LIST });
      });
    } else {
      this.setState({
        showErrorName: UserCrud.isEmptyInput(USER.first_name),
        showErrorLastName: UserCrud.isEmptyInput(USER.last_name),
        showErrorDateOfBirth: UserCrud.isEmptyInput(USER.date_of_birth),
        showErrorEmail: UserCrud.isEmptyInput(USER.email),
        showErrorPhoneNumber: UserCrud.isEmptyInput(USER.phone_number)
      });
    }
  }

  getUpdatedList(user, add = true) {
    const LIST = this.state.list.filter(
      (userServer) => userServer.id !== user.id
    );
    if (add) LIST.unshift(user);
    return LIST;
  }

  updateField(event) {
    const { name, value } = event.target;
    const user = { ...this.state.user, [name]: value };
    this.setState({user});
  }

  getDescriptionEnableUser(user) {
    return user.is_enabled === true ? "Ativo" : "Inativo";
  }

   renderForm() {
    return (
      <div className="form">
        <div className="row">

          <InputForm user={this.state.user} onChange={e => this.updateField(e)} showErrorName={this.state.showErrorName}/>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>Sobrenome:</label>
              <input type="text" className="form-control"
                     name="last_name"
                     value={this.state.user.last_name}
                     onChange={e => this.updateField(e)}
                     placeholder="Digite o sobrenome..."/>
              {this.state.showErrorLastName && <p className="text-danger">Campo obrigatório</p>}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label>E-mail:</label>
              <input type="text" className="form-control"
                     name="email"
                     value={this.state.user.email}
                     onChange={e => this.updateField(e)}
                     placeholder="name@example.com"/>
              {this.state.showErrorEmail && <p className="text-danger">Campo obrigatório</p>}
            </div>
          </div>

          <div className="col-12 col-md-3">
            <div className="form-group">
              <label>Celular:</label>
              <InputMask
                  className="form-control form-control-sm"
                  mask="(99) 99999-9999"
                  value={this.state.user.phone_number}
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  onChange={(e) => this.updateField(e)}
                  placeholder="(00) 00000-0000"
              />
              {this.state.showErrorPhoneNumber && <p className="text-danger">Campo obrigatório</p>}
            </div>
          </div>

          <DateOfBirth user={this.state.user} onChange={(e) => this.updateField(e)} showErrorDateOfBirth={this.state.showErrorDateOfBirth}/>

        </div>
        <hr/>
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
              <IconContext.Provider value={{className: "global-class-name", size: "1.3em"}}>
                <div>
                  <IoIosSave/> Salvar
                </div>
              </IconContext.Provider>

            </button>
          </div>
        </div>
      </div>
    );
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    const { id } = user;
    axios
        .delete(`${baseUrl}/${id}`)
        .then((response) => {
          if (response.status === statusOk) {
            this.removeFromList(id);
          } else {
            console.error('Erro ao excluir o usuário.');
          }
        })
        .catch((error) => {
          console.error('Erro ao excluir o usuário:', error);
        });
  }

  removeFromList(id) {
    this.setState((prevState) => ({
      list: prevState.list.filter((user) => user.id !== id),
    }));
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
          <td>{user.first_name}</td>
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

  render() {
    return <Main {...headerPros}>
      {this.renderForm()}
      {this.renderTable()}
    </Main>;
  }
}

export default UserCrud;