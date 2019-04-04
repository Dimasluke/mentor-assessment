import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { setTitle, setDescription, setError, resetForm, addTodo } from '../../Redux/reducer'

class Addtodo extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '',
            description: '',
            completed: false,
            errorMessage: ''
        }
    }

    errorCheck = () => {
        let { addTodo } = this.props
        let { title, description } = this.props
        let { completed } = this.state
        let todoInfo = {
            title, 
            description, 
            completed
        }
        console.log(todoInfo)
        if(!title){
            this.props.setError('A title is required to add a new task.')
        } else {
            addTodo(todoInfo)
            this.props.resetForm()
        }
    }

    render(){
        let { title, description, errorMessage } = this.props
        return(
            <div className='ui container'>
                {errorMessage}
                <div className='ui form'>
                    <div className='field'>
                        <label>Task Title</label>
                        <input 
                            type='text' 
                            value={title} 
                            placeholder='Title' 
                            onChange={e => this.props.setTitle(e.target.value)} />
                    </div>
                    <div className='field'>
                        <label>Todo Description</label>
                        <textarea
                            rows='3' 
                            value={description} 
                            placeholder='Description' 
                            onChange={e => this.props.setDescription(e.target.value)} />
                    </div>
                    <button
                        className='ui primary button'
                        onClick={e => {
                            this.errorCheck()
                        }}
                    >
                        Add Todo
                    </button>
                    <Link
                        to='/'
                        className='ui red button'
                    >
                        Cancel
                    </Link>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        title: state.title,
        description: state.description,
        errorMessage: state.errorMessage,
    }
}

export default connect(mapStateToProps, { setTitle, setDescription, setError, resetForm, addTodo })(Addtodo)