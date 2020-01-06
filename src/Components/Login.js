/* eslint-disable no-useless-constructor */
import React from 'react';
import {loginUser} from '../redux/Action';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {signoutUser} from '../redux/Action';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        this.props.signoutUser();
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    }

    handleClick = () => {
        this.props.loginUser(this.state);
        setTimeout(() => {if (!this.props.isAuth) {
            alert("Invalid Credentials");
        }}, 300);
        this.setState({
            username: '',
            password: ''
        });
    }

    render() {
        let redirectLink;
        if (this.props.currentUser.type === "user") {
            redirectLink = '/restaurants';
        }
        else {
            redirectLink = '/admindash';
        }
        return (
            <>
                <div className = "container text-center">
                    <div className = "col-4 mx-auto mt-5">
                        <div className = "form-group">
                            <label htmlFor = "username">Username</label>
                            <input type = "text" placeholder = "Enter Username" className = "form-control" onChange = {this.handleChange} value = {this.state.username} id = "username"></input>
                        </div>
                        <div className = "form-group">
                            <label htmlFor = "password">Password</label>
                            <input type = "password" placeholder = "Enter Password" className = "form-control" onChange = {this.handleChange} value = {this.state.password} id = "password"></input>
                        </div>
                        <button className = "btn btn-outline-primary" onClick = {this.handleClick}>Login</button>
                        {(this.props.isAuth)&&<Redirect to = {redirectLink} />}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuth: state.loginData.isAuth,
    currentUser: state.loginData.currentUser
});

const mapDispatchToProps = dispatch => ({
    loginUser: (data) => dispatch(loginUser(data)),
    signoutUser: () => dispatch(signoutUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);