import React from 'react';
import {connect} from 'react-redux';

class ViewSales extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            resSales: {}
        };
    }

    handleClick = (e) => {
        if (e.target.value) {
            this.setState({
                resSales: this.props.restaurantSalesData.find(ele => ele.resName === e.target.value)
            });
        }
    }

    render() {
        let comp = null;
        if ("items" in this.state.resSales) {
            comp = (<div className = "container mx-auto mt-2">
            <div className = "col-5 card mx-auto p-0">
                <div className = "card-header text-center">
                    <h1>{this.state.resSales.resName}</h1>
                </div>
                <div className = "card-body">
                    <table className = "table table-dark text-center">
                        <thead>
                            <tr>
                                <td>Item Name</td>
                                <td>Quantity</td>
                            </tr>
                        </thead>
                        <tbody>
                            {(this.state.resSales.items.map((e,i) => {
                                return (<tr key = {e.name+i}>
                                    <td>{e.name}</td>
                                    <td>{e.quantity}</td>
                                </tr>);
                            }))}
                        </tbody>
                    </table>
                </div>
                <div className = "card-footer text-center">
                    <h1>Total Sales: Rs. {this.state.resSales.total}</h1>
                </div>
            </div>
        </div>);
        }
        return (
            <>
                <div className = "container mx-auto d-flex justify-content-center my-2">
                    <select className = "custom-select"  onClick = {this.handleClick}>
                        <option value = "">Select Restaurant</option>
                        {
                            this.props.restaurantSalesData.map(e => <option value = {e.resName} key = {e.resName}>{e.resName}</option>)
                        }
                    </select>
                </div>
                {comp}
                <h1 className = "display-4 text-center mt-2">Total Sales for the day is: Rs.{this.props.totalSales}</h1>
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    totalSales: state.totalSales,
    restaurantSalesData: state.restaurantSalesData
});

export default connect(mapStateToProps, null)(ViewSales);