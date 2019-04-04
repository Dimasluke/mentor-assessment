import React, { Component } from 'react';
import axios from 'axios'
import TodoList from './Components/TodoList/TodoList'
import AddTodo from './Components/AddTodo/AddTodo'
import { connect } from 'react-redux'
import { setTodoList } from './Redux/reducer'
import './App.css';
import routes from './routes';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: []
    }
  }

  componentDidMount(){
    this.props.setTodoList()
  }

  render() {
    return (
      <div>
        {/* <AddTodo />
        <TodoList todoList={this.props.todoList}/> */}
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todoList: state.todoList
  }
}

export default connect(mapStateToProps, { setTodoList })(App);
