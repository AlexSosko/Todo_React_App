import React from 'react';

import TodoListItem from './todo-list-item';

const TodoList = () => {

    const items = ['Learn React','Build Awesome App'];




    return (
        <ul>
            <li><TodoListItem label = "Drink Coffee too"/></li>
            <li><TodoListItem 
                label="Build React App"
                important /></li>
        </ul>
    );
}


export default TodoList  ;