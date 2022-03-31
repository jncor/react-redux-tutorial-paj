import React from "react";
import Todo from "./Todo";

import { connect } from "react-redux";
// 2ª versão com selector definido à parte
// import { getTodos } from "../redux/selectors";
// 3ª versão com filtros de visibilidade
import { getTodosByVisibilityFilter } from "../redux/selectors";

const TodoList = ({ todos }) => (
  <ul className="todo-list">
    {todos && todos.length > 0 ? 
      todos.map((todo, index) => {
          return <Todo key={`todo-${todo.id}`} todo={todo} />;
        })
      : "No todos, yay!"}
  </ul>
);

// 1ª versao em que o mapStateToProps é implementado e 
// dedicado ao componente
/*
const mapStateToProps = state => {
  const { byIds, allIds } = state.todos || {};
  const todos =
    allIds && allIds.length > 0
      ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
      : null;
  
  return { todos };
};
export default connect(mapStateToProps)(TodoList);
*/
// fim 1ª versao

// 2ª versão
//export default connect(state => ({ todos: getTodos(state) }))(TodoList);

// 3ª versao
const mapStateToProps = (state) => {
  const { visibilityFilter } = state
  console.log(visibilityFilter)
  console.log(state)
  const todos = getTodosByVisibilityFilter(state, visibilityFilter)
  return { todos }
}

export default connect(mapStateToProps)(TodoList)