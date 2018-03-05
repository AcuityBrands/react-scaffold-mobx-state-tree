/**
 * TodoList Component
 * 
 * Renders a list of TodoListItem(s)
 */
import * as React from "react";
import { observer, inject } from "mobx-react";
import {IAppStore} from '../stores'
import { Progress } from 'antd';
import TodoListItem from './TodoListItem';

interface ITodoListProps {
  appStore?: IAppStore
}

@inject("appStore")
@observer
export default class TodoList extends React.Component<ITodoListProps, undefined>{
  render() {
    const { todoStore } = this.props.appStore;
    return (
      <React.Fragment>
        <ul className="todo-list">
          {todoStore.todos.map((todo, idx) => <TodoListItem key={todo.id} todo={todo}/>)}
        </ul>
        <Progress percent={todoStore.completedPct} />
        <br/>
        <div>{todoStore.completedCount} of {todoStore.todoCount} completed</div>
      </React.Fragment>
    );
  }
}