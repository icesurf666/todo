import React, { Component } from 'react';
import './item-add-form.css';
export default class ItemAddForm extends Component{

    state = {
        label: '',

    };

    onLabelChange = (e) => {
      this.setState({
         label: e.target.value
      });
    };
    onSubmit = (e) =>{
        e.preventDefault(); // не перезагружаем
        this.props.addItem(this.state.label);
        this.setState({     // очищаем форму
            label: ''
        });
    };
    render(){
        return(
            <form className="item-add-form d-flex"
                    onSubmit={this.onSubmit}>
                <input type="text"
                        className="form-control"
                        onChange={this.onLabelChange}
                        placeholder="What needs to be done "
                        value={this.state.label}/>
                <button className="btn btn-outline-secondary">
                    Add
                </button>
            </form>
        )
    }
}