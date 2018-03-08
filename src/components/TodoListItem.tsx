/**
 * TodoListItem Compent
 * 
 * Renders LI element with checkbox, label, and prompt when 
 * interacting with the todo list
 */
import * as React from "react";
import { observer } from "mobx-react";
import { ITodoItem } from '../stores/TodoStore'
import { Checkbox, Popconfirm } from 'antd';

interface ITodoListItemProps {
  todo: ITodoItem
}

@observer
export class TodoListItem extends React.Component<ITodoListItemProps, undefined>{
  render() {
    const todo = this.props.todo;
    return (
      <li className={"todo-list-item " + (todo.completed ?"completed":"")}>
        <Checkbox checked={todo.completed} onChange={this.onChange}>{todo.title}</Checkbox>
        <Popconfirm placement="top" title="Delete this todo, are you sure?" onConfirm={this.onRemove} okText="Yes" cancelText="No">
          <a href="javascript:void(0)">remove</a>
        </Popconfirm>
      </li>
    );
  }

  onChange = (e:any) => {
    this.props.todo.changeComplete(e.target.checked);
  }

  onRemove = (e:any) => {
    this.props.todo.remove();
  }
}