import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link  } from 'react-router-dom'
import { selectTodo, setTodoList, editTodo } from '../../Redux/reducer'
import axios from 'axios';
import './TodoView.css'

class TodoView extends Component {
    constructor(props){
        super(props)
        this.state = {
            title: '' || this.props.selectedTodo.title,
            description: ''
        }
    }

    componentDidMount () {
        axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
            let selectedTodo = response.data.filter(todo => {
                return parseFloat(todo.id) === parseFloat(this.props.match.params.id)
            })
            if(!selectedTodo[0]){
                this.props.history.push('/')
            }
            this.props.selectTodo(selectedTodo[0])
        })
    }

    editTodo = () => {
        let { id, completed } = this.props.selectedTodo
        let updatedTodo = {
            title: this.state.title,
            description: this.state.description,
            completed: completed
        }
        console.log(updatedTodo)
        this.props.editTodo(id, updatedTodo)
    }

    render(){
        let { completed, description, id, title } = this.props.selectedTodo
        return (
            <div className='ui card todo-view'>
                <div className='content'>
                    <div className='header'>{title}</div>
                    <div className='ui input'>
                        <input type='text' placeholder='Title' onChange={e => this.setState({ title: e.target.value})} value={this.state.title} />
                    </div>
                </div>
                <div className='content'>
                    <h4 className='ui sub header'>Desctipion</h4>
                    <div className='ui small feed'>
                        <div className='event'>
                            <div className='content'>
                                <div className='summary'>
                                    {description}
                                    <div className='ui form'>
                                        <textarea rows='2'onChange={e => this.setState({ description:  e.target.value })} value={this.state.description}></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='extra content'>
                    <button 
                        className='ui orange button' 
                        onClick={e => {
                            this.editTodo()
                            this.setState({
                                title: '',
                                description: ''
                            })}}>Edit</button>
                    <button 
                        className='ui purple button'
                        onClick={e => {
                            this.setState({
                                title,
                                description
                            })
                        }}>Undo</button>
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
        selectedTodo: state.selectedTodo
    }
}

export default connect(mapStateToProps,{selectTodo, setTodoList, editTodo})(TodoView)