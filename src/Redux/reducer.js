import axios from 'axios'

const initialState = {
    todoList: [],
    title: '',
    description: '',
    completed: false,
    errorMessage: '',
    selectedTodo: {}
}

const SET_TODOS = 'SET_TODOS'
const SET_TITLE = 'SET_TITLE'
const SET_DESCRIPTION = 'SET_DESCRIPTION'
const SET_ERROR = 'SET_ERROR'
const RESET_FORM = 'RESET_FORM'
const REMOVE_TODO = 'REMOVE_TODO'
const SET_TODO = 'SET_TODO'
const UPDATE_TITLE = 'UPDATE_TITLE'
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION'
const ADD_TODO = 'ADD_TODO'
const COMPLETE_TODO = 'COMPLETE_TODO'
const EDIT_TODO = 'EDIT_TODO'

export function reducer (state = initialState, action){
    switch(action.type){
        case `${COMPLETE_TODO}_FULFILLED`:
            return {...state, todoList: action.payload}
        case UPDATE_DESCRIPTION:
            state.selectedTodo.description = action.payload
            return {...state}
        case UPDATE_TITLE:
            state.selectedTodo.title = action.payload
            return {...state}
        case SET_TODO:
            return {...state, selectedTodo: action.payload}
        case `${REMOVE_TODO}_FULFILLED`:
            return {...state, todoList: action.payload }
        case RESET_FORM:
            return {...state, 
                title: '',
                description: '',
                completed: false,
                errorMessage: ''
                }
        case SET_ERROR:
            return {...state, errorMessage: action.payload}
        case SET_DESCRIPTION:
            return {...state, description: action.payload}
        case SET_TITLE:
            return {...state, title: action.payload}
        case `${EDIT_TODO}_FULFILLED`:
                return {...state, todoList: action.payload}
        case `${SET_TODOS}_FULFILLED`:
            return {...state, todoList: action.payload}
        case `${ADD_TODO}_FULFILLED`:
                return {...state, todoList: action.payload}
        default:
            return state
    }
}

export function editTodo (id, updatedTodo) {
    const data = axios.patch(`https://practiceapi.devmountain.com/api/tasks/${id}`, updatedTodo).then(response => {
        return response.data
    })
    return {
        type: 'EDIT_TODO',
        payload: data
    }
}

export function updateDescription (description) {
    return {
        type: 'UPDATE_DESCRIPTION',
        payload: description
    }
}

export function updateTitle ( title ) {
    return {
        type: 'UPDATE_TITLE',
        payload: title
    }
}

export function removeTodo (id) {
   const data = axios.delete(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
       return response.data
   })
   return {
       type: 'REMOVE_TODO',
       payload: data
   }
}

export function selectTodo (todo){
    return {
        type: 'SET_TODO',
        payload: todo
    }
}

export function setTodoList () {
    const data = axios.get('https://practiceapi.devmountain.com/api/tasks').then(response => {
        return response.data
    })
    console.log(data)
    return {
        type: 'SET_TODOS',
        payload: data
    }
}

export function setTitle (title) {
    return {
        type: 'SET_TITLE',
        payload: title
    }
}

export function setDescription (description) {
    return {
        type: 'SET_DESCRIPTION',
        payload: description
    }
}

export function setError (errorMessage) {
    return {
        type: 'SET_ERROR',
        payload: errorMessage
    }
}

export function resetForm () {
    return {
        type: 'RESET_FORM'
    }
}

export function addTodo (todo) {
    const data = axios.post('https://practiceapi.devmountain.com/api/tasks', todo).then(response =>{
        return response.data
    })
    return {
        type: 'ADD_TODO',
        payload: data
    }
}

export function completeTodo (id) {
    const data = axios.put(`https://practiceapi.devmountain.com/api/tasks/${id}`).then(response => {
        return response.data
    })
    return {
        type: 'COMPLETE_TODO',
        padyload: data
    }
}

export default reducer