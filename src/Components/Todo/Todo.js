import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeTodo, setTodoList, selectTodo, completeTodo } from '../../Redux/reducer'
import axios from 'axios'

class Todo extends Component {
    constructor(props){
        super(props)
        this.state = {
            completed: false
        }
    }


    completeStyle = () => {
        if(this.props.completed){
            return 'line-through'
        } else {
            return 'none'
        }
    }


    render(){
        let { id, title, description, completed } = this.props
        let todo = {
            id,
            title,
            description,
            completed
        }
        return(
            <div className='item'>
                <div 
                    style={{ textDecoration: `${this.completeStyle()}`}}
                    className='header'>
                    <h2 className='ui header'>{title}</h2>
                </div>
                <div>{description}</div>
                <button
                    className='ui primary button'
                    type='button'
                    disabled={this.state.completed}
                    onClick={e => this.props.completeTodo(id)}>
                    Complete
                </button>
                <button
                    className='ui negative button'
                    onClick={e => {
                        this.props.removeTodo(id)
                    }}>Delete</button>
                <Link 
                    onClick={e => {
                        this.props.selectTodo(todo)
                    }}
                    to={`/${id}`}>
                    <button
                        className='ui green button'
                    >
                        View
                    </button>
                </Link>
            </div>  
        )
    }
}

export default connect(null, {removeTodo, setTodoList, selectTodo, completeTodo})(Todo)