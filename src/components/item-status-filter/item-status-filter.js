import React, { Component } from 'react';

export default class ItemStatusFilter extends Component {

    state = {
        buttons : [
            {name: 'all', label: 'All'},
            {name: 'active', label: 'Active'},
            {name: 'done', label: 'Done'},
            {name: 'important', label: ''}

        ]
    }; 


    render() {
        const {filter, onFilterChange} = this.props;

        const buttons = this.state.buttons.map(({name, label}) => {
            const isActive = filter === name;
            const clazz = isActive ? 'btn-info' : 'btn-outline-secondary'; 
            let importantIcon ='';
            if (name === 'important') importantIcon =
                           (<i className="fa fa-exclamation" />);
            

            return (
                <button type="button" 
                        key={name}
                        className={`btn ${clazz}`}
                        onClick={() => onFilterChange(name)}
                        >{importantIcon}
                        {label}</button>
            );
        });

        return (
            <div className="btn-group">
                  {buttons}
            </div> 
        );
    };
};


