import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from './App'
import TodoView from './Components/TodoView/TodoView'
import TodoList from './Components/TodoList/TodoList';
import AddTodo from './Components/AddTodo/AddTodo';

export default (
    <Switch>
        <Route exact path='/' component={TodoList} />
        <Route exact path='/add' component={AddTodo} />
        <Route exact path='/:id' component={TodoView} />
    </Switch>
)