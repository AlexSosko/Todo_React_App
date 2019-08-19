import React, { Component }  from 'react';

import AppHeader from '../app-header/';
import SearchPanel from '../search-panel/';
import TodoList from '../todo-list/';
import ItemStatusFilter from '../item-status-filter/';
import ItemAddForm from '../item-add-form/';

import './app.css';

export default class  App extends Component {
    
    maxId = 1;
    
    state = {
        todoData : [
            this.createNewItem('Drink Coffee'),
            this.createNewItem('Make Awesome App'),
            this.createNewItem('Have a lunch')                      
        ],
        term:'',
        filter: 'all'// active, done, all, important
    };

    createNewItem(label) {
        return {
            label: label,
            important: false,
            done: false, 
            id: this.maxId++ 
        };
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);  
            
            const oldItem = arr[ idx ];
            const newItem = {...oldItem,
                    [propName]: !oldItem[propName] };

            
            const newArray = [
                ...arr.slice(0, idx ), 
                newItem,
                ...arr.slice(idx + 1) ];

            return  newArray;
            
    };

    deleteItem = (id) => {
        this.setState(({ todoData }) => {
            const idx = todoData.findIndex((el) => el.id === id);            

            const before = todoData.slice(0, idx );
            const after = todoData.slice(idx + 1);
            
            const newArray = [
                ...before, ...after ];

            return {
                todoData: newArray
            };

        });
    };

    onItemAdded = (text) => {
        
        this.setState(({todoData}) => {
            
            const newItem = this.createNewItem(text);           
            
            const newArray = [
                ...todoData, newItem 
            ];         

            return {
                todoData: newArray
            };            
        });

        // setTimeout(console.log(this.state), 10000);
        // почему не выводит точное кол-во дел на момент поcле нажатия,
        // даже при использовании setTimeout ?       
    };

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }

        });
    };
    
    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }

        });
    };

    onSearchChange = (term) => {
        this.setState({ term });
    };

    onFilterChange = (filter) => {
        this.setState({ filter });
    };
    

    searchItems(items, term) {
        if (term.length === 0) 
            return items;
        

        return items.filter((item) => {
            term = term.toLowerCase();
            return item.label.toLowerCase().includes(term);
        });
    };

    filterItems(items, filter) {
        switch (filter) {
            case 'all' :
                return items;
            case 'active' :
                return items.filter( (item) => !item.done );
            case 'done' :
                return items.filter( (item) => item.done );
            case 'important' :
                return items.filter( (item) => item.important );
            default :
                return items;
        };
    };
    

    render () {
        const {todoData, term, filter} = this.state;

        const visibleItems = this.filterItems(
                this.searchItems(todoData, term), filter);

        const doneCount = todoData.filter((el) => el.done).length;
        const todoCount = todoData.length - doneCount;

        return (
        
            <div className="todo-app">
                <AppHeader toDo={todoCount} done={doneCount}/>
    
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter 
                        filter={this.state.filter}
                        onFilterChange={this.onFilterChange}/>
                </div>
    
                <TodoList todos={visibleItems}
                    onDeleted={this.deleteItem }
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                    onFilterChange={this.onFilterChange}
                    
                />

                <ItemAddForm onItemAdded={this.onItemAdded}/>
            </div>
        );
    };
    
};

