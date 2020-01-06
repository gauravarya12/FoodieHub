import React from 'react';
import {connect} from 'react-redux';


class OrderHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            history: []
        });
    }

    componentDidMount() {
        let username = new URLSearchParams(this.props.location.search).get("user");
        let data = this.props.userHistory.find(e => e.username === username);
        if (data) {
            this.setState({
                history:data.orders
            });
        }
        else {
            this.setState({
                history: ''
            });
        }
    }

    render() {
        let comp = (<h1 className = "text-center mt-5">No Orders Found</h1>);
        if (this.state.history) {
            comp = (
                <div className = "container mx-auto">
                    <div className = "row d-flex justify-content-between">
                        {this.state.history.map(e => <HistoryCard obj = {e} key = {Math.random()} />)}
                    </div>
                </div>
            );
        }
        return (
            <>
                {comp}
            </>
        );
    }
}

const HistoryCard = (props) => {
    return (
        <div className = "col-5 card p-0 mt-3">
            <div className = "card-header text-center">
                <h4>{props.obj.resName}</h4>
            </div>
            <div className = "card-body">
                <table className = "table">
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Quantity</td>
                            <td>Price</td>
                        </tr>
                    </thead>
                    <tbody>
                        {props.obj.items.map(e => {
                            return (
                                <tr key = {Math.random()}>
                                    <td>{e.name}</td>
                                    <td>{e.quantity}</td>
                                    <td>Rs. {e.price}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className = "card-footer text-center">
                <h4>Total Rs.{props.obj.total}</h4>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    userHistory: state.userOrderHistory
});

export default connect(mapStateToProps, null)(OrderHistory);