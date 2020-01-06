/* eslint-disable no-useless-constructor */
import React from 'react';
import Routes from './Routes/Routes';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {signoutUser, fetchData} from './redux/Action';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData();
  }

  signout = () => {
    this.props.signoutUser();
  }

  render() {
    let homeLink = "/";
    if (this.props.isAuth) {
      if (this.props.type === "user") {
        homeLink = "/restaurants";
      }
      else {
        homeLink = "/admindash";
      }
    }
    let comp = (<Link to = "/login"><button className = "btn btn-dark my-2">Login</button></Link>);
    if (this.props.isAuth) {
      if (this.props.type === "user") {
        comp = (<Link to = {`/orderhistory?user=${this.props.username}`}><button className = "btn btn-dark my-2">View Order History</button></Link>);
      }
      else {
        comp = (<Link to = '/viewsales'><button className = "btn btn-dark my-2">View Sales</button></Link>);
      }
    }
    return (
        <div className = "container-fluid p-0">
          <div className = "container-fluid bg-dark m-0">
                <div className = "container row mx-auto">
                    <div className = "col-6 text-left">
                        <Link to = {homeLink}><button className = "btn btn-dark my-2">Home</button></Link>
                    </div>
                    <div className = "col-6">
                        <div className = "row d-flex justify-content-end">
                          {comp}
                          {(this.props.isAuth)?<button className = "btn btn-dark my-2" onClick = {this.signout}>Signout</button>:
                            <Link to = "/signup"><button className = "btn btn-dark my-2">Signup</button></Link>
                          }
                        </div>
                    </div>
                </div>
          </div>
          <Routes />
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuth: state.loginData.isAuth,
  type: state.loginData.currentUser.type,
  username: state.loginData.currentUser.username
});

const mapDispatchToProps = dispatch => ({
  signoutUser: () => dispatch(signoutUser()),
  fetchData: () => dispatch(fetchData())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
