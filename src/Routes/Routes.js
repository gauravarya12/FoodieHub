/* eslint-disable no-useless-constructor */
import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Home from '../Components/Home';
import Login from '../Components/Login';
import Signup from '../Components/Signup';
import RestaurantWindow from '../Components/RestaurantWindow';
import {connect} from 'react-redux';
import Menu from '../Components/Menu';
import OrderHistory from '../Components/OrderHistory';
import AdminDash from '../Components/AdminDash';
import ViewSales from '../Components/ViewSales';

class Routes extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                <Switch>
                    <Route exact path = "/" render = {() => <Home />} />
                    <Route path = "/login" render ={() => <Login />} />
                    <Route path = "/signup" render = {() => <Signup />} />
                    <Route path = '/restaurants/:id' render = {(props) => (this.props.isAuth && this.props.type==="user")?<Menu {...props} />:<Redirect to = "/login" />} />
                    <Route path = '/restaurants' render = {(props) => (this.props.isAuth && this.props.type==="user")?<RestaurantWindow {...props} />:<Redirect to = "/login" />} />
                    <Route path = '/orderhistory' render = {(props) => (this.props.isAuth&&this.props.type==="user")?<OrderHistory {...props} />:<Redirect to = "/login" />} />
                    <Route path = '/admindash' render = {(props) => (this.props.isAuth && this.props.type==="admin")?<AdminDash {...props} />:<Redirect to = "/login" />} />
                    <Route path = "/viewsales" render = {(props) => (this.props.isAuth && this.props.type==="admin")?<ViewSales {...props} />:<Redirect to = "/login" />} />
                </Switch>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.loginData.isAuth,
    type: state.loginData.currentUser.type
});

export default connect(mapStateToProps, null)(Routes);