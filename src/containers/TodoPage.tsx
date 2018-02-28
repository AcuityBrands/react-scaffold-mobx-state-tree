import * as React from "react";
import { observable } from "mobx";
import { observer, inject } from "mobx-react";
import { Row, Col, Input, Button, message, InputNumber, Icon, Card } from 'antd';
import { TodoItem } from '../models/TodoStore'
import { IAppStore } from '../models/AppStore'
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
            <Card bordered={false} className="p20">
              <h2>Your Tasks</h2>
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
                <ButtonGroup className="mt20">
                  <Button onClick={todoStore.undo}>
                    <Icon type="left" />
                  </Button>
                  <Button onClick={todoStore.redo}>
                    <Icon type="right" />
                  </Button>
                </ButtonGroup>
              </div>
            </Card>
          </Col>
          <Col span={6} offset={1}>
            <h3 className="mt20">Managing Tasks</h3>
            <p className="mt10 light">
              Tasks are a set of work items that must be done each business day.  A task should not be
              longer than 8 hours or should be broken up into smaller tasks.
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