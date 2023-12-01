import React, { Component } from "react";
import Main from "../templates/Main";
import "./Index.css";
import TodoForm from "./TodoForm";

const headerPros = {
  icon: "calendar-check-o",
  title: "Lista de Tarefas",
  subtitle: "Lista de tarefa diária",
};

const initialState = {
  todo: {
    id: "",
    text: "",
    category: "",
    isCompleted: false,
  },
  list: [
    {
      id: 1,
      text: "criar funcionalidade x no sistema",
      category: "Trabalho",
      isCompleted: false,
    },
    {
      id: 2,
      text: "Ir pra academia",
      category: "Pessoal",
      isCompleted: false,
    },
    {
      id: 3,
      text: "Estudar React",
      category: "Estudos",
      isCompleted: false,
    },
  ],
};

class TodoList extends Component {
  state = {
    ...initialState,
    todo: initialState.list, // Defina o estado 'todos' com a lista inicial
  };

  addTodo = (value, category) => {
    const todo = [
      ...this.state.todo,
      {
        id: Math.floor(Math.random() * 10000),
        text: value,
        category,
        isCompleted: false,
      },
    ];
    console.table(todo);
    this.setState({ todo });
  };

  renderTaskList() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{this.renderRows()}</tbody>
        </table>
        <TodoForm addTodo={this.addTodo}/>
      </div>
    );
  }

  renderRows() {
    return this.state.list.map((todo) => (
      <tr key={todo.id}>
        <td>{todo.text}</td>
        <td>{todo.category}</td>
        <td>
          <button className="complete">Completar</button>
          <button className="remove">X</button>
        </td>
      </tr>
    ));
  }

  render() {
    return <Main {...headerPros}>{this.renderTaskList()}</Main>;
  }
}

export default TodoList;
