import React, { Component } from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component{
    maxId = 100;
    state = {
        todoData:[
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a lunch')
        ],
        term: '',
        filter: 'all' // active, all, done
    };
    createTodoItem(label){
        return{
            label,
            important: false,
            done: false,
            id: this.maxId++
        }
    }

    deleteItem = (id) => {
      this.setState(({ todoData }) =>{
         const idx =todoData.findIndex((el) => el.id === id);
         const newArray = [
             ...todoData.slice(0, idx),  // Копирует массив с нуля до id
             ...todoData.slice(idx + 1) // Копирует массив с текущего id до конца
         ];
         return{
             todoData: newArray
         }
      });
    };
    addItem = (text) => {
        const newItem = this.createTodoItem(text);
        this.setState(({todoData})=> {
            const newArr =[
                ...todoData,
                newItem
            ];
            return{
                todoData: newArr
            }
        });
    };
    toggleProperty = (arr, id, propName)=> {
        const idx = arr.findIndex((el) => el.id === id);

        // 1. обновить объект
        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]: !oldItem[propName]};
        // 2. сконструировать новый массив
        return  [
            ...arr.slice(0, idx), // Копирует массив с нуля до id
            newItem,
            ...arr.slice(idx + 1) // Копирует массив с текущего id до конца
        ];
    };
    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty( todoData, id, 'important')
            };
        });
    };
    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty( todoData, id, 'done')
            };
        });
    };

    search( items, term ){
        if(term.length === 0){
            return items;
        }
          return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) >  -1;
        });
    };
    onSearchChange = (term) => {
        this.setState({term});
    };
    onFilterChange = (filter) => {
        this.setState({filter});
    };

    filter(items, filter){

        switch (filter) {
            case 'all':
                return items;
            case 'active':
                return items.filter((item) => !item.done );
            case 'done':
                return items.filter((item) => item.done );
            default:
                return items;
        }
    };

render() {
    const { todoData, term, filter } = this.state;
    const doneCount = todoData
                    .filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    const visibleItems = this.filter(
        this.search( todoData, term ), filter);

    return (
        <div className="todo-app">
            <AppHeader toDo={todoCount} done={doneCount} />
            <div className="top-panel d-flex">
                <SearchPanel
                onSearchChange={this.onSearchChange}
                />
                <ItemStatusFilter
                    filter={ filter }
                    onFilterChange={ this.onFilterChange }
                />
            </div>

            <TodoList
                todos={ visibleItems }
                onDeleted={ this.deleteItem}
                onToggleImportant={this.onToggleImportant}
                onToggleDone={this.onToggleDone}
            />
            <ItemAddForm
            addItem={this.addItem}
            />
        </div>
    );
  }
};





