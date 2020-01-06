/* eslint-disable no-useless-constructor */
import React from 'react';

class MenuItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            qty: 1
        };
    }

    handleChange = (e) => {
        this.setState({
            qty: Number(e.target.value)
        });
    }

    handleClick = () => {
        this.props.addItem({
            name: this.props.obj.name,
            quantity: this.state.qty,
            price: this.props.obj.price
            }
        );
    }
    
    render() {
        return (
            <>
                <li className = "list-group-item">
                    <div className = "row d-flex-justify-content-between">
                        <div className = "col">
                            <h6>Dish</h6>
                            <h5>{this.props.obj.name}</h5>
                        </div>
                        <div className = "col text-center">
                            <h6>Price</h6>
                            <h5>Rs. {this.props.obj.price}</h5>
                        </div>
                        <div className = "col text-center">
                            <h6>Quantity</h6>
                            <input type = "number" placeholder = "Enter Quantity" className = "form-control" value = {this.state.qty} onChange = {this.handleChange}></input>
                        </div>
                        <div className = "col d-flex align-items-center text-right">
                            <button className = "btn btn-danger" onClick = {this.handleClick}>Add</button>
                        </div>
                    </div>
                </li>
            </>
        );
    }
}

export default MenuItem;