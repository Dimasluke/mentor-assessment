import React, { Component } from 'react';
import Todo from '../Todo/Todo'
import { connect } from 'react-redux'
import { setTodoList } from '../../Redux/reducer'
import { Link } from 'react-router-dom'

class TodoList extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    componentDidMount(){
        this.props.setTodoList()
    }

    render(){
        const mappedTodos = this.props.todoList.map((todo, index) => {
            return(
                <Todo 
                    key={index}
                    id={todo.id} 
                    title={todo.title} 
                    description={todo.description} 
                    completed={todo.completed}
                    removeTodo={this.props.removeTodo} />
            )
        })
        return(
            <div>
                <h1>TodoList</h1>
                <Link 
                    className='ui button pink'
                    to='/add'>Add Todo</Link>
                <div className='ui list'>
                    {mappedTodos}
                </div>
            </div>
        )
    }
}

const MapStateToProps = state => {
    return {
        todoList: state.todoList
    }
}

export default connect(MapStateToProps, {setTodoList})(TodoList)