import React from 'react';

import TodoListItem from '../todo-list-item/';
import './todo-list.css';

const TodoList = ({todos, onDeleted,
    onToggleImportant, onToggleDone,
    onFilterChange}) => {

    const elements = todos.map((item) => {

        const {id, ...propsItem} = item;    

        return (
            <li key = {id} className="list-group-item ">
                <TodoListItem {...propsItem}  
                onDeleted={ () => onDeleted(id) }
                onToggleImportant={ () => onToggleImportant(id) }
                onToggleDone={ () => onToggleDone(id) }
                onFilterChange={onFilterChange}
                />
            </li>
        );
    });

    return (
        <ul className="list-group todo-list">
            {elements}            
        </ul>
    );
}


export default TodoList  ;