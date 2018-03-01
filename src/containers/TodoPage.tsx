import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Row, Col, Input, Button, message, InputNumber, Icon } from 'antd';
import { TodoItem, IAppStore } from '../stores'
import TodoList from '../components/TodoList'

const NewItem = Input.Search;
const ButtonGroup = Button.Group;

interface ITodoPageProps {
  appStore: IAppStore
}

@inject("appStore")
@observer
export default class TodoPage extends React.Component<ITodoPageProps, undefined>{
  @observable todoValue: string = "";
  @observable suggestionCount: number = 5

  onAddItem = (value: any) => {
    if (value == "") { message.info("Yo! Todos must have a title"); return; }
    const id = Math.floor(Math.random() * 100000);
    this.props.appStore.todoStore.add(TodoItem.create({ id: id, title: value }))
    this.todoValue = "";
  }

  onTitleChange = (e: any) => {
    this.todoValue = e.target.value;
  }

  onCountChange = (value: number) => {
    this.suggestionCount = value;
  }

  onGetSuggestions = (e: any) => {
    this.props.appStore.todoStore.getSuggestions(this.suggestionCount);
  }

  render() {
    const { todoStore } = this.props.appStore;
    return (
      <div className="content-wrapper">
        <Row >
          <Col span={16}>
            <div className="card">
              <div className="card-header">
                <h2>Your Tasks</h2>
                <ButtonGroup>
                  <Button onClick={todoStore.undo}>
                    <Icon type="left" /> Undo
                  </Button>
                  <Button onClick={todoStore.redo}>
                    Redo <Icon type="right" />
                  </Button>
                </ButtonGroup>
              </div>
              <p className="mb30">
                Vestibulum in nibh nec odio lobortis tempus sed in dolor.
                Aenean viverra interdum ante, <strong>vel consectetur lorem eleifend</strong> eget. Vestibulum
                fringilla <a href="#">magna lorem.</a>
              </p>
              <NewItem
                placeholder="create new task"
                enterButton="Add Task"
                onSearch={this.onAddItem}
                value={this.todoValue}
                onChange={this.onTitleChange}
                size="large" />
              <TodoList></TodoList>
              <div className="text-center">
                <div className="mt20">
                  <Button onClick={this.onGetSuggestions} loading={todoStore.loading}>Suggest Tasks</Button>
                  <InputNumber min={1} max={100} defaultValue={this.suggestionCount} onChange={this.onCountChange} style={{ marginLeft: '5px' }} />
                </div>
              </div>
            </div>
          </Col>
          <Col span={6} offset={1}>
            <h3 className="mt20">Managing Tasks</h3>
            <p className="mt10 light">
              Tasks are automatically saved to your local storage (assuming it's available) by using 
              a nifty feature of mobx-state-tree called snapshotting.
            </p>
            <p className="mt10 light">
              Create new tasks by typing a task title into the input box.  Complete the task by clicking
              the task title.  If you run out of work, simply click the "Suggest Tasks" button. 
            </p>
            <h3 className="mt30">Undo / Redo</h3>
            <p className="mt20 light">
              This widget features the ability to undo/redo activities. Once you branch your undo history,
              you will no longer be able to redo past actions.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}