import React from "react";
import Main  from "../templates/Main";

const TodoList = (props) => (
    <Main icon="calendar-check-o " title="Lista de Tarefas" subtitle="Registro de Pensamentos Disfoncionais">
            <div className="display-4">Vamos lá!!!</div>
            <hr />
            <p className="mb-0">
                    Sistema para exemplificar a construção de um cadastro desenvolvido em
                    React!
            </p>
    </Main>
);

export default TodoList;