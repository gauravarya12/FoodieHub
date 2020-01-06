/* eslint-disable no-useless-constructor */
import React from 'react';
import {connect} from 'react-redux';
import {addRestaurant} from '../redux/Action';

class AdminDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            rate: '',
            votes: '',
            rest_type: '',
            cuisines: '',
            "approx_cost(for two people)": '',
            address: '',
            menuItems: [],
            price: '',
            itemName:'',
            addClicked: false
        };
    }

    handleChange = (e) => {
        if (e.target.name === "votes" || e.target.name === "price") {
            this.setState({
                [e.target.name]: Number(e.target.value)
            });
        }
        else {
            this.setState({
                [e.target.name]:e.target.value
            });
        }
    }

    handleAddResClick = () => {
        this.setState({
            addClicked: true
        });
    }

    addItem = () => {
        this.setState((state) => {
            return {menuItems: [...state.menuItems, {name: state.itemName, price: state.price}]};
        });
        this.setState({
            itemName: '',
            price: ''
        });
    }

    addRestaurant = () => {
        this.props.addRestaurant({
            name: this.state.name,
            rate: this.state.rate+'/5',
            votes: this.state.votes,
            rest_type: this.state.rest_type,
            cuisines: this.state.cuisines,
            "approx_cost(for two people)": this.state["approx_cost(for two people)"],
            address: this.state.address,
            menuItems: this.state.menuItems
        });
        this.setState({
            name: '',
            rate: '',
            votes: '',
            rest_type: '',
            cuisines: '',
            "approx_cost(for two people)": '',
            address: '',
            menuItems: [],
            addClicked: false
        });
    }

    render() {
        return (
            <>
                <div className = "container mx-auto d-flex justify-content-center">
                    <div className = "col-6">
                        <button className = "btn btn-outline-primary mt-2 mx-auto" onClick = {this.handleAddResClick}>Add New Restaurant</button>
                        {this.state.addClicked &&(<div>
                            <h6 className = "mt-2">Restaurant Name:</h6>
                            <input type = "text" placeholder = "Enter Restaurant Name" className = "form-control mt-2" name = "name" onChange = {this.handleChange} value = {this.state.name}></input>
                            <h6 className = "mt-2">Rating:</h6>
                            <input type = "number" placeholder = "Enter Rating" className = "form-control mt-2" name = "rate" onChange = {this.handleChange} value = {this.state.rate}></input>
                            <h6 className = "mt-2">Votes:</h6>
                            <input type = "number" placeholder = "Enter Votes" className = "form-control mt-2" name = "votes" onChange = {this.handleChange} value = {this.state.votes}></input>
                            <h6 className = "mt-2">Type:</h6>
                            <input type = "text" placeholder = "Enter Type" className = "form-control mt-2" name = "rest_type" onChange = {this.handleChange} value = {this.state.rest_type}></input>
                            <h6 className = "mt-2">Cuisines:</h6>
                            <input type = "text" placeholder = "Enter Cuisines" className = "form-control mt-2" name = "cuisines" onChange = {this.handleChange} value = {this.state.cuisines}></input>
                            <h6 className = "mt-2">Price For Two:</h6>
                            <input type = "text" placeholder = "Enter Price for Two" className = "form-control mt-2" name = "approx_cost(for two people)" onChange = {this.handleChange} value = {this.state["approx_cost(for two people)"]}></input>
                            <h6 className = "mt-2">Address:</h6>
                            <input type = "text" placeholder = "Enter Address" className = "form-control mt-2" name = "address" onChange = {this.handleChange} value = {this.state.address}></input>
                            <div>
                                <div className = "row d-flex justify-content-betweem mt-2">
                                    <div className = "col-5">
                                        <h6 className = "mt-2">Enter Item Name:</h6>
                                        <input type = "text" className = "form-control mt-2" placeholder = "Enter Item Name" name = "itemName" onChange = {this.handleChange} value = {this.state.itemName}></input>
                                    </div>
                                    <div className = "col-5">
                                        <h6 className = "mt-2">Enter Item Price:</h6>
                                        <input type = "number" className = "form-control mt-2" placeholder = "Enter Item Price" name = "price" onChange = {this.handleChange} value = {this.state.price}></input>
                                    </div>
                                    <div className = "col d-flex align-items-center">
                                        <button className = "btn btn-outline-success" onClick = {this.addItem}>Add Item</button>
                                    </div>
                                </div>
                            </div>
                            <button className = "btn btn-outline-primary mt-2 mx-auto" onClick = {this.addRestaurant}>Add Restaurant</button>
                        </div>)}
                    </div>
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    addRestaurant: (data) => dispatch(addRestaurant(data))
});

export default connect(null, mapDispatchToProps)(AdminDash);