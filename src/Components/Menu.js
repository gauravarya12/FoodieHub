/* eslint-disable no-useless-constructor */
import React from 'react';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';
import {placeOrder, calTotal, addRestaurantSales} from '../redux/Action';

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resName: '',
            menu: [],
            orderItems: [],
            total: 0
        };
    }

    componentDidMount = () => {
        let id = Number(this.props.match.params.id) - 1;
        let resName = this.props.restaurantData.find((e,i) => i === id).name;
        let res = this.props.restaurantData.find((e,i) => i === id);
        let menu;
        if (res.menuItems) {
            menu = res.menuItems;
        }
        else {
            menu = res.dish_liked.split(', ');
            menu = menu.map(e => ({name: e, price: 50 + Math.floor(Math.random()*450)}));
        }
        this.setState({
            resName: resName,
            menu: menu
        });
    }

    addItems = (obj) => {
        this.setState((state) => {
            return {orderItems: [...state.orderItems, obj],
                    total: state.total+obj.quantity*obj.price};
        });
    }

    addOrder = () => {
        let obj = {username: this.props.username, orders: [{resName: this.state.resName, items: this.state.orderItems, total: this.state.total}]};
        this.props.placeOrder(obj, this.props.username);
        this.props.calTotal(this.state.total);
        this.props.addRestaurantSales({resName: this.state.resName, items: this.state.orderItems, total: this.state.total});
        this.props.history.push('/restaurants');
    }

    render() {
        return (
            <>
                <div className = "container mx-auto my-2">
                    <ul className = "list-group">
                        {this.state.menu.map(e => <MenuItem obj = {e} addItem = {this.addItems} key = {e.name} />)}
                        <li className = "list-group-item">
                            <div className = "row">
                                <div className = "col align-items-center text-left">
                                    <h4>Total</h4>
                                </div>
                                <div className = "col align-items-center text-right">
                                    <h4>Rs. {this.state.total}</h4>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <button className = "btn btn-success mx-auto mt-2" onClick = {this.addOrder}>Place Order</button>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userOrderHistory: state.userOrderHistory,
    restaurantData: state.restaurantData,
    username: state.loginData.currentUser.username
});

const mapDispatchToProps = dispatch => ({
    placeOrder : (data, username) => dispatch(placeOrder(data, username)),
    calTotal: (price) => dispatch(calTotal(price)),
    addRestaurantSales: (data) => dispatch(addRestaurantSales(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Menu);